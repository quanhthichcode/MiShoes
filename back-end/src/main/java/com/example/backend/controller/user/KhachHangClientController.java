package com.example.backend.controller.user;

import com.example.backend.dto.request.DiaChiRequest;
import com.example.backend.service.KhachHangService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("http://localhost:3000/")
@RestController
@RequestMapping("/khach-hang")
@RequiredArgsConstructor
public class KhachHangClientController {
    @Autowired
    KhachHangService khachHangService;
    @GetMapping("/dia-chi/{idKH}")
    public ResponseEntity<?> getALLDCbyKH(@PathVariable("idKH") String idKH){
        return ResponseEntity.ok(khachHangService.findDiaChiByKH(idKH));
    }
    @GetMapping("/dia-chi-mac-dinh/{idKH}")
    public  ResponseEntity<?> getDiaChiMacDinh(@PathVariable("idKH") String idKH){
        return ResponseEntity.ok(khachHangService.findDiaChiMacDinh(idKH));
    }
    @PostMapping("/add-dia-chi")
    public ResponseEntity<?> addDiaChi(@RequestBody DiaChiRequest request){
        request.setTrangThai(1);
        System.out.println(request);
        return ResponseEntity.ok(khachHangService.addDiaChi(request));
    }
    @GetMapping("/detailDC/{id}")
    public ResponseEntity<?> detailDiaChi(@PathVariable("id")String id){
        return ResponseEntity.ok(khachHangService.detailDiaChi(id));
    }
    @PostMapping("/update-dia-chi/{id}")
    public ResponseEntity<?> updateDiaChi(@PathVariable("id")String id,@RequestBody DiaChiRequest request){
        return ResponseEntity.ok(khachHangService.updateDiaChi(id,request));
    }
    @PostMapping("/update-tt-dc/{id}")
    public ResponseEntity<?> updateTTDC(@PathVariable("id")String id){
        return ResponseEntity.ok(khachHangService.updateTTDiaChi(id));
    }
}
