package com.example.backend.dto.response;

import com.example.backend.util.Status;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import org.springframework.beans.factory.annotation.Value;

import java.math.BigDecimal;

public interface AdminVoucher {
    @Value("#{target.id}")
    String getId();
    @Value("#{target.ma}")
    String getMa();
    @Value("#{target.ten}")
    String getTen();
    @Value("#{target.mucDo}")
    int getMucDo();
    @Value("#{target.giamToiDa}")
    BigDecimal getGiamToiDa();
    @Value("#{target.dieuKien}")
    String getDieuKien();
    @Value("#{target.soLuong}")
    int getSoLuong();
    @Value("#{target.loaiVoucher}")
    String getLoaiVoucher();
    @Value("#{target.ngayBatDau}")
    String getNgayBatDau();
    @Value("#{target.ngayKetThuc}")
    String getNgayKetThuc();
    @Value("#{target.trangThai}")
    @Enumerated(EnumType.STRING)
    Status getTrangThai();
}
