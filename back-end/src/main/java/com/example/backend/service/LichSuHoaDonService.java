package com.example.backend.service;
import com.example.backend.dto.request.LichSuHoaDonRequest;
import com.example.backend.dto.response.AdminHoaDonTimeLineRes;
import com.example.backend.dto.response.AdminHoaDonTimeLineRespon;
import com.example.backend.entity.LichSuHoaDon;
import com.example.backend.repository.LichSuHoaDonRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class LichSuHoaDonService {
    @Autowired
    LichSuHoaDonRepository lichSuHoaDonRepository;
    public LichSuHoaDon addLichSuHoaDon(LichSuHoaDonRequest lichSuHoaDonRequest){
        LichSuHoaDon lichSuHoaDon = lichSuHoaDonRequest.map(new LichSuHoaDon());
        return lichSuHoaDonRepository.save(lichSuHoaDon);

    }
    public LichSuHoaDon save(LichSuHoaDon lichSuHoaDon){
        return lichSuHoaDonRepository.save(lichSuHoaDon);
    }
    public List<AdminHoaDonTimeLineRespon> getLichHoaDon(String idHD) {
        return lichSuHoaDonRepository.detailLichSuHoaDon(idHD);
    }
    public List<AdminHoaDonTimeLineRes> HoaDonTimeLine(String idHD){
        return lichSuHoaDonRepository.HoaDonTimeLine(idHD);
    }
}
