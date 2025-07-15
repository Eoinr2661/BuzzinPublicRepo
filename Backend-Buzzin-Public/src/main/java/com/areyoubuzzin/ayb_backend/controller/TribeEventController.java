package com.areyoubuzzin.ayb_backend.controller;

import com.areyoubuzzin.ayb_backend.dto.EventCategoryDTO;
import com.areyoubuzzin.ayb_backend.dto.PagedResponseDTO;
import com.areyoubuzzin.ayb_backend.dto.TribeEventDTO;
import com.areyoubuzzin.ayb_backend.entity.EventCategory;
import com.areyoubuzzin.ayb_backend.entity.TribeEvent;
import com.areyoubuzzin.ayb_backend.repository.EventCategoryRepository;
import com.areyoubuzzin.ayb_backend.service.TribeEventService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/events")
public class TribeEventController {

  private final TribeEventService eventService;
  private final EventCategoryRepository eventCategoryRepository;

  public TribeEventController(TribeEventService eventService, EventCategoryRepository eventCategoryRepository) {
    this.eventService = eventService;
    this.eventCategoryRepository = eventCategoryRepository;
  }

  @PostMapping("/sync")
  public String syncEvents() {
    eventService.syncEvents();
    return "Sync completed!";
  }

  @GetMapping("/")
  public List<TribeEvent> getAllEvents() {
    return eventService.getAllEvents();
  }

  @GetMapping("/paged")
  public PagedResponseDTO<TribeEventDTO> getPagedEvents(
      @RequestParam(defaultValue = "0") int page,
      @RequestParam(defaultValue = "10") int size,
      @RequestParam(defaultValue = "startDate") String sortBy,
      @RequestParam(defaultValue = "asc") String order,
      @RequestParam(required = false) String category,
      @RequestParam(required = false) String search
  ) {
    int maxSize = 100;
    size = Math.min(size, maxSize);

    Sort sort = order.equalsIgnoreCase("desc")
        ? Sort.by(sortBy).descending()
        : Sort.by(sortBy).ascending();
    Pageable pageable = PageRequest.of(page, size, sort);

    Page<TribeEvent> result = eventService.getPagedEvents(pageable, category, search);

    List<TribeEventDTO> dtoList = result.getContent().stream()
        .map(eventService::mapToDTO)
        .collect(Collectors.toList());

    return new PagedResponseDTO<>(dtoList, page, size, result.getTotalElements(), result.getTotalPages());
  }

  @GetMapping("/categories")
  public ResponseEntity<List<EventCategoryDTO>> getAllCategories() {
    List<EventCategory> categories = eventCategoryRepository.findAll();
    List<EventCategoryDTO> dtos = categories.stream()
        .map(cat -> {
          EventCategoryDTO dto = new EventCategoryDTO();
          dto.setId(cat.getId());
          dto.setName(cat.getName());
          return dto;
        })
        .collect(Collectors.toList());
    return ResponseEntity.ok(dtos);
  }

  @GetMapping("/id/{id}")
  public ResponseEntity<TribeEventDTO> getEventById(@PathVariable Long id) {
    return eventService.getEventById(id)
        .map(ResponseEntity::ok)
        .orElse(ResponseEntity.notFound().build());
  }

  @GetMapping("/byDate")
  public List<TribeEventDTO> getEventsByDateRange(
      @RequestParam String start,
      @RequestParam String end
  ) {
    LocalDate startDate = LocalDate.parse(start);
    LocalDate endDate = LocalDate.parse(end);

    LocalDateTime startDateTime = startDate.atStartOfDay();
    LocalDateTime endDateTime = endDate.atTime(23, 59, 59);

    List<TribeEvent> events = eventService.getEventsBetween(startDateTime, endDateTime);
    return events.stream()
        .map(eventService::mapToDTO)
        .collect(Collectors.toList());
  }

}
