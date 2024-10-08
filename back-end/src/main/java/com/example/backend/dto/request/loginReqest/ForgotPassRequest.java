package com.example.backend.dto.request.loginReqest;

import com.example.backend.entity.NguoiDung;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ForgotPassRequest {
    private String email;
}
