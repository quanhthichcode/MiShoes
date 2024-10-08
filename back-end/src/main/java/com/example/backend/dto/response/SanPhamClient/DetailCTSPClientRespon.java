package com.example.backend.dto.response.SanPhamClient;

import java.math.BigDecimal;

public interface DetailCTSPClientRespon {
    String getId();

    String getMoTa();

    String getSanPhamID();

    String getTenSP();

    String getKichThuocID();

    String getMauSacID();

    String getTenCL();

    String getDeGiayID();

    String getTenDeGiay();

    String getDanhMucID();

    String getTenDM();

    String getHangID();

    String getTenHang();

    int getSoLuong();

    BigDecimal getGiaBan();

    int getTrangThai();

    String getAnh();

    String getKhuyenMaiID();

    String getLoaiKM();

    BigDecimal getGiaTriKhuyenMai();
}
