package com.example.backend.dto.response;


import java.math.BigDecimal;
import java.time.LocalDateTime;

public interface CongThucRespone {

    public BigDecimal getGiaTriDoi();
    public BigDecimal getTiSo();
    public LocalDateTime getNgayTao();
    public LocalDateTime getNgaySua();
    public String getNguoiTao();
    public String getNguoiSua();
    public int getTrangThai();
}
