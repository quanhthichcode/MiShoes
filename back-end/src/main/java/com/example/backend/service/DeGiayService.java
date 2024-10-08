package com.example.backend.service;
import com.example.backend.dto.request.sanpham.ChatLieuRequest;
import com.example.backend.dto.request.sanpham.DeGiayRequest;
import com.example.backend.dto.request.sanphamsearch.BangConSearch;
import com.example.backend.dto.response.sanpham.ChatLieuRespone;
import com.example.backend.dto.response.sanpham.DeGiayRespone;
import com.example.backend.entity.ChatLieu;
import com.example.backend.entity.DeGiay;
import com.example.backend.repository.DeGiayRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DeGiayService {
    @Autowired
    private DeGiayRepository deGiayRepository;
    public List<DeGiay> getALL(){
        return deGiayRepository.findAll();
    }
    public List<DeGiayRespone> getALLDC(){
        return deGiayRepository.getALLDC();
    }
    public DeGiay update(String id, DeGiayRequest request) {
        DeGiay dg = request.mapDG(new DeGiay());
        dg.setId(id);
        return deGiayRepository.save(dg);
    }

    public DeGiay detailDG(String id){return deGiayRepository.findById(id).get();}

    public List<DeGiayRespone> getTim(BangConSearch bangConSearch) {
        return deGiayRepository.timDG(bangConSearch);
    }
    public String addDC(DeGiayRequest dg){
        DeGiay deGiay = DeGiay.builder()
                .ma(dg.getMa())
                .ten(dg.getTen())
                .ngayTao(dg.getNgayTao())
                .trangThai(0)
                .build();
        deGiayRepository.save(deGiay);
        return "Done";
    }
}
