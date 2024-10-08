package com.example.backend.dto.response;


import java.math.BigDecimal;
import java.time.LocalDateTime;

public interface HoaDonChiTietRespone {
    public String getIdHD();
    public String getIdCTSP();
    public int getSoLuong();
    public BigDecimal getGiaSauGiam();
    public BigDecimal getGiaGiam();
    public String getNguoiTao();
    public String getNguoiSua();
    public LocalDateTime getNgayTao();
    public LocalDateTime getNgaySua();
    public int getTrangThai();
}
