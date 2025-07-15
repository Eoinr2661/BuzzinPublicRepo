package com.areyoubuzzin.ayb_backend.service;

import com.areyoubuzzin.ayb_backend.dto.EventCategoryDTO;
import com.areyoubuzzin.ayb_backend.dto.TribeEventDTO;
import com.areyoubuzzin.ayb_backend.entity.EventCategory;
import com.areyoubuzzin.ayb_backend.entity.TribeEvent;
import com.areyoubuzzin.ayb_backend.repository.EventCategoryRepository;
import com.areyoubuzzin.ayb_backend.repository.TribeEventRepository;
import com.fasterxml.jackson.databind.JsonNode;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class TribeEventService {

  private final TribeEventRepository repository;
  private final EventCategoryRepository categoryRepository;
  private final RestTemplate restTemplate;

//removed constant strings for public repo

  public TribeEventService(TribeEventRepository repository, EventCategoryRepository categoryRepository) {
    this.repository = repository;
    this.categoryRepository = categoryRepository;
    this.restTemplate = new RestTemplate();
  }

  private Map<Long, EventCategory> fetchAndSaveCategories() {
    JsonNode categoriesResponse = restTemplate.getForObject(CATEGORY_API, JsonNode.class);
    Map<Long, EventCategory> categoryMap = new HashMap<>();

    if (categoriesResponse != null && categoriesResponse.isArray()) {
      for (JsonNode catNode : categoriesResponse) {
        Long id = catNode.path("id").asLong();
        String name = catNode.path("name").asText();

        EventCategory category = categoryRepository.findById(id).orElseGet(() -> {
          EventCategory newCat = new EventCategory();
          newCat.setId(id);
          newCat.setName(name);
          return newCat;
        });

        // Update the name if it changed
        if (!category.getName().equals(name)) {
          category.setName(name);
        }

        categoryRepository.save(category);
        categoryMap.put(id, category);
      }
    }

    return categoryMap;
  }

  public void syncEvents() {
    // First, fetch & save categories, get a map of id -> category entity
    Map<Long, EventCategory> categoryMap = fetchAndSaveCategories();

    int totalPages = 1;
    Set<Long> seenEventIds = new HashSet<>();

    for (int page = 1; page <= totalPages; page++) {
      String url = EVENTS_API + page;
      ResponseEntity<JsonNode> responseEntity = restTemplate.exchange(url, HttpMethod.GET, null, JsonNode.class);
      HttpHeaders headers = responseEntity.getHeaders();

      if (headers.containsKey("X-WP-TotalPages")) {
        totalPages = Integer.parseInt(headers.getFirst("X-WP-TotalPages"));
      }

      JsonNode response = responseEntity.getBody();
      if (response == null || !response.isArray()) break;

      for (JsonNode eventNode : response) {
        Long eventId = eventNode.path("id").asLong();
        if (seenEventIds.contains(eventId)) continue;

        TribeEvent event = new TribeEvent();
        event.setId(eventId);
        event.setEventTitle(eventNode.path("title").path("rendered").asText());
        event.setDescription(eventNode.path("content").path("rendered").asText());
        event.setStartDate(parseSpaceDate(eventNode.path("meta").path("_EventStartDate").asText(null)));
        event.setEndDate(parseSpaceDate(eventNode.path("meta").path("_EventEndDate").asText(null)));
        event.setPublishDate(parseIsoDate(eventNode.path("date").asText(null)));
        event.setEventURL(eventNode.path("meta").path("_EventURL").asText(null));

        JsonNode featured = eventNode.path("_embedded").path("wp:featuredmedia");
        if (featured.isArray() && !featured.isEmpty()) {
          JsonNode media = featured.get(0);
          event.setFeaturedImageUrl(media.path("source_url").asText(null));
          event.setFeaturedImageAlt(media.path("alt_text").asText(null));
        }

        JsonNode venueArray = eventNode.path("meta").path("_EventVenueID");
        if (venueArray.isArray() && !venueArray.isEmpty()) {
          String venueId = venueArray.get(0).asText();
          event.setVenue(fetchVenueName(venueId));
        }

        JsonNode categoriesNode = eventNode.path("tribe_events_cat");
        Set<EventCategory> eventCategories = new HashSet<>();

        if (categoriesNode.isArray()) {
          for (JsonNode catNode : categoriesNode) {
            Long categoryId = catNode.asLong();
            EventCategory category = categoryMap.get(categoryId);
            if (category != null) {
              eventCategories.add(category);
            } else {
              System.err.println("Category ID " + categoryId + " not found in fetched categories");
            }
          }
        }

        event.setCategories(eventCategories);
        repository.save(event);
        seenEventIds.add(eventId);
      }
    }
  }

  public LocalDateTime parseIsoDate(String dateStr) {
    if (dateStr == null || dateStr.isBlank()) return null;
    try {
      return LocalDateTime.parse(dateStr, DateTimeFormatter.ISO_LOCAL_DATE_TIME);
    } catch (DateTimeParseException e) {
      System.err.println("Failed to parse ISO date: " + dateStr);
      return null;
    }
  }

  public LocalDateTime parseSpaceDate(String dateStr) {
    if (dateStr == null || dateStr.isBlank()) return null;
    try {
      DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
      return LocalDateTime.parse(dateStr, formatter);
    } catch (DateTimeParseException e) {
      System.err.println("Failed to parse space date: " + dateStr);
      return null;
    }
  }

  private String fetchVenueName(String venueId) {
    try {
      JsonNode response = restTemplate.getForObject(VENUE_API + venueId, JsonNode.class);
      if (response != null) {
        return response.path("title").path("rendered").asText("Unknown Venue");
      }
    } catch (Exception e) {
      System.err.println("Failed to fetch venue for ID: " + venueId);
    }
    return "Venue TBC";
  }

  public List<TribeEvent> getAllEvents() {
    return repository.findAll();
  }

  public Optional<TribeEventDTO> getEventById(Long id) {
    return repository.findById(id)
        .map(this::mapToDTO);
  }

  public Page<TribeEvent> getPagedEvents(Pageable pageable, String category, String search) {
    boolean hasCategory = category != null && !category.isBlank();
    boolean hasSearch = search != null && !search.isBlank();

    if (!hasCategory && !hasSearch) {
      return repository.findAll(pageable);
    } else if (hasCategory && hasSearch) {
      return repository.findByCategories_NameIgnoreCaseAndEventTitleContainingIgnoreCase(category, search, pageable);
    } else if (hasCategory) {
      return repository.findByCategories_NameIgnoreCase(category, pageable);
    } else {
      return repository.findByEventTitleContainingIgnoreCase(search, pageable);
    }
  }

  public TribeEventDTO mapToDTO(TribeEvent event) {
    TribeEventDTO dto = new TribeEventDTO();
    dto.setId(event.getId());
    dto.setEventTitle(event.getEventTitle());
    dto.setDescription(event.getDescription());
    dto.setStartDate(event.getStartDate());
    dto.setEndDate(event.getEndDate());
    dto.setVenue(event.getVenue());
    dto.setFeaturedImageUrl(event.getFeaturedImageUrl());
    dto.setFeaturedImageAlt(event.getFeaturedImageAlt());
    dto.setEventURL(event.getEventURL());

    // map categories
    List<EventCategoryDTO> categoryDTOs = event.getCategories()
        .stream()
        .map(cat -> {
          EventCategoryDTO catDto = new EventCategoryDTO();
          catDto.setId(cat.getId());
          catDto.setName(cat.getName());
          return catDto;
        })
        .collect(Collectors.toList());

    dto.setCategories(categoryDTOs);

    return dto;
  }

  public List<TribeEvent> getEventsBetween(LocalDateTime start, LocalDateTime end) {
    return repository.findByStartDateBetween(start, end);
  }

}
