package com.areyoubuzzin.ayb_backend.dto;

import java.time.LocalDateTime;
import java.util.List;

public class TribeEventDTO {
  private Long id;
  private String eventTitle;
  private String description;
  private List<EventCategoryDTO> categories;
  private LocalDateTime startDate;
  private LocalDateTime endDate;
  private String venue;
  private String featuredImageUrl;
  private String featuredImageAlt;
  private String eventURL;

  public TribeEventDTO(){

  }

  public TribeEventDTO(Long id, String eventTitle, String description, List<EventCategoryDTO> categories, LocalDateTime startDate, LocalDateTime endDate, String venue, String featuredImageUrl, String featuredImageAlt, String eventURL) {
    this.id = id;
    this.eventTitle = eventTitle;
    this.description = description;
    this.categories = categories;
    this.startDate = startDate;
    this.endDate = endDate;
    this.venue = venue;
    this.featuredImageUrl = featuredImageUrl;
    this.featuredImageAlt = featuredImageAlt;
    this.eventURL = eventURL;
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getEventTitle() {
    return eventTitle;
  }

  public void setEventTitle(String eventTitle) {
    this.eventTitle = eventTitle;
  }

  public String getDescription() {
    return description;
  }

  public void setDescription(String description) {
    this.description = description;
  }

  public List<EventCategoryDTO> getCategories() {
    return categories;
  }

  public void setCategories(List<EventCategoryDTO> categories) {
    this.categories = categories;
  }

  public LocalDateTime getStartDate() {
    return startDate;
  }

  public void setStartDate(LocalDateTime startDate) {
    this.startDate = startDate;
  }

  public LocalDateTime getEndDate() {
    return endDate;
  }

  public void setEndDate(LocalDateTime endDate) {
    this.endDate = endDate;
  }

  public String getVenue() {
    return venue;
  }

  public void setVenue(String venue) {
    this.venue = venue;
  }

  public String getFeaturedImageUrl() {
    return featuredImageUrl;
  }

  public void setFeaturedImageUrl(String featuredImageUrl) {
    this.featuredImageUrl = featuredImageUrl;
  }

  public String getFeaturedImageAlt() {
    return featuredImageAlt;
  }

  public void setFeaturedImageAlt(String featuredImageAlt) {
    this.featuredImageAlt = featuredImageAlt;
  }

  public String getEventURL(){
    return eventURL;
  }

  public void setEventURL(String eventURL){
    this.eventURL = eventURL;
  }
}
