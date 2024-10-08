package com.example.backend.dto.login;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LoginPayLoad {
    @NotBlank(message = "email không được để trống")
    private String email;

    @NotBlank(message = "Password không được để trống")
    private String password;
}
