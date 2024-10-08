package com.example.backend.util.security;

import com.example.backend.entity.NguoiDung;
import com.example.backend.repository.NguoiDungRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
public class CustomUserDetailsService implements UserDetailsService{
    @Autowired
    private NguoiDungRepository nguoiDungRepository;

    @Override
    public UserDetails loadUserByUsername(String Email) throws RuntimeException {
        NguoiDung nguoiDung = nguoiDungRepository.findByEmail(Email)
                .orElseThrow(() ->
                        new RuntimeException("Đăng nhập không thành công "));
        return new org.springframework.security.core.userdetails.User(nguoiDung.getEmail(),
                nguoiDung.getMatKhau(),
                Collections.singletonList(new SimpleGrantedAuthority("ROLE_" + nguoiDung.getChucVu())));
    }
}
