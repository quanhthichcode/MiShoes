package com.example.backend.entity;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.sql.Date;
import java.time.LocalDateTime;

@Entity
@Table(name = "hoa_don")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@Builder
public class HoaDon {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID )
    private String id;
    private String ma;
    @Column(name = "nhan_vien_id")
    private String nhanVien;
    @ManyToOne
    @JoinColumn(name = "khach_hang_id")
    private NguoiDung nguoiDung;
    @ManyToOne
    @JoinColumn(name = "voucher_id")
    private Voucher voucher;
    private LocalDateTime ngayMua;
    private BigDecimal giaGoc;
    private BigDecimal giaGiamGia;
    private BigDecimal thanhTien;
    private int diemSuDung;
    private int giaTriDiem;
    private int loaiHoaDon;
    private String tenNguoiNhan;
    private String soDienThoai;
    private String email;
    private String diaChi;
    private String qrCode;
    private String ghiChu;
    private Date ngayDuKienNhan;
    private Date ngayNhanHang;
    private Date ngayTraHang;
    private String nguoiTao;
    private String nguoiSua;
    private LocalDateTime ngayTao;
    private LocalDateTime ngaySua;
    private int trangThai;
    private BigDecimal tienVanChuyen;
    private int traSau;


//    @PrePersist
//    public void ensureId() {
//        System.out.println("ID chưa thêm"+id);
//        if (id == null) {
//            id = java.util.UUID.randomUUID().toString();
//        }
//    }
}
