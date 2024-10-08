package com.example.backend.dto.response;

import org.springframework.beans.factory.annotation.Value;

public interface AdminHoaDonTimeLineRespon {
    @Value("#{target.moTaHoatDong}")
    String getMotaHoatDong();

    @Value("#{target.nguoiTao}")
    String getNguoiTao();

    @Value("#{target.ngayTao}")
    String getNgayTao();

    @Value("#{target.trangThai}")
    String getTrangThai();

}
