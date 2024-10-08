package com.example.backend.controller.admin;

import com.example.backend.dto.request.sanpham.AddAnhRequest;
import com.example.backend.dto.request.sanpham.HinhAnhRequest;
import com.example.backend.repository.HinhAnhRepository;
import com.example.backend.service.HinhAnhService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;

@CrossOrigin("http://localhost:3000/")
@RestController
@RequestMapping("/admin/hinhanh")
public class HinhAnhController {
    @Autowired
    HinhAnhRepository hinhAnhRepository;
    @Autowired
    HinhAnhService hinhAnhService;
    @GetMapping("/{ten}")
    public ResponseEntity<?> detail(@PathVariable("ten") String ten){
        return ResponseEntity.ok(hinhAnhRepository.findHinhAnhsByTenOrderByNgayTaoDesc(ten));
    }
    @PostMapping("/add-anh")
    public ResponseEntity<?> upAnh(@RequestBody AddAnhRequest ha){
        int maAnh = hinhAnhService.getALL().size();
        ha.setTrangThai(0);
        ha.setNgayTao(LocalDateTime.now());
        ha.setMa("HA-" + (maAnh + 1));
        hinhAnhService.addAnhMoi(ha);
        return ResponseEntity.ok("Done");
    }
}
