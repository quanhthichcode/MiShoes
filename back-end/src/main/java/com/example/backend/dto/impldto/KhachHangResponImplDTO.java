package com.example.backend.dto.impldto;

import com.example.backend.entity.DiaChi;
import com.example.backend.entity.NguoiDung;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class KhachHangResponImplDTO {
    private Integer stt;
    private String iduser;
    private String ma;
    private String ten;
    private Long ngaySinh;
    private String soDienThoai;
    private LocalDateTime ngayThamGia;
    private LocalDateTime ngaySua;
    private String chungMinhThu;
    private Boolean gioiTinh;
    private String avatar;
    private String email;
    private String nguoiTao;
    private String chucVu;
    private int trangThai;
    private String idAddress;
    private String tenThanhPho;
    private String tenHuyen;
    private String tenXa;
    private String diaChi;
    public KhachHangResponImplDTO (NguoiDung nguoiDung, DiaChi diaChi){
        this.iduser=nguoiDung.getId();
        this.email=nguoiDung.getEmail();
        this.ma=nguoiDung.getMa();
        this.ngayThamGia=nguoiDung.getNgayThamGia();
        this.ngaySua=nguoiDung.getNgaySua();
        this.avatar=nguoiDung.getAnh();
        this.soDienThoai=nguoiDung.getSoDienThoai();
        this.trangThai=nguoiDung.getTrangThai();
        this.ngaySinh=nguoiDung.getNgaySinh();
        this.ten=nguoiDung.getTen();
        this.gioiTinh=nguoiDung.getGioiTinh();
        this.chungMinhThu=nguoiDung.getChungMinhThu();
        this.idAddress=diaChi.getId();
        this.tenThanhPho=diaChi.getTenThanhPho();
        this.tenHuyen=diaChi.getTenHuyen();
        this.tenXa=diaChi.getTenXa();
        this.diaChi=diaChi.getDiaChi();

    }
    public  KhachHangResponImplDTO (NguoiDung nguoiDung){
        this.iduser=nguoiDung.getId();
        this.email=nguoiDung.getEmail();
        this.ma=nguoiDung.getMa();
        this.ngayThamGia=nguoiDung.getNgayThamGia();
        this.ngaySua=nguoiDung.getNgaySua();
        this.avatar=nguoiDung.getAnh();
        this.soDienThoai=nguoiDung.getSoDienThoai();
        this.trangThai=nguoiDung.getTrangThai();
        this.ngaySinh=nguoiDung.getNgaySinh();
        this.ten=nguoiDung.getTen();
        this.gioiTinh=nguoiDung.getGioiTinh();
        this.chungMinhThu=nguoiDung.getChungMinhThu();
    }
}
