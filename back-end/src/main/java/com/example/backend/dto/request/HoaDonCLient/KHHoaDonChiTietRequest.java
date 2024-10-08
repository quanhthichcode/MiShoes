package com.example.backend.dto.request.HoaDonCLient;

import lombok.*;

import java.math.BigDecimal;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class KHHoaDonChiTietRequest {
    private String idCTSP;

    private BigDecimal donGia;

    private Integer soLuong;

   private String idGioHang;
}
