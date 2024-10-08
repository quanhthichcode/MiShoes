package com.example.backend.dto.request.sanpham;


import com.example.backend.entity.ChatLieu;
import com.example.backend.entity.DanhMuc;
import lombok.*;

import java.sql.Date;
import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder

public class ChatLieuRequest {

    private String ma;

    private String ten;

    private LocalDateTime ngayTao;

    private LocalDateTime ngaySua;

    private String nguoiTao;

    private String nguoiSua;

    private int trangThai;

    public ChatLieu mapCL(ChatLieu cl){
        cl.setMa(this.ma);
        cl.setTen(this.ten);
        cl.setNgayTao(this.ngayTao);
        cl.setNgaySua(this.ngaySua);
        cl.setNguoiTao(this.nguoiTao);
        cl.setNguoiSua(this.nguoiSua);
        cl.setTrangThai(this.trangThai);
        return cl;
    }
}
