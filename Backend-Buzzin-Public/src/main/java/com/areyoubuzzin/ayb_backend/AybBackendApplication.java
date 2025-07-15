package com.areyoubuzzin.ayb_backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class AybBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(AybBackendApplication.class, args);
	}

}
