package com.example.login.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins="http://localhost:4200")
public class EmailController {

    @Autowired
    public JavaMailSender emailSender;

    @ResponseBody
    @GetMapping("/sendemail")
    public HttpStatus sendSimpleEmail(@RequestParam String email) {
        try{
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(email);
            message.setSubject("Register account");
            message.setText("Your account is active, you can login at http://localhost:4200/login");
            this.emailSender.send(message);
            return HttpStatus.OK;
        }catch (Exception e){
            return HttpStatus.BAD_REQUEST;
        }
    }

}
