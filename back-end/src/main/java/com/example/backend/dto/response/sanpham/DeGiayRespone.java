package com.example.backend.dto.response.sanpham;


import java.sql.Date;
import java.time.LocalDateTime;

public interface DeGiayRespone {
    public String getId();

    public String getMa();

    public String getTen();

    public LocalDateTime getNgayTao();

    public LocalDateTime getNgaySua();

    public String getNguoiTao();

    public String getNguoiSua();

    public int getTrangThai();
}
