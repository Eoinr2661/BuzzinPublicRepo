package com.areyoubuzzin.ayb_backend.entity;

import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Entity
public class TribeEvent {

  @Id
  private Long id;

  @Column(nullable = false)
  private String eventTitle;

  @Column(columnDefinition = "TEXT")
  private String description;

  private LocalDateTime startDate;
  private LocalDateTime endDate;
  private LocalDateTime publishDate;
  private String venue;
  private String featuredImageUrl;
  private String featuredImageAlt;
  private String eventURL;

  @ManyToMany(fetch = FetchType.LAZY)
  @JoinTable(
      name = "tribe_event_category",
      joinColumns = @JoinColumn(name = "tribe_event_id"),
      inverseJoinColumns = @JoinColumn(name = "category_id")
  )
  private Set<EventCategory> categories = new HashSet<>();

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

  public LocalDateTime getPublishDate() {
    return publishDate;
  }

  public void setPublishDate(LocalDateTime publishDate) {
    this.publishDate = publishDate;
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

  public Set<EventCategory> getCategories() {
    return categories;
  }

  public void setCategories(Set<EventCategory> categories) {
    this.categories = categories;
  }

  public String getEventURL(){
    return eventURL;
  }

  public void setEventURL(String eventURL){
    this.eventURL = eventURL;
  }
}
