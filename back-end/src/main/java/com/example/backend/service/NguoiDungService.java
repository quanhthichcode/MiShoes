package com.example.backend.service;

import com.example.backend.dto.impldto.NhanVienResponseImplDTO;

import com.example.backend.dto.login.TokenService;
import com.example.backend.dto.response.KhachHangRespon;
import com.example.backend.entity.NguoiDung;
import com.example.backend.model.AdminKhachHangRepon;
import com.example.backend.repository.NguoiDungRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NguoiDungService {
    @Autowired
    NguoiDungRepository nguoiDungRepository;

    @Autowired
    TokenService tokenService;
    public List<AdminKhachHangRepon> getKhach() {return nguoiDungRepository.getAllKhachHang();}
    public NguoiDung findByToken(String token) {
        if (tokenService.getUserNameByToken(token) == null) {
            return null;
        }
        String userName = tokenService.getUserNameByToken(token);
        NguoiDung nguoiDung = nguoiDungRepository.findByEmail(userName).orElse(null);
        return nguoiDung;
    }

    public NguoiDung findByID(String id) {
        return nguoiDungRepository.getNDByID(id);
    }
//    public List<NguoiDung> getAll(){
//        return nguoiDungRepository.findAll();
//    }
////    public NguoiDung add(NhanVienResponseImplDTO request){
////        NguoiDung nd=request.map(new NguoiDung());
////        return nguoiDungRepository.save(nd);
////    }

    public List<NguoiDung> getAll(){
        return nguoiDungRepository.findAll();
    }


}
