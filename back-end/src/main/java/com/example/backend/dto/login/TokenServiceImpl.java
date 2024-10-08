package com.example.backend.dto.login;

import com.example.backend.util.security.JwtTokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TokenServiceImpl implements TokenService{
    @Autowired
    JwtTokenProvider jwtTokenProvider;

    @Override
    public String genToken(String username) {
        String test = jwtTokenProvider.generateTokenByUser(username);
        return test;
    }

    @Override
    public String getUserNameByToken(String token) {
        String userName = jwtTokenProvider.getUsername(token);
        return userName;
    }
}
