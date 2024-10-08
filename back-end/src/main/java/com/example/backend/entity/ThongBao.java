package com.example.backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Date;
import java.time.LocalDateTime;

@Entity
@Table(name = "thong_bao")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class ThongBao {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;
    @ManyToOne
    @JoinColumn(name = "hoa_don_id")
    private HoaDon hoaDon;

    @ManyToOne
    @JoinColumn(name = "nguoi_dung")
    private NguoiDung nguoiDung;
    private String noiDung;
    private int loai;
    private int trangThai;
    private LocalDateTime ngayTao;
    private LocalDateTime ngaySua;
}
