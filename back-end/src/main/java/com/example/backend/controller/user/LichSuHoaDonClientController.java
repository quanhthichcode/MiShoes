package com.example.backend.controller.user;

import com.example.backend.service.Client.LichSuHoaDonClientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("http://localhost:3000/")
@RestController
@RequestMapping("/client/lich-su-hoa-don")
public class LichSuHoaDonClientController {
    @Autowired
    LichSuHoaDonClientService lichSuHoaDonClientService;
    @GetMapping("/{idHD}")
    public ResponseEntity<?> getLichSuHoaDon(@PathVariable("idHD") String idHD){
        return ResponseEntity.ok(lichSuHoaDonClientService.LichSuHoaDonClient(idHD));
    }
}
