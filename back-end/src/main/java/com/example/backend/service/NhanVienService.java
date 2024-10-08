package com.example.backend.service;

import com.example.backend.dto.impldto.NhanVienResponseImplDTO;
import com.example.backend.dto.request.NguoiDungSeacrh;
import com.example.backend.dto.request.NhanVienRequest;
import com.example.backend.dto.response.NhanVienRespon;
import com.example.backend.entity.DiaChi;
import com.example.backend.entity.NguoiDung;
import com.example.backend.model.AdminKhachHangRepon;
import com.example.backend.model.AdminNhanVienRespon;
import com.example.backend.repository.DiaChiRepository;
import com.example.backend.repository.NguoiDungRepository;
//import com.example.backend.util.EmailServiceImpl;
import com.example.backend.util.EmailServiceImpl;
import com.example.backend.util.cloudinary.UploadImageToCloudinary;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class NhanVienService {
    @Autowired
    NguoiDungRepository nguoiDungRepository;
    @Autowired
    DiaChiRepository diaChiRepository;
    @Autowired
    private EmailServiceImpl emailService;
    @Autowired
    private UploadImageToCloudinary uploadImageToCloudinary;
    @Autowired
    private PasswordEncoder passwordEncoder;
    public List<AdminNhanVienRespon> getAll() {
        return nguoiDungRepository.getAllNhanVien();
    }

    public NhanVienResponseImplDTO add(NhanVienRequest request, MultipartFile file) {
        String password = RandomStringUtils.random(8, true, true);

        int size = nguoiDungRepository.getAllNhanVien().size() + 1;
        emailService.sendEmailPasword(request.getEmail(), "Mật khẩu bạn là ", password);
        NguoiDung add = new NguoiDung();
        add.setTen(request.getTen());
        add.setMa("NV" + size);
        System.out.println("NV" + (nguoiDungRepository.getAllNhanVien().size() + 1));
        add.setEmail(request.getEmail());
        add.setGioiTinh(request.getGioiTinh());
        add.setChucVu("NHANVIEN");
        add.setDiem(0);
        add.setChungMinhThu(request.getCanCuocCongDan());
        add.setTrangThai(0);
        add.setNgaySinh(request.getNgaySinh());
        if(file==null){
            add.setAnh("https://res-console.cloudinary.com/dm0w2qws8/media_explorer_thumbnails/be19b81150473723fdb75be9bf327062/detailed");
        }else{
            String url = uploadImageToCloudinary.uploadImage(file);
            add.setAnh(url);
        }

        add.setNgayThamGia(LocalDateTime.now());
        add.setMatKhau(passwordEncoder.encode(password));
        add.setSoDienThoai(request.getSoDienThoai());
        nguoiDungRepository.save(add);

        DiaChi diaChi = new DiaChi();
        diaChi.setDiaChi(request.getDiaChi());
        diaChi.setTenThanhPho(request.getTenThanhPho());
        diaChi.setTenHuyen(request.getTenHuyen());
        diaChi.setTenXa(request.getTenXa());
        diaChi.setIdThanhPho(request.getIdThanhPho());
        diaChi.setIdHuyen(request.getIdHuyen());
        diaChi.setIdXa(request.getIdXa());
        diaChi.setTenNguoiNhan(request.getTen());
        diaChi.setSoDienThoai(request.getSoDienThoai());
        diaChi.setNguoiDung(add);
        diaChi.setTrangThai(0);
        diaChiRepository.save(diaChi);

        return new NhanVienResponseImplDTO(add, diaChi);
    }

    @Async
    @Transactional
    public NhanVienResponseImplDTO update(NhanVienRequest request, MultipartFile file) {
        Optional<NguoiDung> optional = nguoiDungRepository.findById(request.getId());
        // todo: update user

        NguoiDung update = optional.get();
        update.setTen(request.getTen());
        update.setEmail(request.getEmail());
        update.setGioiTinh(request.getGioiTinh());
        update.setChungMinhThu(request.getCanCuocCongDan());
        update.setTrangThai(0);
        update.setNgaySinh(request.getNgaySinh());
        update.setAnh(file == null ? optional.get().getAnh() : uploadImageToCloudinary.uploadImage(file));
        update.setSoDienThoai(request.getSoDienThoai());
        update.setNgaySua(LocalDateTime.now());
        nguoiDungRepository.save(update);

        DiaChi diaChi = diaChiRepository.findByUserAndStatus(update.getId());
        diaChi.setDiaChi(request.getDiaChi());
        diaChi.setTenThanhPho(request.getTenThanhPho());
        diaChi.setTenHuyen(request.getTenHuyen());
        diaChi.setTenXa(request.getTenXa());
        diaChi.setIdThanhPho(request.getIdThanhPho());
        diaChi.setIdHuyen(request.getIdHuyen());
        diaChi.setIdXa(request.getIdXa());
        diaChi.setTenNguoiNhan(request.getTen());
        diaChi.setSoDienThoai(request.getSoDienThoai());
        diaChi.setNguoiDung(update);
        diaChi.setTrangThai(0);
        diaChiRepository.save(diaChi);
        return new NhanVienResponseImplDTO(update, diaChi);
    }

    public NhanVienRespon getByID(String id) {
        NhanVienRespon optional = nguoiDungRepository.findByIdNhanVien(id);
        return optional;

    }

    public List<AdminNhanVienRespon> getSearchNhanVien(NguoiDungSeacrh nguoiDungSeacrh){
        return nguoiDungRepository.getTimNhanVien(nguoiDungSeacrh);
    }
}
