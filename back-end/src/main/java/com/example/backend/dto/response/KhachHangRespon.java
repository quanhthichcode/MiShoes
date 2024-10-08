package com.example.backend.dto.response;

import org.springframework.beans.factory.annotation.Value;

import java.util.Date;

public interface KhachHangRespon {
    @Value("#{target.stt}")
    Integer getSTT();

    @Value("#{target.id}")
    String getId();

    @Value("#{target.ma}")
    String getMa();

    @Value("#{target.email}")
    String getEmail();

    @Value("#{target.ngayTao}")
    Date getNgayTao();

    @Value("#{target.ngayThamGia}")
    Date getNgayThamGia();

    @Value("#{target.anh}")
    String getAnh();

    @Value("#{target.soDienThoai}")
    String getSoDienThoai();

    @Value("#{target.trangThai}")
    String getTrangThai();

    @Value("#{target.ngaySinh}")
    Long getNgaySinh();

    @Value("#{target.ten}")
    String getTen();

    @Value("#{target.gioiTinh}")
    String getGioiTinh();

    @Value("#{target.canCuocCongDan}")
    String getCanCuocCongDan();


    // todo: address
    @Value("#{target.idDiaChi}")
    String getIdDiaChi();

    @Value("#{target.tenThanhPho}")
    String getTenThanhPho();

    @Value("#{target.tenHuyen}")
    String getTenHuyen();

    @Value("#{target.tenXa}")
    String getTenXa();

    @Value("#{target.diaChi}")
    String getDiaChi();
}
