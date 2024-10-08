import { getHeader, requestAdmin } from "../request";

export class HoaDonAPI {
  static getToken = getHeader();
  static getAll = () => {
    return requestAdmin({
      method: "GET",
      url: `admin/hoa-don`,
      headers: {
        Authorization: this.getToken,
      },
      //   params: filter,
    });
  };

  static getAllbyTT = (trangThai) => {
    return requestAdmin({
      method: "GET",
      url: `admin/hoa-don/${trangThai}`,
      headers: {
        Authorization: this.getToken,
      },
      //   params: filter,
    });
  };

  static detailHD = (id) => {
    return requestAdmin({
      method: "GET",
      url: `/admin/hoa-don/detail-hoa-don/${id}`,
      headers: {
        Authorization: this.getToken,
      },
    });
  };
  static detailUpdateHoaDon = (id) => {
    return requestAdmin({
      method: "GET",
      url: `/admin/hoa-don/detail-update-dia-chi-hoa-don/${id}`,
      headers: {
        Authorization: this.getToken,
      },
    });
  };
  static chiTietHoaDonTheoMa = (ma) => {
    return requestAdmin({
      method: "GET",
      url: `/admin/hoa-don/detail-hoa-don-theo-ma/${ma}`,
      headers: {
        Authorization: this.getToken,
      },
    });
  };
  static detailSanPham = (id) => {
    return requestAdmin({
      method: "GET",
      url: `/admin/hoa-don/hoa-don-san-pham/${id}`,
      headers: {
        Authorization: this.getToken,
      },
    });
  };

  static hoaDonSanPhamTheoMa = (ma) => {
    return requestAdmin({
      method: "GET",
      url: `/admin/hoa-don/san-pham-theo-ma/${ma}`,
      headers: {
        Authorization: this.getToken,
      },
    });
  };

  static detailSanPhamTra = (id) => {
    return requestAdmin({
      method: "GET",
      url: `/admin/hoa-don/hoa-don-san-pham-tra/${id}`,
      headers: {
        Authorization: this.getToken,
      },
    });
  };
  static getAllLichSuHoaDon = (id) => {
    return requestAdmin({
      method: "GET",
      url: `/admin/hoa-don/detail-lich-su-hoa-don/${id}`,
      headers: {
        Authorization: this.getToken,
      },
    });
  };
  static getAllTimeLine = (id) => {
    return requestAdmin({
      method: "GET",
      url: `/admin/hoa-don/ngay-hoa-don-time-line/${id}`,
      headers: {
        Authorization: this.getToken,
      },
    });
  };
  static updateTTHoaDon = (id, maNV, data) => {
    return requestAdmin({
      method: "PUT",
      url: `/admin/hoa-don/update-hoa-don/${id}/${maNV}`,
      data: data,
      headers: {
        Authorization: this.getToken,
      },
    });
  };
  static rollbackHoaDon = (id, maNV, data) => {
    return requestAdmin({
      method: "PUT",
      url: `/admin/hoa-don/back-hoa-don/${id}/${maNV}`,
      data: data,
      headers: {
        Authorization: this.getToken,
      },
    });
  };
  static search = (data) => {
    return requestAdmin({
      method: "POST",
      url: `/admin/hoa-don/search`,
      data: data,
      headers: {
        Authorization: this.getToken,
      },
    });
  };
  static huyHoaDon = (id) => {
    return requestAdmin({
      method: "PUT",
      url: `/admin/hoa-don/huy-hoa-don/${id}`,
      headers: {
        Authorization: this.getToken,
      },
    });
  };
  static huyHoaDonQLHoaDon = (id, maNV, data) => {
    return requestAdmin({
      method: "PUT",
      url: `/admin/hoa-don/xoa-hoa-don/${id}/${maNV}`,
      data: data,
      headers: {
        Authorization: this.getToken,
      },
    });
  };
  static deleteInvoiceAndRollBackProduct = (idCTSP, id) => {
    const getToken = getHeader();
    return requestAdmin({
      method: "DELETE",
      url: `/admin/hoa-don/delete-hoa-don-chi-tiet/${idCTSP}/${id}`,
      headers: {
        Authorization: getToken,
      },
    });
  };
  static themSanPham = (idHD, maNV, idCTSP) => {
    return requestAdmin({
      method: "PUT",
      url: `/admin/hoa-don/them-san-pham/${idHD}/${idCTSP}/${maNV}`,
      headers: {
        Authorization: this.getToken,
      },
    });
  };

  static detailHDByMa = (id) => {
    return requestAdmin({
      method: "GET",
      url: `/admin/hoa-don/detail-hoa-don/${id}`,
      headers: {
        Authorization: this.getToken,
      },
    });
  };
}

