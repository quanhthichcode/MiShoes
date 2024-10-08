package com.example.backend.dto.response;


import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Date;

public interface KhuyenMaiRespone {
    public String getMa();
    public String getTen();
    public BigDecimal getGiaTriKhuyenMai();
    public LocalDateTime getNgayBatDau();
    public LocalDateTime getNgayKetThuc();
    public String getLoai();
    public String getNguoiTao();
    public String getNguoiSua();
    public Date getNgayTao();
    public Date getNgaySua();
    public Integer getTrangThai();
}
