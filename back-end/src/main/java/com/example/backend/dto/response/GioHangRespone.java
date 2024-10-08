package com.example.backend.dto.response;


import java.time.LocalDateTime;

public interface GioHangRespone {
    public String getID();
    public String getMa();
    public String getNhanVien();
    public String getKhachHang();
    public String getNguoiTao();
    public String getNguoiSua();
    public LocalDateTime getNgayTao();
    public LocalDateTime getNgaySua();
    public int getTrangThai();
}
