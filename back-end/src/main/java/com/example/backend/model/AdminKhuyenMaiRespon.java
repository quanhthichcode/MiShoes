package com.example.backend.model;

import org.springframework.beans.factory.annotation.Value;

public interface AdminKhuyenMaiRespon {
    @Value("#{target.idKM}")
    String getIDKM();

    @Value("#{target.maKM}")
    String getMaKM();

    @Value("#{target.tenKM}")
    String getTenKM();

    @Value("#{target.ToiDaKM}")
    String getToiDaKM();

    @Value("#{target.ngayBD}")
    String getNgayBD();

    @Value("#{target.ngayKT}")
    String getNgayKT();

    @Value("#{target.loaiKM}")
    String getLoaiKM();

    @Value("#{target.trangThai}")
    String getTrangThai();

    @Value("#{target.nguoiTao}")
    String getNguoiTao();

    @Value("#{target.nguoiSua}")
    String getNguoiSua();

    @Value("#{target.ngayTao}")
    String getNgayTao();

    @Value("#{target.ngaySua}")
    String getNgaySua();

    @Value("#{target.idCTSP}")
    String getIDCTSP();
}
