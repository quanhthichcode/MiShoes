package com.example.backend.service;


import com.example.backend.dto.response.SanPhamClient.DetailCTSPClientRespon;
import com.example.backend.dto.response.SanPhamClient.ListMauSacBySPClientRespon;
import com.example.backend.dto.response.SanPhamClient.ListSizeBySPClientRespon;
import com.example.backend.repository.CTSPRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SanPhamClientService {
    @Autowired
    CTSPRepository ctspRepository;
    public DetailCTSPClientRespon detailCTSPClient(String id){return ctspRepository.detailCTSPClient(id);}

    public  DetailCTSPClientRespon detailCTSPClientByIdSPbyIdSizebyIdMs(String idSP,String idMS,String idKT){
        return ctspRepository.detailCTSPClientByIdSPbyIdSizebyIdMs(idSP,idMS,idKT);
    }

    public List<ListMauSacBySPClientRespon> listMauSacBySPClient(String id){return ctspRepository.listMauSacBySPClient(id);}


    public List<ListSizeBySPClientRespon> listSizeBySPClient(String id){return ctspRepository.listSizeBySPClient(id);}
    public  List<ListSizeBySPClientRespon> listSizeBySPandIDmsClient(String idSP,String idMS){
        return ctspRepository.listSizeBySPandIDmsClient(idSP, idMS);
    }


}
