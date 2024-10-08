package com.example.backend.dto.response;

import lombok.ToString;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.sql.Date;

public interface VoucherRespone {
    public String getId();
    public String getMa();
    public String getTen();
    public String getLoaiVoucher();
    public LocalDateTime getNgayBatDau();
    public LocalDateTime getNgayKetThuc();
    public String getMucDo();
    public BigDecimal getGiamToiDa();
    public BigDecimal getDieuKien();
    public String getSoLuong();
    public String getNguoiTao();
    public String getNguoiSua();
    public Date getNgayTao();
    public Date getNgaySua();
    public String getTrangThai();
    public int getNgayConLai();

}
