package com.example.backend.dto.response.sanpham;

import java.math.BigDecimal;

public interface DetailCtspByQrRespon {
    String getSanPham();
    String getId();
    String getLinkAnh();
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

    String getMaMS();
    String getTenKT();
    String getTenMS();
    String getTenKM();
    int getTrangThai();

    String getLoaiKM();
    BigDecimal getGiaTriKhuyenMai();
}
