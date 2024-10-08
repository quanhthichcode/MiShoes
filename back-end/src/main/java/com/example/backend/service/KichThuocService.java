package com.example.backend.service;
import com.example.backend.dto.request.sanpham.DeGiayRequest;
import com.example.backend.dto.request.sanpham.KichThuocRequest;
import com.example.backend.dto.request.sanphamsearch.BangConSearch;
import com.example.backend.dto.response.sanpham.DeGiayRespone;
import com.example.backend.dto.response.sanpham.KichThuocRespone;
import com.example.backend.entity.DeGiay;
import com.example.backend.entity.KichThuoc;
import com.example.backend.repository.KichThuocRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class KichThuocService {
    @Autowired
    KichThuocRepository kichThuocRepository;
    public List<KichThuoc> getALL(){
        return kichThuocRepository.findAll();
    }
    public List<KichThuocRespone> getALLKT(){
        return kichThuocRepository.getALLKT();
    }
    public KichThuoc update(String id, KichThuocRequest request) {
        KichThuoc kt = request.mapKT(new KichThuoc());
        kt.setId(id);
        return kichThuocRepository.save(kt);
    }

    public KichThuoc detailKichThuoc(String id){return kichThuocRepository.findById(id).get();}

    public List<KichThuocRespone> getTim(BangConSearch bangConSearch) {
        return kichThuocRepository.timKT(bangConSearch);
    }
    public String addKT(KichThuocRequest kt){
        KichThuoc kichThuoc = KichThuoc.builder()
                .ma(kt.getMa())
                .ten(kt.getTen())
                .ngayTao(kt.getNgayTao())
                .trangThai(0)
                .build();
        kichThuocRepository.save(kichThuoc);
        return "Done";
    }
}
