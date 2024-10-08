package com.example.backend.controller.admin;


import com.example.backend.service.NguoiDungService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("http://localhost:3000/")
@RestController
@RequestMapping("/admin/nguoi-dung")
public class NguoiDungController {

    @Autowired
    NguoiDungService nguoiDungService;

    @GetMapping("")
    public ResponseEntity<?> getALLNguoiDung(){
        return ResponseEntity.ok(nguoiDungService.getAll());
    }
}
