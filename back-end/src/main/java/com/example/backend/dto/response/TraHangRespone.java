package com.example.backend.dto.response;

import java.time.LocalDateTime;

public interface TraHangRespone {
    public int getSoLuong();
    public LocalDateTime getNgayTao();
    public LocalDateTime getngaySua();
    public String getNguoiTao();
    public String getNguoiSua();
    public int getTrangThai();
}
