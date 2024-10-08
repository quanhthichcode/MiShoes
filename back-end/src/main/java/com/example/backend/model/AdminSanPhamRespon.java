package com.example.backend.model;

import org.springframework.beans.factory.annotation.Value;

public interface AdminSanPhamRespon {
    @Value("#{target.idSP}")
    String getIdSP();

    @Value("#{target.ma}")
    String getMa();

    @Value("#{target.ten}")
    String getTen();

    @Value("#{target.soLuong}")
    int getSoLuong();

    @Value("#{target.trangThai}")
    String getTrangThai();
}
