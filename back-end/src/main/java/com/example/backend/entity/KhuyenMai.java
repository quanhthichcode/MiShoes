package com.example.backend.entity;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.text.NumberFormat;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.Locale;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Builder

@Table(name = "khuyen_mai")
public class KhuyenMai {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;
    private String ma;
    private String ten;
    private BigDecimal gia_tri_khuyen_mai;
    private LocalDateTime ngay_bat_dau;
    private LocalDateTime ngay_ket_thuc;
    private String loai;
    private String nguoiTao;
    private String nguoiSua;
    private Date ngayTao;
    private Date ngaySua;
    private Integer trangThai;

    @Override
    public String toString() {
        return ten;

    }

    public String formatCurrency(){
        Locale loc = new Locale("vi","VN");
        NumberFormat nf = NumberFormat.getCurrencyInstance(loc);
        return  nf.format(this.gia_tri_khuyen_mai);

    }

    public String formatDate(LocalDateTime ldt){
        return ldt.getHour()+":"+ldt.getMinute()+ " - "+ldt.getDayOfMonth()+"/"+ldt.getMonthValue()+"/"+ldt.getYear();
    }
}
