package com.example.backend.controller.user;

import com.example.backend.service.ThongBaoService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("http://localhost:3000/")
@RestController
@RequestMapping("/KH/thong-bao")
@RequiredArgsConstructor
public class KHThongBaoController {

    @Autowired
    private ThongBaoService thongBaoService;


    @GetMapping("/getAll")
    public ResponseEntity<?> getAll(@RequestParam String token){
        return ResponseEntity.ok(thongBaoService.getAllKH(token));
    }

    @GetMapping("/count")
    public ResponseEntity<?> count(@RequestParam String token){
        return ResponseEntity.ok(thongBaoService.countKH(token));
    }
}
