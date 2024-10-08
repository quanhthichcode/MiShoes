package com.example.backend.dto.request;


import com.example.backend.entity.HoaDon;
import com.example.backend.entity.LichSuHoaDon;
import lombok.*;

import java.time.LocalDateTime;
import java.util.Date;

@Getter
@Setter
@ToString

public class LichSuHoaDonRequest {
    String idHD;
     String moTaHoatDong;
     String nguoiTao;
     String nguoiSua;
     LocalDateTime ngayTao;
    LocalDateTime ngaySua;
     int trangThai;
     public LichSuHoaDon map(LichSuHoaDon lichSuHoaDon){
         lichSuHoaDon.setMoTaHoatDong(this.moTaHoatDong);
         lichSuHoaDon.setNguoiTao(this.nguoiTao);
         lichSuHoaDon.setNguoiSua(this.nguoiSua);
         lichSuHoaDon.setNgayTao(this.ngayTao);
         lichSuHoaDon.setNgaySua(this.ngaySua);
         lichSuHoaDon.setTrangThai(this.trangThai);
         lichSuHoaDon.setHoaDon(HoaDon.builder().id(this.idHD).build());
         return  lichSuHoaDon;
     }
}
