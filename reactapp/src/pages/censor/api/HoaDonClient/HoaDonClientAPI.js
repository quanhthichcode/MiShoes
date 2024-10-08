import {
  requestClient
} from "../request";

export class HoaDonClientAPI {
  static getALLHoaDonOnlineByIdKH = (data) => {
    return requestClient({
      method: "POST",
      url: `/client-hoa-don`,
      data: data,
    });
  };

  static getALLChiTietSanPhamClientOlByIdHD = (id) => {
    return requestClient({
      method: "GET",
      url: `/client-hoa-don/hoa-don/${id}`,
      //   params: filter,
    });
  };
  static DetailHoaDonClient = (idHD) => {
    return requestClient({
      method: "GET",
      url: `/client-hoa-don/detail-hoa-don/${idHD}`,
    });
  };
  static SearchHDClient = (data) => {
    return requestClient({
      method: "POST",
      url: `/client-hoa-don/search`,
      data: data,
    });
  };
  static huyHoaDonQLHoaDon = (id, maNV, data) => {
    return requestClient({
      method: "PUT",
      url: `/client-hoa-don/xoa-hoa-don/${id}/${maNV}`,
      data: data,
      headers: {
        Authorization: this.getToken,
      },
    });
  };
  static getAllLichSuHoaDon = (id) => {
    return requestClient({
      method: "GET",
      url: `/client-hoa-don/detail-lich-su-hoa-don/${id}`,
      headers: {
        Authorization: this.getToken,
      },
    });
  };
  static detailSanPham = (id) => {
    return requestClient({
      method: "GET",
      url: `/client-hoa-don/hoa-don-san-pham/${id}`,
      headers: {
        Authorization: this.getToken,
      },
    });
  };
  static deleteInvoiceAndRollBackProduct = (idCTSP, id) => {

    return requestClient({
      method: "DELETE",
      url: `/client-hoa-don/delete-hoa-don-chi-tiet/${idCTSP}/${id}`,
      headers: {
        Authorization: this.getToken,
      },
    });
  };
}