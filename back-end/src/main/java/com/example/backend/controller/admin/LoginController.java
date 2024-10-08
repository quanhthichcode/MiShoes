package com.example.backend.controller.admin;

import com.example.backend.dto.login.LoginPayLoad;
import com.example.backend.dto.login.LoginRespon;
import com.example.backend.dto.login.LoginService;
import com.example.backend.dto.request.loginReqest.ForgotPassRequest;
import com.example.backend.dto.request.loginReqest.SignUpRequest;
import com.example.backend.repository.NguoiDungRepository;
import com.example.backend.service.KhachHangService;
import com.example.backend.service.NguoiDungService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("http://localhost:3000/")
@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class LoginController {
    @Autowired
    NguoiDungRepository nguoiDungRepository;
    @Autowired
    NguoiDungService nguoiDungService;
  @Autowired
  KhachHangService khachHangService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private LoginService loginService;
    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginPayLoad loginPayload) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginPayload.getEmail(),loginPayload.getPassword())
            );
            SecurityContextHolder.getContext().setAuthentication(authentication);
            String token = loginService.login(loginPayload);
            String email = loginPayload.getEmail();

            LoginRespon jwtAuthResponse = new LoginRespon();
            jwtAuthResponse.setAccessToken(token);
            jwtAuthResponse.setEmail(email);
            jwtAuthResponse.setMa(nguoiDungService.findByToken(token).getMa());
            jwtAuthResponse.setChucVu(nguoiDungService.findByToken(token).getChucVu());
            jwtAuthResponse.setTen(nguoiDungService.findByToken(token).getTen());
            jwtAuthResponse.setAnh(nguoiDungService.findByToken(token).getAnh());
//            jwtAuthResponse.setUserID(khUserService.findByToken(token) != null ? khUserService.findByToken(token).getId() : null);
            jwtAuthResponse.setUserID(nguoiDungService.findByToken(token).getId());

//            ResponseDTO response = new ResponseDTO(true, "Logged In Successfully!", jwtAuthResponse, null, HttpStatus.OK.value());
            return ResponseEntity.ok(jwtAuthResponse);
        } catch (AuthenticationException ex) {
            // Lỗi xác thực, đăng nhập không thành công
//            ResponseDTO response = new ResponseDTO(false, "Invalid Username or Password", null, ex.getMessage(), HttpStatus.UNAUTHORIZED.value());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(ex);
        }
    }
    @PostMapping("/sign-up")
    public ResponseEntity<?> signUP(@RequestBody SignUpRequest signUpRequest) {
        return ResponseEntity.ok(khachHangService.signUp(signUpRequest));
    }
    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPass(@RequestBody ForgotPassRequest forgotPassRequest) {
        return ResponseEntity.ok(khachHangService.forgotPass(forgotPassRequest));
    }

}
