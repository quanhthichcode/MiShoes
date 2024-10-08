package com.example.backend.service;

import com.example.backend.dto.request.TraHangRequest;
import com.example.backend.dto.response.HoaDonChiTietBanHangRespone;
import com.example.backend.entity.ChiTietSanPham;
import com.example.backend.entity.HoaDon;
import com.example.backend.entity.HoaDonChiTiet;
import com.example.backend.entity.TraHang;
import com.example.backend.repository.HoaDonChiTietRepository;
import com.example.backend.repository.HoaDonRepository;
import com.example.backend.repository.TraHangRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class TraHangService {
    @Autowired
    HoaDonRepository  hoaDonRepository;
    @Autowired
    HoaDonChiTietRepository hoaDonChiTietRepository;
    @Autowired
    TraHangRepository traHangRepository;

    public List<HoaDonChiTietBanHangRespone> getAllHDCTByHoaDon(String ma){
        HoaDon hoaDon=hoaDonRepository.getHDByMaTraHang(ma);
        if(hoaDon!=null){
            List<HoaDonChiTietBanHangRespone> list=hoaDonChiTietRepository.getAllHDCTByHD(hoaDon.getId());
            return list;
        }
        return null;
    }
    public HoaDon getHoaDonByMa(String ma){
        return hoaDonRepository.getHDByMaTraHang(ma);
    }
    public TraHang addTraHang(TraHangRequest request){
        TraHang traHang=request.map(new TraHang());
        traHang.setNgayTao(LocalDateTime.now());
        traHang.setTrangThai(0);
        HoaDonChiTiet hdct=hoaDonChiTietRepository.findById(request.getIdHDCT()).get();
        if(traHang.getSoLuong()== hdct.getSoLuong()){
            hdct.setTrangThai(2);
            hoaDonChiTietRepository.save(hdct);
        }else{
            hdct.setSoLuong(hdct.getSoLuong()-request.getSoLuong());
            hdct.setGiaSauGiam(hdct.getGiaSauGiam().subtract(hdct.getGiaSauGiam().divide(BigDecimal.valueOf(hdct.getSoLuong()))).multiply(BigDecimal.valueOf(request.getSoLuong())));
            HoaDonChiTiet hoaDonChiTiet=new HoaDonChiTiet();
            hoaDonChiTiet.setHoaDon(hdct.getHoaDon());
            hoaDonChiTiet.setChiTietSanPham(ChiTietSanPham.builder().id(request.getIdCTSP()).build());
            hoaDonChiTiet.setSoLuong(request.getSoLuong());
            hoaDonChiTiet.setGiaSauGiam((hdct.getGiaSauGiam().divide(BigDecimal.valueOf(hdct.getSoLuong()))).multiply(BigDecimal.valueOf(request.getSoLuong())));
            hoaDonChiTiet.setTrangThai(3);
            hoaDonChiTietRepository.save(hoaDonChiTiet);
        }

        return traHangRepository.save(traHang);
    }
}
