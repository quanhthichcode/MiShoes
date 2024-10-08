package com.example.backend.dto.response.sanpham;

import org.springframework.beans.factory.annotation.Value;

import java.math.BigDecimal;

public interface DetailCTSPRespone {
    String getSanPham();
    String getId();
    String getGhiChu();
    String getTenSP();

    String getKichThuoc();

    String getMauSac();

    String getChatLieu();

    String getDeGiay();

    String getDanhMuc();

    String getHang();

    int getSoLuong();

    BigDecimal getGiaBan();

    String getMoTa();

    int getTrangThai();

    String getLoaiKM();
    BigDecimal getGiaTriKhuyenMai();
}
