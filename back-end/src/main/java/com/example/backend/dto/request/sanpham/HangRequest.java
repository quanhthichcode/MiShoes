package com.example.backend.dto.request.sanpham;


import com.example.backend.entity.Hang;
import com.example.backend.entity.KichThuoc;
import lombok.*;

import java.sql.Date;
import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder

public class HangRequest {

    private String ma;

    private String ten;

    private LocalDateTime ngayTao;

    private LocalDateTime ngaySua;

    private String nguoiTao;

    private String nguoiSua;

    private int trangThai;

    public Hang mapH(Hang h){
        h.setMa(this.ma);
        h.setTen(this.ten);
        h.setNgayTao(this.ngayTao);
        h.setNgaySua(this.ngaySua);
        h.setNguoiTao(this.nguoiTao);
        h.setNguoiSua(this.nguoiSua);
        h.setTrangThai(this.trangThai);
        return h;
    }
}
