package com.example.backend.service;
import com.example.backend.dto.request.sanpham.ChatLieuRequest;
import com.example.backend.dto.request.sanphamsearch.BangConSearch;
import com.example.backend.dto.response.sanpham.ChatLieuRespone;
import com.example.backend.dto.response.sanpham.DanhMucRespone;
import com.example.backend.entity.ChatLieu;
import com.example.backend.repository.ChatLieuRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ChatLieuService {
    @Autowired
    ChatLieuRepository chatLieuRepository;

    public List<ChatLieu> getALL(){return chatLieuRepository.findAll();}

    public List<ChatLieuRespone> getALLCL(){
        return chatLieuRepository.getALLCL();
    }

    public ChatLieu update(String id, ChatLieuRequest request) {
        ChatLieu cl = request.mapCL(new ChatLieu());
        cl.setId(id);
        return chatLieuRepository.save(cl);
    }

    public ChatLieu detailCL(String id){return chatLieuRepository.findById(id).get();}

    public List<ChatLieuRespone> getTim(BangConSearch bangConSearch) {
        return chatLieuRepository.timCL(bangConSearch);
    }

    public String addCL(ChatLieuRequest cl){
        ChatLieu chatLieu = ChatLieu.builder()
                .ma(cl.getMa())
                .ten(cl.getTen())
                .ngayTao(cl.getNgayTao())
                .trangThai(0)
                .build();
        chatLieuRepository.save(chatLieu);
        return "Done";
    }
}
