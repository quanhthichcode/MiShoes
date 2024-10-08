package com.example.backend.dto.response;

import org.springframework.beans.factory.annotation.Value;

import java.math.BigDecimal;

public interface AdminKhuyenMai {
    @Value("#{target.id}")
    String getId();
    @Value("#{target.ma}")
    String getMa();
    @Value("#{target.ten}")
    String getTen();
    @Value("#{target.loai}")
    String getLoai();
    @Value("#{target.gia_tri_khuyen_mai}")
    BigDecimal getGia_tri_khuyen_mai();
    @Value("#{target.ngay_bat_dau}")
    String getNgay_bat_dau();
    @Value("#{target.ngay_ket_thuc}")
    String getngay_ket_thuc();
    @Value("#{target.trangThai}")
    int getTrangThai();
}
