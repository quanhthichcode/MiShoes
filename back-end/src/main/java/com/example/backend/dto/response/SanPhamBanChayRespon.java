package com.example.backend.dto.response;

import java.math.BigDecimal;

public interface SanPhamBanChayRespon {
    String getIdSP();
    String getLinkAnh();
    String getTenSp();
    String getMauSac();
    String getKichThuoc();
    String getHang();
    BigDecimal getGiaBan();
    String getSoLuong();

}
