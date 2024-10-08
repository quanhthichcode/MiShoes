package com.example.backend.dto.response;


import java.time.LocalDateTime;

public interface LichSuHoaDonRespone {
    public String getMoTaHoatDong();
    public String getNguoiTao();
    public String getNguoiSua();
    public LocalDateTime getNgayTao();
    public LocalDateTime getNgaySua();
    public int getTrangThai();
}
