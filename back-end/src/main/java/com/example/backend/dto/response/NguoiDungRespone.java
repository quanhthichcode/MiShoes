package com.example.backend.dto.response;

import java.sql.Date;
import java.time.LocalDateTime;

public interface NguoiDungRespone {
    public String getMa();
    public String getTen();
    public Date getNgaySinh();
    public String getSoDienThoai();
    public LocalDateTime getNgayThamGia();
    public String getChungMinhThu();
    public boolean getGioiTinh();
    public String getAnh();
    public String getEmail();
    public String getMatKhau();
    public String getNguoiTao();
    public String getNguoiSua();
    public LocalDateTime getNgayTao();
    public LocalDateTime getNgaySua();
    public String getChucVu();
    public String getHangKhachHang();
    public int getDiem();
    public int getTrangThai();
}
