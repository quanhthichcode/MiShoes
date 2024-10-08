package com.example.backend.dto.response;

import java.time.LocalDateTime;

public interface LichSuDiemRespone {
    public int getDiem();
    public LocalDateTime getNgayTao();
    public LocalDateTime getNgaySua();
    public String getNguoiTao();
    public String getNguoiSua();
    public int getTrangThai();
}
