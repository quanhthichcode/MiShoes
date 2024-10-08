package com.example.backend.model;

import org.springframework.beans.factory.annotation.Value;

public interface AdminHoaDonSanPham {
    @Value("#{target.soLuongSP}")
    String getSoLuongSP();

    @Value("#{target.giaBanSP}")
    String getGiaBanSP();

    @Value("#{target.urlHA}")
    String getUrlHA();

    @Value("#{target.TenSP}")
    String getTenSP();
    @Value("#{target.tenKichThuoc}")
    String getTenKichThuoc();
    @Value("#{target.tenMauSac}")
    String getTenMauSac();
    @Value("#{target.tenHang}")
    String getTenHang();
    @Value("#{target.thanhTienSP}")
    String getThanhTienSP();
    @Value("#{target.idCTSP}")
    String getIDCTSP();
    @Value("#{target.giaGiam}")
    String getGiaGiam();

    @Value("#{target.id}")
    String getID();
    @Value("#{target.trangThai}")
    String getTrangThai();
}
