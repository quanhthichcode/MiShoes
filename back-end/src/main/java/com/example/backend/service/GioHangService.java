package com.example.backend.service;

import com.example.backend.dto.request.GioHangRequest;
import com.example.backend.dto.response.GioHangRespone;
import com.example.backend.entity.GioHang;
import com.example.backend.repository.GioHangRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class GioHangService {
    @Autowired
    GioHangRepository gioHangRepository;

    public GioHang addGioHang(GioHangRequest request){
        GioHang gh=request.map(new GioHang());
        gh.setNgayTao(LocalDateTime.now());
        return gioHangRepository.save(gh);
    }
    public GioHangRespone detailGioHang(String idKH){
        return gioHangRepository.detailGioHang(idKH);
    }
    public GioHangRespone detailGHByID(String id){
        return gioHangRepository.detailGHByID(id);
    }
}
