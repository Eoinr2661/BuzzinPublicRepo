package com.areyoubuzzin.ayb_backend.dto;

import java.time.LocalDateTime;
import java.util.List;

public class PostDTO {
  private Long id;
  private String title;
  private String content;
  private String excerpt;
  private LocalDateTime publishedAt;
  private String featuredMediaUrl;
  private List<PostCategoryDTO> categories;
  private String authorName;

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getTitle() {
    return title;
  }

  public void setTitle(String title) {
    this.title = title;
  }

  public String getContent() {
    return content;
  }

  public void setContent(String content) {
    this.content = content;
  }

  public String getExcerpt() {
    return excerpt;
  }

  public void setExcerpt(String excerpt) {
    this.excerpt = excerpt;
  }

  public LocalDateTime getPublishedAt() {
    return publishedAt;
  }

  public void setPublishedAt(LocalDateTime publishedAt) {
    this.publishedAt = publishedAt;
  }

  public String getFeaturedMediaUrl() {
    return featuredMediaUrl;
  }

  public void setFeaturedMediaUrl(String featuredMediaUrl) {
    this.featuredMediaUrl = featuredMediaUrl;
  }

  public List<PostCategoryDTO> getCategories() {
    return categories;
  }

  public void setCategories(List<PostCategoryDTO> categories) {
    this.categories = categories;
  }

  public String getAuthorName(){
    return authorName;
  }

  public void setAuthorName(String authorName){
    this.authorName = authorName;
  }
}
