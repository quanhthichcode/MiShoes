package com.example.backend.dto.response;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public interface HoaDonChiTietBanHangRespone {
    public String getIdHDCT();
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
    public String getTenKM();
    public String getLoaiKM();
    public String getGiaTriKhuyenMai();
    public String getTenSP();
    public String getMaMS();
    public String getTenMS();
    public String getTenKT();
    public String getLinkAnh();
    public String getMaHD();
}
