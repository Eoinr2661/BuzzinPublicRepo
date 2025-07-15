package com.areyoubuzzin.ayb_backend.repository;

import com.areyoubuzzin.ayb_backend.entity.TribeEvent;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface TribeEventRepository extends JpaRepository<TribeEvent, Long> {
  Page<TribeEvent> findByCategories_NameIgnoreCase(String categoryName, Pageable pageable);
  Page<TribeEvent> findByEventTitleContainingIgnoreCase(String title, Pageable pageable);
  Page<TribeEvent> findByCategories_NameIgnoreCaseAndEventTitleContainingIgnoreCase(String categoryName, String title, Pageable pageable);
  List<TribeEvent> findByStartDateBetween(LocalDateTime start, LocalDateTime end);
}