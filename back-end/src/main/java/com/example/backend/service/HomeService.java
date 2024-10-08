package com.example.backend.service;

import com.example.backend.dto.request.sanphamsearch.TimSanPhamTheoMang;
import com.example.backend.dto.response.sanpham.HomeRespone;
import com.example.backend.repository.HomeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HomeService {
    @Autowired
    HomeRepository homeRepository;

    public List<HomeRespone> getAllSanPham() {
        return homeRepository.getALLSanPham();
    }

    public List<HomeRespone> getNewSanPham() {
        return homeRepository.getALLSanPhamNew();
    }

    public List<HomeRespone> getHotSale() {
        return homeRepository.getHotSale();
    }

    public List<HomeRespone> getSearchListSanPham(TimSanPhamTheoMang sp) {

        if(sp.getArraySanPham().length>0 && sp.getArrayMauSac().length<=0 && sp.getArrayKichThuoc().length<=0){
            return homeRepository.getLocSanPham(sp);
        }
        if(sp.getArraySanPham().length>0 && sp.getArrayMauSac().length>0 && sp.getArrayKichThuoc().length<=0){
            return homeRepository.getLocSanPhamMauSac(sp);
        }
        if(sp.getArraySanPham().length>0 && sp.getArrayMauSac().length<=0 && sp.getArrayKichThuoc().length>0){
            System.out.println(sp);
            return homeRepository.getLocSanPhamKichThuoc(sp);
        }
        if(sp.getArraySanPham().length<=0 && sp.getArrayMauSac().length>0 && sp.getArrayKichThuoc().length<=0){
            return homeRepository.getLocMauSac(sp);
        }
        if(sp.getArraySanPham().length<=0 && sp.getArrayMauSac().length>0 && sp.getArrayKichThuoc().length>0){
            return homeRepository.getLocMauSacKichthuoc(sp);
        }
        if(sp.getArraySanPham().length<=0 && sp.getArrayMauSac().length<=0 && sp.getArrayKichThuoc().length>0){
            return homeRepository.getLocKichThuoc(sp);
        }
        return homeRepository.getLocSanPhamNoData(sp);
    }
}
