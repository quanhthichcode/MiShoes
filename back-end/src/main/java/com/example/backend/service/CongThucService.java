package com.example.backend.service;

import com.example.backend.dto.request.CongThucRequest;
import com.example.backend.entity.CongThuc;
import com.example.backend.repository.CongThucRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CongThucService {
    @Autowired
    CongThucRepository congThucRepository;

    public CongThuc addCT(CongThucRequest request){
        CongThuc ct=request.map(new CongThuc());
        ct.setTrangThai(0);
        List<CongThuc> list=congThucRepository.findAll();
        list.stream().forEach(o->{
            o.setTrangThai(1);
        congThucRepository.save(o);
        });
        return congThucRepository.save(ct);
    }
}
