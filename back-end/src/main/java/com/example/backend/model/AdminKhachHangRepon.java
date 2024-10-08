package com.example.backend.model;

import org.springframework.beans.factory.annotation.Value;

public interface AdminKhachHangRepon {
    @Value("#{target.diem}")
    String getDiem();

    @Value("#{target.idND}")
    String getIdND();

    @Value("#{target.maND}")
    String getMaND();

    @Value("#{target.tenND}")
    String getTenND();

    @Value("#{target.anh}")
    String getAnh();

    @Value("#{target.gioiTinh}")
    String getGioiTinh();

    @Value("#{target.ngaySinh}")
    String getNgaySinh();

    @Value("#{target.SDT}")
    String getSDT();

    @Value("#{target.email}")
    String getEmail();

    @Value("#{target.cccd}")
    String getCCCD();

    @Value("#{target.trangThai}")
    String getTrangThai();
}
