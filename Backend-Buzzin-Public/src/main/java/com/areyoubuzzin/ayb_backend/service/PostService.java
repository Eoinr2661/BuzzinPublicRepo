package com.areyoubuzzin.ayb_backend.service;

import com.areyoubuzzin.ayb_backend.dto.PostCategoryDTO;
import com.areyoubuzzin.ayb_backend.dto.PostDTO;
import com.areyoubuzzin.ayb_backend.entity.Post;
import com.areyoubuzzin.ayb_backend.entity.PostCategory;
import com.areyoubuzzin.ayb_backend.repository.PostCategoryRepository;
import com.areyoubuzzin.ayb_backend.repository.PostRepository;
import com.fasterxml.jackson.databind.JsonNode;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class PostService {

  private final PostRepository postRepo;
  private final PostCategoryRepository categoryRepo;
  private final RestTemplate rest;



  public PostService(PostRepository postRepo, PostCategoryRepository categoryRepo) {
    this.postRepo = postRepo;
    this.categoryRepo = categoryRepo;
    this.rest = new RestTemplate();
  }

  public void syncPosts() {
    Map<Long, PostCategory> categoryMap = fetchAndSaveCategories();

    int totalPages = 1;
    Set<Long> seen = new HashSet<>();

    for (int page = 1; page <= totalPages; page++) {
      ResponseEntity<JsonNode> resp = rest.exchange(POSTS_API + page, HttpMethod.GET, null, JsonNode.class);
      HttpHeaders h = resp.getHeaders();
      if (h.containsKey("X-WP-TotalPages")) totalPages = Integer.parseInt(h.getFirst("X-WP-TotalPages"));

      JsonNode arr = resp.getBody();
      if (arr == null || !arr.isArray()) break;

      for (JsonNode postNode : arr) {
        Long id = postNode.path("id").asLong();
        if (seen.contains(id)) continue;
        seen.add(id);

        Post p = postRepo.findById(id).orElse(new Post());
        p.setId(id);
        p.setTitle(postNode.path("title").path("rendered").asText(""));
        p.setExcerpt(postNode.path("excerpt").path("rendered").asText(""));
        p.setContent(postNode.path("content").path("rendered").asText(""));
        p.setPublishedAt(LocalDateTime.parse(postNode.path("date").asText()));

        JsonNode authorNode = postNode.path("_embedded").path("author");
        if (authorNode.isArray() && authorNode.size() > 0) {
          String authorName = authorNode.get(0).path("name").asText(null);
          p.setAuthorName(authorName);
        }

        JsonNode featured = postNode.path("_embedded").path("wp:featuredmedia");
        if (featured.isArray() && featured.size() > 0) {
          JsonNode m = featured.get(0);
          p.setFeaturedMediaUrl(m.path("source_url").asText(null));
        }

        JsonNode categoriesNode = postNode.path("categories");
        Set<PostCategory> postCategories = new HashSet<>();
        if (categoriesNode.isArray()) {
          for (JsonNode catNode : categoriesNode) {
            Long categoryId = catNode.asLong();
            PostCategory category = categoryMap.get(categoryId);
            if (category != null) {
              postCategories.add(category);
            } else {
              System.err.println("Category ID " + categoryId + " not found in fetched categories");
            }
          }
        }
        p.setCategories(postCategories);

        postRepo.save(p);
      }
    }
  }


  private Map<Long, PostCategory> fetchAndSaveCategories() {
    JsonNode categoriesResponse = rest.getForObject(CATEGORY_API, JsonNode.class);
    Map<Long, PostCategory> categoryMap = new HashMap<>();

    if (categoriesResponse != null && categoriesResponse.isArray()) {
      for (JsonNode catNode : categoriesResponse) {
        Long id = catNode.path("id").asLong();
        String name = catNode.path("name").asText();

        PostCategory category = categoryRepo.findById(id).orElseGet(() -> {
          PostCategory newCat = new PostCategory();
          newCat.setId(id);
          newCat.setName(name);
          return newCat;
        });

        if (!category.getName().equals(name)) {
          category.setName(name);
        }

        categoryRepo.save(category);
        categoryMap.put(id, category);
      }
    }
    return categoryMap;
  }

  public List<PostDTO> getAllPosts() {
    return postRepo.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
  }

  public Optional<PostDTO> getPostById(Long id) {
    return postRepo.findById(id).map(this::mapToDTO);
  }

  public PostDTO mapToDTO(Post post) {
    PostDTO dto = new PostDTO();
    dto.setId(post.getId());
    dto.setTitle(post.getTitle());
    dto.setContent(post.getContent());
    dto.setExcerpt(post.getExcerpt());
    dto.setPublishedAt(post.getPublishedAt());
    dto.setFeaturedMediaUrl(post.getFeaturedMediaUrl());
    dto.setAuthorName(post.getAuthorName());

    List<PostCategoryDTO> categoryDTOs = post.getCategories().stream().map(cat -> {
      PostCategoryDTO catDto = new PostCategoryDTO();
      catDto.setId(cat.getId());
      catDto.setName(cat.getName());
      return catDto;
    }).collect(Collectors.toList());

    dto.setCategories(categoryDTOs);
    return dto;
  }

  public Page<Post> getPagedPosts(Pageable pageable, String category, String search) {
    boolean hasCategory = category != null && !category.isBlank();
    boolean hasSearch = search != null && !search.isBlank();

    if (!hasCategory && !hasSearch) {
      return postRepo.findAll(pageable);
    } else if (hasCategory && hasSearch) {
      return postRepo.findByCategories_NameIgnoreCaseAndTitleContainingIgnoreCase(category, search, pageable);
    } else if (hasCategory) {
      return postRepo.findByCategories_NameIgnoreCase(category, pageable);
    } else {
      return postRepo.findByTitleContainingIgnoreCase(search, pageable);
    }
  }


  @Value("${SUPABASE_URL:default}")
  private String supabaseUrl;
  @Value("${SUPABASE_USERNAME:default}")
  private String supabaseUsername;
  @Value("${SUPABASE_PW:default}")
  private String supabasePw;

  @PostConstruct
  public void logEnvVars() {
    System.out.println("SUPABASE_URL: " + supabaseUrl);
    System.out.println("SUPABASE_USERNAME: " + supabaseUsername);
    System.out.println("SUPABASE_PW: " + supabasePw);
  }
}
