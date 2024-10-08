package com.example.backend.service;

import com.example.backend.dto.response.sanpham.ChiTietSanPhamRespone;
import com.example.backend.entity.KhuyenMaiSanPham;
import com.example.backend.repository.CTSPRepository;
import com.example.backend.repository.KhuyenMaiRepository;
import com.example.backend.repository.KhuyenMaiSanPhamRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class KhuyenMaiSanPhamService {
    @Autowired
    KhuyenMaiSanPhamRepository khuyenMaiSanPhamRepository;
    @Autowired
    KhuyenMaiRepository khuyenMaiRepository;
    @Autowired
    CTSPRepository chiTietSanPhamRespone;

    public List<String> getAllPromotionsByProduct (String id){
        return  khuyenMaiSanPhamRepository.getAllProductByPromotion(id);
    }
    public KhuyenMaiSanPham add(KhuyenMaiSanPham kmsp){
        return khuyenMaiSanPhamRepository.save(kmsp);
    }

    public KhuyenMaiSanPham updateTrangThai(String idKM,String idCTSP,int trangThai){
        KhuyenMaiSanPham kmsp = khuyenMaiSanPhamRepository.findKhuyenMaiSanPham(idKM,idCTSP);
        kmsp.setTrangThai(trangThai);
        return khuyenMaiSanPhamRepository.save(kmsp);
    }

    public List<KhuyenMaiSanPham> getAll(){
        return khuyenMaiSanPhamRepository.getAll();
    }

    public KhuyenMaiSanPham find(String idKM, String idCTSP){
        return  khuyenMaiSanPhamRepository.findKhuyenMaiSanPham(idKM,idCTSP);
    }
}
