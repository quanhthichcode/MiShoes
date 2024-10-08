package com.example.backend.dto.request;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class HoaDonChiTietSendMailRequest {
    private String ma;

    private String soLuong;

    private String donGia;

    private String anh;
}
