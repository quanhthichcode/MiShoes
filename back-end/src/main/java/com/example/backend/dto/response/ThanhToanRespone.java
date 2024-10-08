package com.example.backend.dto.response;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public interface ThanhToanRespone {
    public int getPhuongThuc();
    public BigDecimal getTienMat();
    public BigDecimal getChuyenKhoan();
    public BigDecimal getTongTien();
    public String getPhuongThucVnp();
    public String getMoTa();
    public LocalDateTime getNgayTao();
    public LocalDateTime getNgaySua();
    public String getNguoiTao();
    public String getNguoiSua();
    public int getTrangThai();
}
