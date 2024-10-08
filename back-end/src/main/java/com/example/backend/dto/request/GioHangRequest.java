package com.example.backend.dto.request;


import com.example.backend.entity.GioHang;
import com.example.backend.entity.NguoiDung;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder

public class GioHangRequest {
    private  String id;
    private String ma;
    private String khachHang;
    private String nhanVien;
    private String nguoiTao;
    private String nguoiSua;
    private LocalDateTime ngayTao;
    private LocalDateTime ngaySua;
    private int trangThai;
    public GioHang map(GioHang gioHang){
        gioHang.setId(this.id);
        gioHang.setMa(this.ma);
        if(this.khachHang!=null ) {
            gioHang.setKhachHang(NguoiDung.builder().id(this.khachHang).build());
        }
        gioHang.setNhanVien(this.nhanVien);
        gioHang.setNguoiTao(this.nguoiTao);
        gioHang.setNguoiSua(this.nguoiSua);
        gioHang.setNgayTao(this.ngayTao);
        gioHang.setNgaySua(this.ngaySua);
        gioHang.setTrangThai(this.trangThai);
        return gioHang;
    }
}
