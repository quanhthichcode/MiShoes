package com.example.backend.service;

import com.example.backend.util.security.JwtTokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TokenService {

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    public  String genToken(String userName){
        return jwtTokenProvider.generateTokenByUser(userName);
    }

    public  String getUserNameByToken(String token){
        return jwtTokenProvider.getUsername(token);
    }


}
