package com.example.backend.dto.response;

import org.springframework.beans.factory.annotation.Value;

public interface AdminHoaDonTimeLineRes {
    @Value("#{target.hdTimeLine}")
    String getHDTimeLine();
}
