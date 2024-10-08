package com.example.backend.service;

import com.example.backend.dto.request.GioHangChiTietRequest;
import com.example.backend.dto.response.GioHangChiTietRespone;
import com.example.backend.entity.GioHangChiTiet;
import com.example.backend.repository.GioHangChiTietRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Service
public class GioHangChiTietService {
    @Autowired
    GioHangChiTietRepository gioHangChiTietRepository;
    @Autowired
    GioHangService gioHangService;
    public List<GioHangChiTietRespone> getAllGHCT(String idGH){
        return gioHangChiTietRepository.getAllGioHangChiTiet(idGH);
    }
    public GioHangChiTiet addGHCT(GioHangChiTietRequest request){
        GioHangChiTiet ghct=request.map(new GioHangChiTiet());
        return gioHangChiTietRepository.save(ghct);
    }
    public GioHangChiTiet updateSLGHCT(GioHangChiTietRequest request){
        GioHangChiTiet ghct=gioHangChiTietRepository.findById(request.getId()).get();
        ghct.setSoLuong(ghct.getSoLuong()+ request.getSoLuong());
        ghct.setThanhTien(BigDecimal.valueOf(ghct.getThanhTien().doubleValue()+request.getThanhTien().doubleValue()));
        return gioHangChiTietRepository.save(ghct);
    }
    public GioHangChiTiet updateGHCT(GioHangChiTietRequest request){
        GioHangChiTiet ghct=gioHangChiTietRepository.findById(request.getId()).get();
        ghct.setSoLuong(request.getSoLuong());
        ghct.setThanhTien(request.getThanhTien());
        return gioHangChiTietRepository.save(ghct);
    }
    public GioHangChiTiet deleteGHCT(String id){
        GioHangChiTiet ghct=gioHangChiTietRepository.findById(id).get();
        gioHangChiTietRepository.delete(ghct);
        return ghct;
    }
    public Integer soLuongSanPhamTrongGioHang(String idGH){
        return gioHangChiTietRepository.soLuongSanPhamTrongGioHang(idGH);
    }
}
