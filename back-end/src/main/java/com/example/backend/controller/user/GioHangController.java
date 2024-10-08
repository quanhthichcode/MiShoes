package com.example.backend.controller.user;

import com.example.backend.dto.request.GioHangRequest;
import com.example.backend.service.GioHangService;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("http://localhost:3000/")
@RestController
@RequestMapping("/gio-hang")
@RequiredArgsConstructor
public class GioHangController {
    @Autowired
    GioHangService gioHangService;
    @GetMapping("/detailGH/{idKH}")
    public ResponseEntity<?> detailGH(@PathVariable("idKH")String idKH){
        return ResponseEntity.ok(gioHangService.detailGioHang(idKH));
    }
    @GetMapping("/detailGHByID/{id}")
    public ResponseEntity<?> detailGHByID(@PathVariable("id")String id){
        return ResponseEntity.ok(gioHangService.detailGHByID(id));
    }
    @PostMapping("/addGH")
    public ResponseEntity<?> addGH(@RequestBody GioHangRequest request){
        return ResponseEntity.ok(gioHangService.addGioHang(request));
    }
}
