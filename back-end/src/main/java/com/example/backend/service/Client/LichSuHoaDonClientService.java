package com.example.backend.service.Client;


import com.example.backend.dto.response.AdminHoaDonTimeLineRespon;
import com.example.backend.repository.LichSuHoaDonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LichSuHoaDonClientService {
    @Autowired
    LichSuHoaDonRepository lichSuHoaDonRepository;

   public List<AdminHoaDonTimeLineRespon> LichSuHoaDonClient(String  idHD){
        return lichSuHoaDonRepository.detailLichSuHoaDon(idHD);
    }
}
