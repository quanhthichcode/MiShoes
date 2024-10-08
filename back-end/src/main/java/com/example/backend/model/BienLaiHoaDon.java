package com.example.backend.model;

import com.example.backend.dto.request.HoaDonChiTietSendMailRequest;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class BienLaiHoaDon {
    private String sdt;

    private String diaChi;

    private String ten;

    private String ma;

    private String giamgia;

    private String tongTien;

    private String ghiChu;

    private String phiShip;

    private String anh;

    private String tongThanhToan;

    private LocalDateTime date;

    private Integer soLuong;

    private List<HoaDonChiTietSendMailRequest> items;
}
