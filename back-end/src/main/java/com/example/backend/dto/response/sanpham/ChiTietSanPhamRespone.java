package com.example.backend.dto.response.sanpham;


import org.springframework.beans.factory.annotation.Value;

import java.math.BigDecimal;

public interface ChiTietSanPhamRespone {

    @Value("#{target.idCTSP}")
    String getIdCTSP();

    @Value("#{target.linkAnh}")
    String getLinkAnh();

    @Value("#{target.tenSP}")
    String getTenSP();

    @Value("#{target.tenKT}")
    String getTenKT();

    @Value("#{target.tenMS}")
    String getTenMS();

    @Value("#{target.maMS}")
    String getMaMS();

    @Value("#{target.soLuong}")
    int getSoLuong();

    @Value("#{target.giaBan}")
    BigDecimal getGiaBan();

    @Value("#{target.trangThai}")
    int getTrangThai();
}
