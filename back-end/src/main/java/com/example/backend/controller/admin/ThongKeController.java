package com.example.backend.controller.admin;


import com.example.backend.service.ThongKeService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.Date;
import java.text.ParseException;
import java.text.SimpleDateFormat;


@CrossOrigin("http://localhost:3000/")
@RestController
@RequestMapping("/admin/thong-ke")
@RequiredArgsConstructor
public class ThongKeController {
    @Autowired
    ThongKeService thongKeService;
    @GetMapping("/ngay")
    public ResponseEntity<?> thongKeTheoNgay(){

        return ResponseEntity.ok(thongKeService.thongKeTheoNgay());
    }
    @GetMapping("/thang")
    public ResponseEntity<?> thongKeTheoThang(){
        return ResponseEntity.ok(thongKeService.thongKeTheoThang());
    }
    @GetMapping("/nam")
    public ResponseEntity<?> thongKeTheoNam(){
        return ResponseEntity.ok(thongKeService.thongKeTheoNam());
    }
    @GetMapping("/doanh-thu-ngay-truoc")
    public ResponseEntity<?> doanhThuNgayTruoc(){
        return ResponseEntity.ok(thongKeService.getDoanhThuNgayTruoc());
    }
    @GetMapping("/doanh-thu-thang-truoc")
    public ResponseEntity<?> doanhThuThangTruoc(){
        return ResponseEntity.ok(thongKeService.getDoanhThuThangTruoc());
    }
    @GetMapping("/doanh-thu-nam-truoc")
    public ResponseEntity<?> doanhThuNamTruoc(){
        return ResponseEntity.ok(thongKeService.getDoanhThuNamTruoc());
    }

    @GetMapping("/san-pham-ban-chay-ngay")
    public ResponseEntity<?> getSPBanChayNgay(){
        return ResponseEntity.ok(thongKeService.getSpBanChayNgay());
    }
    @GetMapping("/san-pham-ban-chay-thang")
    public ResponseEntity<?> getSPBanChayThang(){
        return ResponseEntity.ok(thongKeService.getSpBanChayThang());
    }
    @GetMapping("/san-pham-ban-chay-nam")
    public ResponseEntity<?> getSPBanChayNam(){
        return ResponseEntity.ok(thongKeService.getSpBanChayNam());
    }
    @GetMapping("/san-pham-ban-chay-tuan")
    public ResponseEntity<?> getSPBanChayTuan(){
        return ResponseEntity.ok(thongKeService.getSpBanChayTuan());
    }
    @GetMapping("/bieu-do-ngay")
    public ResponseEntity<?> getBieuDoNgay() throws ParseException {
        return ResponseEntity.ok(thongKeService.getBieuDoNgay());
    }
    @GetMapping("/bieu-do-tuan")
    public ResponseEntity<?> getBieuDoTuan() throws ParseException {

        return ResponseEntity.ok(thongKeService.getBieuDoTuan());
    }
    @GetMapping("/bieu-do-thang")
    public ResponseEntity<?> getBieuDoThang() throws ParseException {
        return ResponseEntity.ok(thongKeService.getBieuDoThang());
    }
    @GetMapping("/bieu-do-nam")
    public ResponseEntity<?> getBieuDoNam() throws ParseException {
        return ResponseEntity.ok(thongKeService.getBieuDoNam());
    }
    @GetMapping("/trang-thai-hoa-don-ngay")
    public ResponseEntity<?> getTrangThaiHDNgay(){
        return ResponseEntity.ok(thongKeService.getTrangThaiHoaDonNgay());
    }
    @GetMapping("/trang-thai-hoa-don-thang")
    public ResponseEntity<?> getTrangThaiHDThang(){
        return ResponseEntity.ok(thongKeService.getTrangThaiHoaDonThang());
    }
    @GetMapping("/trang-thai-hoa-don-nam")
    public ResponseEntity<?> getTrangThaiHDNam(){
        return ResponseEntity.ok(thongKeService.getTrangThaiHoaDonNam());
    }
    @GetMapping("/trang-thai-hoa-don-tuan")
    public ResponseEntity<?> getTrangThaiHDTuan(){
        return ResponseEntity.ok(thongKeService.getTrangThaiHoaDonTuan());
    }
    @GetMapping("/san-pham-ban-ngay")
    public ResponseEntity<?> getSPBanNgay(){
        return ResponseEntity.ok(thongKeService.getSPBanNgay());
    }
    @GetMapping("/san-pham-ban-ngay-truoc")
    public ResponseEntity<?> getSPBanNgayTruoc(){
        return ResponseEntity.ok(thongKeService.getSPBanNgayTruoc());
    }
    @GetMapping("/san-pham-sap-het")
    public ResponseEntity<?> getSPSapHet(){
        return ResponseEntity.ok(thongKeService.getSpBanSapHet());
    }
}
