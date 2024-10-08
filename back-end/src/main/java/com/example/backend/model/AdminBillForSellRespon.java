package com.example.backend.model;

import org.springframework.beans.factory.annotation.Value;

import java.math.BigDecimal;
import java.sql.Date;
import java.time.LocalDate;
import java.time.LocalDateTime;

public interface AdminBillForSellRespon {
    @Value("#{target.id}")
    String getID();
    @Value("#{target.ma}")
    String getMa();
    @Value("#{target.nhanVien}")
    String getNhanVien();
    @Value("#{target.nhanVienID}")
    String getNhanVienID();
    @Value("#{target.nguoiDung}")
    String getNguoiDung();
    @Value("#{target.tenNguoiDung}")
    String getTenNguoiDung();
    @Value("#{target.gtNguoiDung}")
    String getGTNguoiDung();
    @Value("#{target.giaGoc}")
    BigDecimal getGiaGoc();
    @Value("#{target.giaGiamGia}")
    BigDecimal getGiaGiamGia();
    @Value("#{target.thanhTien}")
    BigDecimal getThanhTien();
    @Value("#{target.tenNguoiNhan}")
    String getTenNguoiNhan();
    @Value("#{target.soDienThoai}")
    String getSoDienThoai();
    @Value("#{target.email}")
    String getEmail();
    @Value("#{target.diaChi}")
    String getDiaChi();
    @Value("#{target.ghiChu}")
    String getGhiChu();
    @Value("#{target.nguoiTao}")
    String getNguoiTao();
    @Value("#{target.nguoiSua}")
    String getNguoiSua();
    @Value("#{target.ngayTao}")
    LocalDateTime getNgayTao();
    @Value("#{target.ngaySua}")
    LocalDateTime getNgaySua();
    @Value("#{target.ngayDuKienNhan}")
    Date getNgayDuKienNhan();
    @Value("#{target.tienVanChuyen}")
    Float getTienVanChuyen();

    @Value("#{target.idHuyen}")
    String getIdHuyen();
    @Value("#{target.idXa}")
    String getIdXa();
    @Value("#{target.idThanhPho}")
    String getIdThanhPho();
}
