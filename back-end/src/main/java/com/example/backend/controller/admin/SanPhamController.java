package com.example.backend.controller.admin;


import com.example.backend.dto.request.sanphamsearch.BangConSearch;
import com.example.backend.dto.request.sanphamsearch.SanPhamSearch;
import com.example.backend.entity.SanPham;
import com.example.backend.service.SanPhamService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.UUID;

@CrossOrigin("http://localhost:3000/")
@RestController
@RequestMapping("/admin/san-pham")
@RequiredArgsConstructor
public class SanPhamController {
    @Autowired
    SanPhamService sanPhamService;
    @GetMapping
    public ResponseEntity<?> getALLSP(){
        return  ResponseEntity.ok(sanPhamService.getALLSP());
    }

    @GetMapping("/getAll")
    public ResponseEntity<?> getALL(){
        return new ResponseEntity<>(sanPhamService.getALL(), HttpStatus.OK);
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable String id) {
        if (sanPhamService.existByID(id)) {
            sanPhamService.deleteByID(id);
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/tim-kiem")
    public ResponseEntity<?> search(@RequestBody SanPhamSearch sanPhamSearch){
        System.out.println(sanPhamSearch.toString());
        return ResponseEntity.ok(sanPhamService.getTim(sanPhamSearch));
    }

    @PostMapping("/add")
    public ResponseEntity<?> add(@RequestBody SanPham v){
        int spThem = sanPhamService.getALL().size();
        v.setNgayTao(LocalDateTime.now());
        v.setMa("SP" + "-" + (spThem + 1));
        v.setTrangThai(0);
        return  ResponseEntity.ok(sanPhamService.addSP(v));

    }

    @GetMapping("/showSP/{idCTSP}")
    public ResponseEntity<?> getSPByCTSP(@PathVariable("idCTSP") String id){
        return ResponseEntity.ok(sanPhamService.getSPByCTSP(id));
    }
}
