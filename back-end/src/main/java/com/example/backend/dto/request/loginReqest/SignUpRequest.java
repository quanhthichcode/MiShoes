package com.example.backend.dto.request.loginReqest;

import com.example.backend.entity.NguoiDung;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class SignUpRequest {
    private String ten;
    private String email;
    private String matKhau;



    public NguoiDung map(NguoiDung nguoiDung) {
        nguoiDung.setTen(this.ten);
        nguoiDung.setEmail(this.email);
        nguoiDung.setMatKhau(this.matKhau);

        return nguoiDung;
    }
}
