package com.example.backend.controller.admin;

import com.example.backend.dto.request.KhachHangVoucherSearch;
import com.example.backend.dto.request.NguoiDungSeacrh;
import com.example.backend.dto.request.NguoiDungVoucherRequest;
import com.example.backend.entity.NguoiDungVoucher;
import com.example.backend.entity.Voucher;
import com.example.backend.service.NguoiDungVoucherService;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("http://localhost:3000/")
@RestController
@RequestMapping("/admin/nguoi-dung-voucher")
@RequiredArgsConstructor
public class NguoiDungVoucherController {
    @Autowired
    NguoiDungVoucherService nguoiDungVoucherService;
    @GetMapping("/voucher/{id}")
    public ResponseEntity<?> getByVoucher(@PathVariable("id")String id){
        System.out.println("ID"+id);
       // System.out.println("SEND"+nguoiDungVoucherService.getALL());
        return ResponseEntity.ok(nguoiDungVoucherService.getAllByVoucher(id));
       // return null;
    }
    @GetMapping("/ngv/{id}")
    public ResponseEntity<?> getNGV(@PathVariable("id") String id){
        return ResponseEntity.ok(nguoiDungVoucherService.getNguoiDungByVoucher(id));
    }
    @GetMapping("/nguoi-dung/{id}")
    public ResponseEntity<?> getByNguoiDung(@PathVariable("id")String id){
        return ResponseEntity.ok(nguoiDungVoucherService.getAllByNguoiDung(id));
    }
    @PostMapping("/add/{id}")
    public ResponseEntity<?> add(@PathVariable("id")String id,@RequestBody Voucher request){
        System.out.println("Voucher"+request.toString());
        System.out.println("IDKH"+id);
        return ResponseEntity.ok(nguoiDungVoucherService.add(id,request));
    }
    @DeleteMapping("/delete-ndv/{idND}/{idV}")
    public ResponseEntity<?> delete(@PathVariable("idND")String idND,@PathVariable("idV") String idV){
        return ResponseEntity.ok(nguoiDungVoucherService.delete(idND,idV));
    }

    @PutMapping("/update/sap-bat-dau/{idV}/{idKH}")
    public ResponseEntity<?> updateSapBatDau(@PathVariable("idV") String idV,@PathVariable("idKH")String idKH){
        return ResponseEntity.ok(nguoiDungVoucherService.updateTrangThai_ChuaBatDau(idKH , idV));
    }

    @PutMapping("/update/dang-dien-ra/{idV}/{idKH}")
    public ResponseEntity<?> updateDangDienRa(@PathVariable("idV") String idV,@PathVariable("idKH")String idKH) {
        return ResponseEntity.ok(nguoiDungVoucherService.updateTrangThai_DangDienRa(idKH, idV));
    }


    @PutMapping("/update/da-ket-thuc/{idV}/{idKH}")
    public ResponseEntity<?> updateDaKetThuc(@PathVariable("idV") String idV,@PathVariable("idKH")String idKH) {
        return ResponseEntity.ok(nguoiDungVoucherService.updateTrangThai_DaKetThuc(idKH, idV));
    }

    @PostMapping("/searchKhachHang")
    public ResponseEntity<?> getSearchKhachHang(@RequestBody KhachHangVoucherSearch nguoiDungSeacrh) {
        return ResponseEntity.ok(nguoiDungVoucherService.getSearchKhachHang(nguoiDungSeacrh));
    }
}
