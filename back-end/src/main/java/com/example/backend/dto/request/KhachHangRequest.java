package com.example.backend.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class KhachHangRequest {
    private String id;
    private String ten;
    private Long ngaySinh;
    private String soDienThoai;
    private String email;
    private Boolean gioiTinh;
    private String canCuocCongDan;
    private int trangThai;
    private int idThanhPho;
    private String tenThanhPho;
    private int idHuyen;
    private String tenHuyen;
    private String idXa;
    private String tenXa;
    private String diaChi;
}
