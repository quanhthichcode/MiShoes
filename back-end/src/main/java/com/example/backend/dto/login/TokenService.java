package com.example.backend.dto.login;

public interface TokenService {
    String genToken(String username);
    String getUserNameByToken(String token);
}
