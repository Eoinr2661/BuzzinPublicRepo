package com.areyoubuzzin.ayb_backend.service;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
public class SyncService {

  private final TribeEventService tribeEventService;
  private final PostService postService;

  // time units
  private static final long SECOND = 1000;
  private static final long MINUTE = 60 * SECOND;
  private static final long HOUR = 60 * MINUTE;

  // Sync Schedule time adjustment.
  private static final long SYNC_INTERVAL = 6 * HOUR;
  private static final long SYNC_DELAY_AFTER_STARTUP = 10 * SECOND;

  public SyncService(TribeEventService tribeEventService, PostService postService) {
    this.tribeEventService = tribeEventService;
    this.postService = postService;
  }

  @Scheduled(fixedRate = SYNC_INTERVAL, initialDelay = SYNC_DELAY_AFTER_STARTUP)
  public void syncEvents() {
    tribeEventService.syncEvents();
    System.out.println("Events synced at " + java.time.LocalDateTime.now());
  }

  @Scheduled(fixedRate = SYNC_INTERVAL, initialDelay = SYNC_DELAY_AFTER_STARTUP)
  public void syncPosts() {
    postService.syncPosts();
    System.out.println("Posts synced at " + java.time.LocalDateTime.now());
  }
}
