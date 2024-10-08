package com.example.backend.util;

import com.example.backend.util.security.Authentication;
import com.example.backend.util.security.JwtAuthenFiltertication;
import com.example.backend.util.security.JwtAuthenticationEntryPoint;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.security.servlet.PathRequest;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import com.example.backend.util.security.Authentication;
import com.example.backend.util.security.JwtAuthenticationEntryPoint;
import com.example.backend.util.security.JwtAuthenFiltertication;

@Configuration
@EnableWebSecurity
@EnableAutoConfiguration
public class SecurityConfig {
    @Autowired
    private JwtAuthenticationEntryPoint authenticationEntryPoint;

    @Autowired
    private JwtAuthenFiltertication authenFiltertication;

    @Autowired
    private Authentication authenticationProvider;


    private UserDetailsService userDetailsService;

    @Bean
    public static PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.csrf().disable()
                .authorizeHttpRequests
                        (authorize -> authorize
                                        .requestMatchers(PathRequest.toStaticResources().atCommonLocations()).permitAll()
//                                                  .requestMatchers("/admin/thong-bao/**").hasRole("NHANVIEN")
//                                        .requestMatchers("/admin/thong-ke/*").hasRole("NHANVIEN")
//                                        .requestMatchers("/admin/voucher/**").hasAnyRole("NHANVIEN", "ADMIN")
//                                        .requestMatchers("/admin/hoa-don/**").hasAnyRole("NHANVIEN", "ADMIN")
//                                    .requestMatchers("/admin/ban-hang/**").hasAnyRole("NHANVIEN", "ADMIN")
////                                        .requestMatchers("/ban-hang/**").hasAnyRole("NHANVIEN", "ADMIN")
//                                        .requestMatchers("/admin/chat-lieu/**").hasAnyRole("NHANVIEN", "ADMIN")
//                                        .requestMatchers("/admin/ctsp/**").hasAnyRole("NHANVIEN", "ADMIN")
//                                        .requestMatchers("/admin/danh-muc/**").hasAnyRole("NHANVIEN", "ADMIN")
//                                        .requestMatchers("/admin/de-giay/**").hasAnyRole("NHANVIEN", "ADMIN")
//                                        .requestMatchers("/admin/hang/**").hasAnyRole("NHANVIEN", "ADMIN")
//                                        .requestMatchers("/admin/khach-hang/**").hasAnyRole("NHANVIEN", "ADMIN")
//                                        .requestMatchers("/admin/khuyen-mai/**").hasAnyRole("NHANVIEN", "ADMIN")
//                                        .requestMatchers("/admin/kich-thuoc/**").hasAnyRole("NHANVIEN", "ADMIN")
//                                        .requestMatchers("/admin/mau-sac/**").hasAnyRole("NHANVIEN", "ADMIN")
//                                        .requestMatchers("/admin/nguoi-dung-voucher/**").hasAnyRole("NHANVIEN", "ADMIN")
//                                        .requestMatchers("/admin/nhan-vien/**").hasAnyRole("NHANVIEN", "ADMIN")
//                                        .requestMatchers("/admin/san-pham/**").hasAnyRole("NHANVIEN", "ADMIN")
//                                        .requestMatchers("/admin/thanh-toan/**").hasAnyRole("NHANVIEN", "ADMIN")
//                                        .requestMatchers(HttpMethod.GET, "/admin/**").hasAnyRole("NHANVIEN", "ADMIN")
//                                        .requestMatchers(HttpMethod.POST, "/admin/**").hasAnyRole("NHANVIEN", "ADMIN")
//                                        .requestMatchers(HttpMethod.PUT, "/admin/**").hasAnyRole("NHANVIEN", "ADMIN")
//                                        .requestMatchers(HttpMethod.DELETE, "/admin/**").hasAnyRole("ADMIN")
//                                        .requestMatchers("/ban-hang-client/payment-vnpay", "/ban-hang-client/payment-callback", "/ban-hang-client/check-out").permitAll()
//                                        .requestMatchers("/api/**").permitAll()
//                                        .requestMatchers("/ban-hang-client/**").permitAll()
//                                        .requestMatchers("/client-hoa-don/**").permitAll()
//                                        .requestMatchers("/gio-hang/**").permitAll()
//                                        .requestMatchers("/gio-hang-chi-tiet/**").permitAll()
//                                        .requestMatchers("/khach-hang/**").permitAll()
//                                        .requestMatchers("/KH/thong-bao/**").permitAll()
//                                        .requestMatchers("/client/lich-su-hoa-don/**").permitAll()
//                                        .requestMatchers("/api/genToken/**").permitAll()
//                                        .requestMatchers("/ws/**").permitAll()
                                        .anyRequest().permitAll()
                        )
                .exceptionHandling(exceptionHandling -> exceptionHandling
                        .authenticationEntryPoint(authenticationEntryPoint)
                )
                .authenticationProvider(authenticationProvider)
                .sessionManagement(sessionManagement -> sessionManagement
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                )
                .headers(headers -> headers
                        .frameOptions().disable()
                )
                .addFilterBefore(authenFiltertication, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }


    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception {
        return configuration.getAuthenticationManager();
    }
}