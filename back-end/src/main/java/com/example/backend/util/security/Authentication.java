package com.example.backend.util.security;
import com.example.backend.entity.NguoiDung;
import com.example.backend.repository.NguoiDungRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Collections;


@Component
public class Authentication implements AuthenticationProvider {
    @Autowired
    NguoiDungRepository nguoiDungRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public org.springframework.security.core.Authentication authenticate(org.springframework.security.core.Authentication authentication) throws AuthenticationException {
        String email = authentication.getName();
        String password =  authentication.getCredentials().toString();//lấy mật khẩu nhập vào
        try {
            NguoiDung nguoiDung = nguoiDungRepository.findByEmail(email)
                        .orElseThrow(() ->
                                new  UsernameNotFoundException("Đăng nhập không thành công  " ) {
                                });

            boolean matches = passwordEncoder.matches(password,nguoiDung.getMatKhau());//so sánh mật khẩu nhập với pass đc mã hóa của người dùng

            if(matches == false){
                throw new BadCredentialsException("Đăng nhập không thành công");
            }

        } catch (UsernameNotFoundException e){
            throw new UsernameNotFoundException("Đăng nhập không thành công  " );
        }

        return new UsernamePasswordAuthenticationToken(email, password, Collections.emptyList());
    }

    @Override
    public boolean supports(Class<?> authentication) {
        return authentication.equals(UsernamePasswordAuthenticationToken.class);
    }
}
