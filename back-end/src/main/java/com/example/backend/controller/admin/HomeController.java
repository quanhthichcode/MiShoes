package com.example.backend.controller.admin;

import com.example.backend.dto.request.sanphamsearch.TimSanPhamTheoMang;
import com.example.backend.service.HomeService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("http://localhost:3000/")
@RestController
@RequestMapping("/home")
@RequiredArgsConstructor
public class HomeController {
    @Autowired
    HomeService homeService;

    @GetMapping()
    public ResponseEntity<?> getALL() {
        return ResponseEntity.ok(homeService.getAllSanPham());
    }

    @GetMapping("/new")
    public ResponseEntity<?> getALLNew() {
        return ResponseEntity.ok(homeService.getNewSanPham());
    }

    @GetMapping("/hot")
    public ResponseEntity<?> getHotSale() {
        return ResponseEntity.ok(homeService.getHotSale());
    }

    @PostMapping("/searchMang")
    public ResponseEntity<?> getLocSanPham(@RequestBody TimSanPhamTheoMang request) {
        return ResponseEntity.ok(homeService.getSearchListSanPham(request));
    }
}
