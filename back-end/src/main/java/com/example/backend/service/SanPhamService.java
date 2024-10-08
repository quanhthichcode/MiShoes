package com.example.backend.service;
import com.example.backend.dto.request.sanphamsearch.SanPhamSearch;
import com.example.backend.dto.response.sanpham.SanPhamRespone;
import com.example.backend.entity.SanPham;
import com.example.backend.repository.SanPhamRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SanPhamService {
    @Autowired
    SanPhamRepository sanPhamRepository;
    public List<SanPham> getALL(){
        Sort sortByNgayTao = Sort.by(Sort.Direction.DESC, "ngayTao");
        return sanPhamRepository.findAll(sortByNgayTao);
    }
    public List<SanPhamRespone> getALLSP(){
        return sanPhamRepository.getALLSP();
    }

    public List<SanPhamRespone> getTim(SanPhamSearch sanPhamSearch) {
        return sanPhamRepository.tim(sanPhamSearch);
    }

    public boolean existByID(String id){
        return sanPhamRepository.existsById(id);
    }

    public void deleteByID(String id){
         sanPhamRepository.deleteById(id);
    }

    public SanPham addSP(SanPham sp){return sanPhamRepository.save(sp);}

    public List<String>  getSPByCTSP(String id){
        return sanPhamRepository.getIDSPbyCTSP(id);
    }
}
