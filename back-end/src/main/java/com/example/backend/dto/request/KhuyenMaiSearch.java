package com.example.backend.dto.request;

import lombok.*;

import java.math.BigDecimal;
import java.sql.Date;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class KhuyenMaiSearch {
    String ma;
    String ten;
    String loai;
    BigDecimal gia_tri_khuyen_mai;
    LocalDateTime ngay_bat_dau;
    LocalDateTime ngay_ket_thuc;
}
