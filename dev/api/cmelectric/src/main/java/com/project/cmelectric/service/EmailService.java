package com.project.cmelectric.service;

import org.springframework.stereotype.Repository;

@Repository
public interface EmailService {
	public void sendEmail(String receiver,String subject,String body);
}
