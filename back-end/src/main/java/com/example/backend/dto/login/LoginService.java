package com.example.backend.dto.login;

import org.springframework.stereotype.Service;


public interface LoginService {
    String login(LoginPayLoad loginPayload);
}
