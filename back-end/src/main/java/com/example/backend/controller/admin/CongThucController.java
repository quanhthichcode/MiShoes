package com.example.backend.controller.admin;

import com.example.backend.dto.request.CongThucRequest;
import com.example.backend.service.CongThucService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("http://localhost:3000/")
@RestController
@RequestMapping("/admin/cong-thuc")
@RequiredArgsConstructor
public class CongThucController {
    @Autowired
    CongThucService congThucService;
    @PostMapping()
    public ResponseEntity<?> addCT(@RequestBody CongThucRequest request){
        return ResponseEntity.ok(congThucService.addCT(request));
    }
}
