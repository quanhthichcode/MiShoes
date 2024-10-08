package com.example.backend.dto.response;


import java.math.BigDecimal;
import java.sql.Date;
import java.time.LocalDateTime;

public interface HoaDonRespone {
    public LocalDateTime getNgayMua();
    public BigDecimal getGiaGoc();
    public BigDecimal getGiaGiamGia();
    public BigDecimal getThanhTien();
    public int getDiemSuDung();
    public int getGiaTriDiem();
    public int getLoaiHoaDon();
    public String getTenNguoiNhan();
    public String getSoDienThoai();
    public String getEmail();
    public String getDiaChi();
    public String getQrCode();
    public String getGhiChu();
    public Date getNgayDuKienNhan();
    public Date getNgayNhanHang();
    public Date getNgayTraHang();
    public String getNguoiTao();
    public String getNguoiSua();
    public LocalDateTime getNgayTao();
    public LocalDateTime getNngaySua();
    public int getTrangThai();
}
