package com.example.backend.dto.request.sanphamsearch;


import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class CTSPSearch {
    String tenCT;
    String idKT;
    String idMS;
    String idDM;
    String idDC;
    String idCL;
    String idH;
    int trangThaiCT;
    int soLuongCT;
    int giaBanCT;
}
