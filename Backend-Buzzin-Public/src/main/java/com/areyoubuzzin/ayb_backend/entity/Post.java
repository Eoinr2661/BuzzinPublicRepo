package com.areyoubuzzin.ayb_backend.entity;

import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Entity
public class Post {

  @Id
  private Long id;

  private String title;

  @Column(columnDefinition = "TEXT")
  private String content;

  private String excerpt;
  private LocalDateTime publishedAt;
  private String featuredMediaUrl;
  private String authorName;


  @ManyToMany(fetch = FetchType.LAZY)
  @JoinTable(
      name = "post_post_category",
      joinColumns = @JoinColumn(name = "post_id"),
      inverseJoinColumns = @JoinColumn(name = "category_id")
  )
  private Set<PostCategory> categories = new HashSet<>();
  public Post() {
  }

  public Post(Long id, String title, String content, String excerpt, LocalDateTime publishedAt, String featuredMediaUrl, String authorName) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.excerpt = excerpt;
    this.publishedAt = publishedAt;
    this.featuredMediaUrl = featuredMediaUrl;
    this.authorName = authorName;
  }

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

  public Set<PostCategory> getCategories() {
    return categories;
  }

  public void setCategories(Set<PostCategory> categories) {
    this.categories = categories;
  }

  public String getAuthorName() {
    return authorName;
  }

  public void setAuthorName(String authorName) {
    this.authorName = authorName;
  }
}
