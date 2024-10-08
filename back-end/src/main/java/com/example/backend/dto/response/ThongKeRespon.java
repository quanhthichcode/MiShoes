package com.example.backend.dto.response;


import org.springframework.beans.factory.annotation.Value;

public interface ThongKeRespon {
    @Value("#{target.tongTienThongKe}")
    Float getTongTienThongKe();
    @Value("#{target.tongHoaDonThongKe}")
    int getTongHoaDonThongKe();
}
