package com.example.backend.controller.admin;

import com.example.backend.dto.request.TraHangRequest;
import com.example.backend.service.TraHangService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("http://localhost:3000/")
@RestController
@RequestMapping("/admin/tra-hang")
@RequiredArgsConstructor
public class TraHangController {
    @Autowired
    TraHangService traHangService;

    @GetMapping("/hoa-don/{ma}")
    public ResponseEntity<?> getThongTinHoaDon(@PathVariable("ma") String ma){
        return ResponseEntity.ok(traHangService.getHoaDonByMa(ma));
    }

    @GetMapping("/hoa-don-chi-tiet/{ma}")
    public ResponseEntity<?> getHoaDon(@PathVariable("ma")String ma){
        return ResponseEntity.ok(traHangService.getAllHDCTByHoaDon(ma));
    }
    @PostMapping("/add-tra-hang")
    public ResponseEntity<?> addTraHang(@RequestBody TraHangRequest request){
        return ResponseEntity.ok(traHangService.addTraHang(request));
    }

}
