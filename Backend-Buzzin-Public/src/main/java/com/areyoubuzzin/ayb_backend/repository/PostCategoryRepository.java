package com.areyoubuzzin.ayb_backend.repository;

import com.areyoubuzzin.ayb_backend.entity.PostCategory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostCategoryRepository extends JpaRepository<PostCategory, Long> {
}
