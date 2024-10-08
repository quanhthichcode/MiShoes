package com.example.backend.controller.admin;

import com.example.backend.dto.request.ThanhToanRequest;
import com.example.backend.entity.HoaDon;
import com.example.backend.entity.NguoiDung;
import com.example.backend.entity.ThanhToan;
import com.example.backend.repository.HoaDonRepository;
import com.example.backend.service.HoaDonServicee;
import com.example.backend.service.KhachHangService;
import com.example.backend.service.NguoiDungService;
import com.example.backend.service.ThanhToanService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@CrossOrigin("http://localhost:3000/")
@RestController
@RequestMapping("/admin/thanh-toan")
@RequiredArgsConstructor
public class ThanhToanController {
    @Autowired
    ThanhToanService thanhToanService;
    @Autowired
    HoaDonRepository hoaDonService;
    @Autowired
    KhachHangService khachHangService;
    @Autowired
    NguoiDungService nguoiDungService;
    @PostMapping("/thanh-toan-tien-mat")
    public ResponseEntity<?> thanhToan(@RequestBody ThanhToanRequest request){
        System.out.println(request);
        HoaDon hd = hoaDonService.getHDByMa(request.getHoaDon());
        request.setHoaDon(hd.getId());
        NguoiDung nguoiDung = nguoiDungService.findByID(request.getNguoiTao());
        request.setNguoiTao(nguoiDung.getMa());
        request.setNgayTao(LocalDateTime.now());
        request.setPhuongThuc(0);
        request.setTrangThai(0);
        return ResponseEntity.ok(thanhToanService.thanhToanAdmin(request));
    }

    @PostMapping("/thanh-toan-chuyen-khoan")
    public ResponseEntity<?> thanhToanCK(@RequestBody ThanhToanRequest request){
        System.out.println("Người tạo: "+request.getNguoiTao());
        NguoiDung nguoiDung = nguoiDungService.findByID(request.getNguoiTao());
        HoaDon hd = hoaDonService.getHDByMa(request.getHoaDon());
        request.setHoaDon(hd.getId());
        request.setNguoiTao(nguoiDung.getMa());
        request.setNgayTao(LocalDateTime.now());
        request.setPhuongThuc(1);
        request.setTrangThai(0);
        return ResponseEntity.ok(thanhToanService.thanhToanAdmin(request));
    }


    @GetMapping("/{idHD}")
    public  ResponseEntity<?> getALlLichSuThanhToan(@PathVariable String idHD){
        return ResponseEntity.ok(thanhToanService.getALLLLichSuThanhToanByIDHD(idHD));
    }

    @GetMapping("/hoa-don/{maHD}")
    public ResponseEntity<?> getTTByMa (@PathVariable("maHD") String maHD){
        HoaDon hd = hoaDonService.getHDByMa(maHD);
        if (hd == null) return null;
        return ResponseEntity.ok(thanhToanService.getThanhToanByIdHD(hd.getId()));
    }

    @DeleteMapping("/hoa-don/xoa/{maHD}/{phuongThuc}")
    public void xoaTT (@PathVariable("maHD") String maHD,@PathVariable("phuongThuc") int phuongThuc){
       thanhToanService.xoaThanhToanAdmin(maHD,phuongThuc);
    }
}
