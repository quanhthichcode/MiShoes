package com.example.backend.service;

import com.example.backend.dto.impldto.KhachHangResponImplDTO;
import com.example.backend.dto.request.DiaChiRequest;
import com.example.backend.dto.request.KhachHangRequest;
import com.example.backend.dto.request.NguoiDungSeacrh;
import com.example.backend.dto.request.loginReqest.ForgotPassRequest;
import com.example.backend.dto.request.loginReqest.SignUpRequest;
import com.example.backend.dto.request.sanphamsearch.CTSPSearch;
import com.example.backend.dto.response.DiaChiKHResponse;
import com.example.backend.dto.response.DiaChiKhachHangRespon;
import com.example.backend.dto.response.KhachHangRespon;
import com.example.backend.dto.response.sanpham.CTSPSearchRespone;
import com.example.backend.entity.DiaChi;
import com.example.backend.entity.NguoiDung;
import com.example.backend.model.AdminKhachHangRepon;
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
import java.util.UUID;

@Service
public class KhachHangService {
    @Autowired
    NguoiDungRepository nguoiDungRepository;
    @Autowired
    DiaChiRepository diaChiRepository;
    @Autowired
    private EmailServiceImpl emailService;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private UploadImageToCloudinary uploadImageToCloudinary;


    public List<AdminKhachHangRepon> getAll(){
        return  nguoiDungRepository.getAllKhachHang();
    }


   public KhachHangResponImplDTO add(KhachHangRequest request, MultipartFile file){
       String password = RandomStringUtils.random(8, true, true);

       int size=nguoiDungRepository.getAllKhachHang().size()+1;
       emailService.sendEmailPasword(request.getEmail(),"Mật khẩu bạn là ",password);
       NguoiDung add= new NguoiDung();
       add.setTen(request.getTen());
       add.setMa("KH"+size);
       add.setEmail(request.getEmail());
       add.setGioiTinh(request.getGioiTinh());
       add.setChucVu("KHACHHANG");
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

       add.setMatKhau(passwordEncoder.encode(password));
       add.setNgayTao(LocalDateTime.now());
       add.setNgayThamGia(LocalDateTime.now());
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
       return new KhachHangResponImplDTO(add,diaChi);
   }

    @Async
    @Transactional
    public KhachHangResponImplDTO update(KhachHangRequest request, MultipartFile file){
        Optional<NguoiDung> optional = nguoiDungRepository.findById(request.getId());
        // todo: update user
        System.out.println("aaaaaaaaaaaaaaaaaaaaaa"+optional.get());
        NguoiDung update =optional.get();
        update.setTen(request.getTen());
        update.setEmail(request.getEmail());
        update.setGioiTinh(request.getGioiTinh());
        update.setChungMinhThu(request.getCanCuocCongDan());
        update.setTrangThai(0);
        update.setNgaySinh(request.getNgaySinh());
        update.setAnh(file==null?optional.get().getAnh(): uploadImageToCloudinary.uploadImage(file));
        update.setSoDienThoai(request.getSoDienThoai());
        update.setNgaySua(LocalDateTime.now());
        nguoiDungRepository.save(update);

        DiaChi diaChi= diaChiRepository.findByUserAndStatus(update.getId());
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
        return  new KhachHangResponImplDTO(update,diaChi);
    }
    public KhachHangRespon getByID(String id){
        KhachHangRespon optional = nguoiDungRepository.findByIdCustomer(id);
        return optional;

    }

    public List<AdminKhachHangRepon> getSearchKhachHang(NguoiDungSeacrh nguoiDungSeacrh){
        return nguoiDungRepository.getTimKhachHang(nguoiDungSeacrh);
    }

    public  KhachHangResponImplDTO updateStatus(String id,String status){
        Optional<NguoiDung> optional =nguoiDungRepository.findById(id);
        optional.get().setTrangThai(1);
        nguoiDungRepository.save(optional.get());
        return  new KhachHangResponImplDTO(optional.get());
    }
   public List<DiaChiKhachHangRespon> findDiaChiByKH(String idKH){
        return diaChiRepository.findDiaChiByKH(idKH);
    }
    public DiaChiKhachHangRespon findDiaChiMacDinh(String idKH){
        return diaChiRepository.findDiaChiMacDinh(idKH);
    }
    public DiaChi addDiaChi(DiaChiRequest diaChiRequest){
        DiaChi diaChi=diaChiRequest.map(new DiaChi());

        System.out.println("Địa chỉ"+diaChi);
        return diaChiRepository.save(diaChi);
    }
    public DiaChi detailDiaChi(String id){
        return diaChiRepository.findById(id).get();
    }

    public List<DiaChiKHResponse> getAllDiaChiByIDKH(String idKH){
        return diaChiRepository.getAllDiachiByIDKH(idKH);
    }
    public DiaChi updateDiaChi(String id,DiaChiRequest diaChiRequest){
        DiaChi diaChi=diaChiRequest.map(new DiaChi());
        diaChi.setId(id);

        return diaChiRepository.save(diaChi);
    }
    public DiaChi updateTTDiaChi(String id){
        diaChiRepository.findAll().stream().forEach(o-> {
            if(o.getNguoiDung().getId().equals(diaChiRepository.findById(id).get().getNguoiDung().getId())) {
                o.setTrangThai(1);
                diaChiRepository.save(o);
            }
        });
        DiaChi diaChi=diaChiRepository.findById(id).get();
        diaChi.setTrangThai(0);
        return diaChiRepository.save(diaChi);
    }
    public NguoiDung signUp(SignUpRequest signUpRequest) {

        emailService.sendEmailPasword(signUpRequest.getEmail(), "Bạn đã đăng ký thành công tài khoản ở cửa hàng MiShoes" +
                "Mật khẩu bạn là ", signUpRequest.getMatKhau());
        int size = nguoiDungRepository.getAllKhachHang().size() + 1;
        NguoiDung nguoiDung = new NguoiDung();
        nguoiDung.setMa("KH" + size);
        nguoiDung.setTen(signUpRequest.getTen());
        nguoiDung.setEmail(signUpRequest.getEmail());
        nguoiDung.setMatKhau(passwordEncoder.encode(signUpRequest.getMatKhau()));
        nguoiDung.setChucVu("KHACHHANG");
        nguoiDung.setDiem(0);
        nguoiDung.setNgayTao(LocalDateTime.now());
        nguoiDung.setNgayThamGia(LocalDateTime.now());
        nguoiDung.setTrangThai(0);
        return nguoiDungRepository.save(nguoiDung);
    }
    public NguoiDung forgotPass(ForgotPassRequest forgotPassRequest) {
        String password = RandomStringUtils.random(8, true, true);
        emailService.sendEmailPasword(forgotPassRequest.getEmail(),"Bạn thay đổi mật khẩu thành công," +
                "Mật khẩu mới của bạn là:",password);
        NguoiDung nguoiDung = nguoiDungRepository.findNguoiDungByEmail(forgotPassRequest.getEmail());
        nguoiDung.setMatKhau(passwordEncoder.encode(password));
        return nguoiDungRepository.save(nguoiDung);
    }
}
