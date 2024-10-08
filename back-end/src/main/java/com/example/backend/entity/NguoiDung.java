package com.example.backend.entity;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.sql.Date;
import java.time.LocalDateTime;
import java.util.Collection;

@Entity
@Table(name = "nguoi_dung")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
@ToString
public class NguoiDung {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;
    private String ma;
    private String ten;
    private Long ngaySinh;
    private String soDienThoai;
    private LocalDateTime ngayThamGia;
    private String chungMinhThu;
    private Boolean gioiTinh;
    private String anh;
    private String email;
    private String matKhau;
    private String nguoiTao;
    private String nguoiSua;
    private LocalDateTime ngayTao;
    private LocalDateTime ngaySua;
    private String chucVu;
    private String hangKhachHang;
    private int diem;
    private int trangThai;


}
