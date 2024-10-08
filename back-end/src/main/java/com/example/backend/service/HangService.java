package com.example.backend.service;
import com.example.backend.dto.request.sanpham.HangRequest;
import com.example.backend.dto.request.sanpham.KichThuocRequest;
import com.example.backend.dto.request.sanphamsearch.BangConSearch;
import com.example.backend.dto.response.HangRespone;
import com.example.backend.dto.response.sanpham.KichThuocRespone;
import com.example.backend.entity.Hang;
import com.example.backend.entity.KichThuoc;
import com.example.backend.repository.HangRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HangService {
    @Autowired
    HangRepository hangRepository;
    public List<Hang> getALL(){
        return hangRepository.findAll();
    }
    public List<HangRespone> getALLH(){
        return hangRepository.getALLH();
    }

    public Hang update(String id, HangRequest request) {
        Hang h = request.mapH(new Hang());
        h.setId(id);
        return hangRepository.save(h);
    }

    public Hang detailHang(String id){return hangRepository.findById(id).get();}

    public List<HangRespone> getTim(BangConSearch bangConSearch) {
        return hangRepository.timH(bangConSearch);
    }
    public String addH(HangRequest h){
        Hang hang = Hang.builder()
                .ma(h.getMa())
                .ten(h.getTen())
                .ngayTao(h.getNgayTao())
                .trangThai(0)
                .build();
        hangRepository.save(hang);
        return "Done";
    }
}
