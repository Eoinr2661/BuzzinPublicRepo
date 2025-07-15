package com.areyoubuzzin.ayb_backend.controller;


import com.areyoubuzzin.ayb_backend.dto.PagedResponseDTO;
import com.areyoubuzzin.ayb_backend.dto.PostDTO;
import com.areyoubuzzin.ayb_backend.entity.Post;
import com.areyoubuzzin.ayb_backend.service.PostService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/posts")
public class PostController {

  private final PostService postService;

  public PostController(PostService postService) {
    this.postService = postService;
  }

  @PostMapping("/sync")
  public ResponseEntity<Void> syncPosts() {
    postService.syncPosts();
    return ResponseEntity.ok().build();
  }

  @GetMapping("/")
  public ResponseEntity<List<PostDTO>> getAllPosts() {
    List<PostDTO> posts = postService.getAllPosts();
    return ResponseEntity.ok(posts);
  }

  @GetMapping("/id/{id}")
  public ResponseEntity<PostDTO> getPostById(@PathVariable Long id) {
    return postService.getPostById(id)
        .map(ResponseEntity::ok)
        .orElse(ResponseEntity.notFound().build());
  }

  private PostDTO mapToDTO(Post post) {
    PostDTO dto = new PostDTO();
    dto.setId(post.getId());
    dto.setTitle(post.getTitle());
    dto.setExcerpt(post.getExcerpt());
    dto.setContent(post.getContent());
    dto.setPublishedAt(post.getPublishedAt());
    dto.setFeaturedMediaUrl(post.getFeaturedMediaUrl());
    dto.setAuthorName(post.getAuthorName());
    return dto;
  }

  @GetMapping("/paged")
  public ResponseEntity<PagedResponseDTO<PostDTO>> getPagedPosts(
      @RequestParam(defaultValue = "0") int page,
      @RequestParam(defaultValue = "10") int size,
      @RequestParam(defaultValue = "publishedAt") String sortBy,
      @RequestParam(defaultValue = "desc") String order,
      @RequestParam(required = false) String category,
      @RequestParam(required = false) String search
  ) {
    int maxSize = 100;
    size = Math.min(size, maxSize);

    Sort sort = order.equalsIgnoreCase("desc")
        ? Sort.by(sortBy).descending()
        : Sort.by(sortBy).ascending();

    Pageable pageable = PageRequest.of(page, size, sort);

    Page<Post> result = postService.getPagedPosts(pageable, category, search);

    List<PostDTO> dtoList = result.getContent()
        .stream()
        .map(postService::mapToDTO)
        .collect(Collectors.toList());

    PagedResponseDTO<PostDTO> response = new PagedResponseDTO<>(
        dtoList,
        page,
        size,
        result.getTotalElements(),
        result.getTotalPages()
    );

    return ResponseEntity.ok(response);
  }
}