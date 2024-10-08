package com.example.backend.controller.admin;

import com.example.backend.service.SanPhamClientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("http://localhost:3000/")
@RestController
@RequestMapping("/client/sanpham")
public class SanPhamClientController {
    @Autowired
    private SanPhamClientService SanPhamClientService;
    @GetMapping("/detailCTSP/{idCT}")
    public ResponseEntity<?> getDetail(@PathVariable("idCT") String id) {
        return  ResponseEntity.ok(SanPhamClientService.detailCTSPClient(id));
    }
    @GetMapping("/detailCTSPChiTiet/{idSP}/{idMS}/{idKT}")
    public ResponseEntity<?> getDetailCTSP(@PathVariable("idSP") String idSP,@PathVariable("idMS") String idMS,@PathVariable("idKT") String idKT) {
        return  ResponseEntity.ok(SanPhamClientService.detailCTSPClientByIdSPbyIdSizebyIdMs(idSP, idMS, idKT));
    }

    @GetMapping("/mau-sac-sp/{idSP}")
    public ResponseEntity<?> listMauSacBySPClient(@PathVariable("idSP") String id) {
        return  ResponseEntity.ok(SanPhamClientService.listMauSacBySPClient(id));
    }
    @GetMapping("/kich-thuoc-sp/{idSP}")
    public ResponseEntity<?> listSizeBySPClient(@PathVariable("idSP") String id) {
        return  ResponseEntity.ok(SanPhamClientService.listSizeBySPClient(id));
    }
    @GetMapping("/kich-thuoc-sp/{idSP}/{idMS}")
    public ResponseEntity<?> listSizeBySPandIDmsClient(@PathVariable("idSP") String idSP,@PathVariable("idMS") String idMS) {
        return  ResponseEntity.ok(SanPhamClientService.listSizeBySPandIDmsClient(idSP,idMS));
    }
}
