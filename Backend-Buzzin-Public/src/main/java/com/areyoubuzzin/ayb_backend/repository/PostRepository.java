package com.areyoubuzzin.ayb_backend.repository;
import com.areyoubuzzin.ayb_backend.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

@Repository
public interface PostRepository extends JpaRepository<Post,Long>{
    Page<Post> findByCategories_NameIgnoreCaseAndTitleContainingIgnoreCase(String category, String title, Pageable pageable);
    Page<Post> findByCategories_NameIgnoreCase(String category, Pageable pageable);
    Page<Post> findByTitleContainingIgnoreCase(String title, Pageable pageable);
  }
