package com.areyoubuzzin.ayb_backend.repository;

import com.areyoubuzzin.ayb_backend.entity.EventCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EventCategoryRepository extends JpaRepository<EventCategory, Long> {
}
