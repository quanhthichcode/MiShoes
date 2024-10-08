package com.example.backend.controller.admin;

import com.example.backend.dto.request.DiaChiRequest;
import com.example.backend.dto.request.KhachHangRequest;
import com.example.backend.dto.request.NguoiDungSeacrh;
import com.example.backend.dto.request.sanphamsearch.CTSPSearch;
import com.example.backend.dto.response.DiaChiKHResponse;
import com.example.backend.entity.DiaChi;
import com.example.backend.service.KhachHangService;
import com.google.gson.Gson;
import jakarta.websocket.server.PathParam;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@CrossOrigin("http://localhost:3000/")
@RestController
@RequestMapping("/admin/khach-hang")
@RequiredArgsConstructor
public class KhachHangController {

    @Autowired
    KhachHangService khachHangService;

    @GetMapping
    public ResponseEntity<?> getAll() {
        return ResponseEntity.ok(khachHangService.getAll());
    }

    @GetMapping("/dia-chi/{idKH}")
    public  ResponseEntity<?> getALLDCbyKH(@PathVariable("idKH") String idKH){
        return ResponseEntity.ok(khachHangService.findDiaChiByKH(idKH));
    }
    @GetMapping("/dia-chi-mac-dinh/{idKH}")
    public  ResponseEntity<?> getDiaChiMacDinh(@PathVariable("idKH") String idKH){
        return ResponseEntity.ok(khachHangService.findDiaChiMacDinh(idKH));
    }
    @PostMapping("/add-dia-chi")
    public ResponseEntity<?> addDiaChi(@RequestBody DiaChiRequest request){
        request.setTrangThai(1);
        System.out.println(request);
        return ResponseEntity.ok(khachHangService.addDiaChi(request));
    }
    @GetMapping("/detailDC/{id}")
    public ResponseEntity<?> detailDiaChi(@PathVariable("id")String id){
        return ResponseEntity.ok(khachHangService.detailDiaChi(id));
    }
    @PostMapping("/update-dia-chi/{id}")
    public ResponseEntity<?> updateDiaChi(@PathVariable("id")String id,@RequestBody DiaChiRequest request){
        return ResponseEntity.ok(khachHangService.updateDiaChi(id,request));
    }
    @PostMapping("/update-tt-dc/{id}")
    public ResponseEntity<?> updateTTDC(@PathVariable("id")String id){
        return ResponseEntity.ok(khachHangService.updateTTDiaChi(id));
    }
    @PostMapping()
    public ResponseEntity<?> add(@RequestParam("request") String request,
                                 @RequestParam(value = "file", required = false) MultipartFile file) {

        Gson gson = new Gson();
        KhachHangRequest khachHangRequest = gson.fromJson(request, KhachHangRequest.class);

        return ResponseEntity.ok(khachHangService.add(khachHangRequest, file));
    }

    @PutMapping()
    public ResponseEntity<?> update(@RequestParam("request") String request,
                                    @RequestParam(value = "file", required = false) MultipartFile file) {

        Gson gson = new Gson();
//        System.out.println(gson);
        KhachHangRequest zzzzzzzzz = gson.fromJson(request, KhachHangRequest.class);
        return ResponseEntity.ok(khachHangService.update(zzzzzzzzz, file));

    }

    @PostMapping ("/search")
    public ResponseEntity<?> search(@RequestBody NguoiDungSeacrh nguoiDungSeacrh){
        return ResponseEntity.ok(khachHangService.getSearchKhachHang(nguoiDungSeacrh));
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getById(@PathVariable("id") String id) {
//        System.out.println("ID detail" + id);
//        System.out.println("Detail" + khachHangService.getByID(id).toString());
        return ResponseEntity.ok(khachHangService.getByID(id));

    }

    @PostMapping("/update")
    public ResponseEntity<?> updateStatus(@RequestParam("id") String id,
                                          @RequestParam("status") String status) {
        Gson gson = new Gson();
        String idUser = gson.fromJson(id, String.class);
        String statusGson = gson.fromJson(status, String.class);
        return ResponseEntity.ok(khachHangService.updateStatus(idUser, statusGson));
    }

    @GetMapping("/ban-hang/dia-chi/{idKH}")
    public ResponseEntity<?> getDiaChiByIDKH(@PathVariable("idKH") String idKH){
        List<DiaChiKHResponse> list = khachHangService.getAllDiaChiByIDKH(idKH);
        return ResponseEntity.ok(khachHangService.getAllDiaChiByIDKH(idKH).get(0));
    }
}
