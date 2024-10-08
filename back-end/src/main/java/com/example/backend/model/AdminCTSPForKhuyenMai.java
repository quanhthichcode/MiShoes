package com.example.backend.model;

import org.springframework.beans.factory.annotation.Value;

import java.math.BigDecimal;

public interface AdminCTSPForKhuyenMai {

    @Value("#{target.idCTSP}")
    String getIdCTSP();

    @Value("#{target.tenSP}")
    String getTenSP();

//    @Value("#{target.tenKM}")
//    String getTenKM();

    @Value("#{target.tenKT}")
    String getTenKT();

    @Value("#{target.tenMS}")
    String getTenMS();

    @Value("#{target.tenCL}")
    String getTenCL();

    @Value("#{target.tenDG}")
    String getTenDG();

    @Value("#{target.tenDM}")
    String getTenDM();

    @Value("#{target.tenH}")
    String getTenH();

    @Value("#{target.soLuong}")
    int getSoLuong();

    @Value("#{target.giaBan}")
    BigDecimal getGiaBan();

    @Value("#{target.moTa}")
    String getMoTa();

    @Value("#{target.trangThai}")
    String getTrangThai();
}
