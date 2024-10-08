package com.example.backend.service.Client;

import com.example.backend.dto.request.HoaDonCLient.SearchHDByMaAndSdtRequest;
import com.example.backend.dto.request.HoaDonCLient.TrangThaiRequest;
import com.example.backend.dto.response.HoaDonCLient.DetailHoaDonClientByIdHDRespon;
import com.example.backend.dto.response.HoaDonCLient.HoaDonClientHistory;
import com.example.backend.entity.HoaDon;
import com.example.backend.model.AdminHoaDonSanPham;
import com.example.backend.repository.HoaDonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HoaDonClientService {
    @Autowired
    HoaDonRepository hoaDonRepository;
    public List<HoaDonClientHistory> getALLHDClientByIDKH(TrangThaiRequest req){
        return hoaDonRepository.getALLHDClientByIDKH( req);
    }
    public List<AdminHoaDonSanPham> detailHDSanPham(String key){
        return  hoaDonRepository.detailHDSanPham(key);
    }
    public DetailHoaDonClientByIdHDRespon detailHoaDonClienByIdHD(String idHD){
        return hoaDonRepository.detailHoaDonClienByIdHD(idHD);
    }
    public DetailHoaDonClientByIdHDRespon search(SearchHDByMaAndSdtRequest req){
        return hoaDonRepository.searchHDClient(req);
    }
}
