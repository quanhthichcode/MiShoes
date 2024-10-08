package com.example.backend.model;

import org.springframework.beans.factory.annotation.Value;

public interface AdminBanHangHDRespon {
    @Value("#{target.ghiChuHD}")
    String getGhiChuHD();
    @Value("#{target.idHD}")
    String getIdHD();
    @Value("#{target.maHD}")
    String getMaHD();
    @Value("#{target.maNV}")
    String getMaNV();
    @Value("#{target.tenKH}")
    String getTenKH();
    @Value("#{target.sdt}")
    String getSDT();
    @Value("#{target.diaChiKH}")
    String getDiaChiKH();
    @Value("#{target.ngayMua}")
    String getNgayMua();
    @Value("#{target.thanhTien}")
    String getThanhTien();
    @Value("#{target.trangThai}")
    String getTrangThai();
    @Value("#{target.loaiHD}")
    String getLoaiHD();
    @Value("#{target.soLuongSP}")
    String getSoLuongSP();
    @Value("#{target.giaBanSP}")
    String getGiaBanSP();
    @Value("#{target.tenHA}")
    String getTenHA();
    @Value("#{target.tenSP}")
    String getTenSP();
    @Value("#{target.tenKichThuoc}")
    String getTenKichThuoc();
    @Value("#{target.tenMauSac}")
    String getTenMauSac();
    @Value("#{target.tenHang}")
    String getTenHang();
}
