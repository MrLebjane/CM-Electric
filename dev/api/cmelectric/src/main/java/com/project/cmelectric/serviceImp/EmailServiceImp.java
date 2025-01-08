package com.project.cmelectric.serviceImp;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.project.cmelectric.service.EmailService;

@Service
public class EmailServiceImp implements EmailService {
	
	@Autowired
    private JavaMailSender mailSender;
    
    @Override
    public void sendEmail(String receiver,String subject,String body) {
    	
    	SimpleMailMessage message=new SimpleMailMessage();
    	message.setFrom("cmelectricinc6@gmail.com");
    	message.setTo(receiver);
    	message.setSubject(subject);
    	message.setText(body);
    	
    	mailSender.send(message);
    }
}
