package com.example.backend.service;
import com.example.backend.dto.request.sanpham.DanhMucRequest;
import com.example.backend.dto.request.sanphamsearch.BangConSearch;
import com.example.backend.dto.response.sanpham.DanhMucRespone;
import com.example.backend.entity.DanhMuc;
import com.example.backend.repository.DanhMucRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DanhMucService {
    @Autowired
    DanhMucRepository danhMucRepository;

    public List<DanhMuc> getALL() {
        return danhMucRepository.findAll();
    }

    public List<DanhMucRespone> getALLDM() {
        return danhMucRepository.getALLDM();
    }

    public DanhMuc update(String id, DanhMucRequest danhMucRequest) {
        DanhMuc dm = danhMucRequest.mapDM(new DanhMuc());
        dm.setId(id);
        return danhMucRepository.save(dm);
    }

    public DanhMuc detailDM(String id){return danhMucRepository.findById(id).get();}

    public List<DanhMucRespone> getTim(BangConSearch bangConSearch) {
        return danhMucRepository.tim(bangConSearch);
    }

    public String addDM(DanhMucRequest dm) {
        DanhMuc danhMuc = DanhMuc.builder()
                .ma(dm.getMa())
                .ten(dm.getTen())
                .ngayTao(dm.getNgayTao())
                .trangThai(0)
                .build();
        danhMucRepository.save(danhMuc);
        return "Done";
    }
}
