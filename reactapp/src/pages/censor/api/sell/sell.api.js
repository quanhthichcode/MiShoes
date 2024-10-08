import { Value } from "sass";
import { getHeader,requestAdmin } from "../request";


export class SellAPI {
  

  static getAllCustomers = () => {
     const getToken = getHeader();
    return requestAdmin({
      method: "GET",
      url: "/admin/khach-hang",
      headers: {
        Authorization: getToken,
      },
    });
  };

  static getAllSizes = () => {
     const getToken = getHeader();
    return requestAdmin({
      method: "GET",
      url: "/admin/kich-thuoc",
      headers: {
        Authorization: getToken,
      },
    });
  };

  static getAllColors = () => {
     const getToken = getHeader();
    return requestAdmin({
      method: "GET",
      url: "/admin/mau-sac",
      headers: {
        Authorization: getToken,
      },
    });
  };

  static getAllMeterials = () => {
     const getToken = getHeader();
    return requestAdmin({
      method: "GET",
      url: "/admin/chat-lieu",
      headers: {
        Authorization: getToken,
      },
    });
  };

  static getAllSoles = () => {
     const getToken = getHeader();
    return requestAdmin({
      method: "GET",
      url: "/admin/de-giay",
      headers: {
        Authorization: getToken,
      },
    });
  };

  static getAllCategories = () => {
     const getToken = getHeader();
    return requestAdmin({
      method: "GET",
      url: "/admin/danh-muc",
      headers: {
        Authorization: getToken,
      },
    });
  };

  static getAllBrands = () => {
     const getToken = getHeader();
    return requestAdmin({
      method: "GET",
      url: "/admin/hang",
      headers: {
        Authorization: getToken,
      },
    });
  };

  static getAllProducts = () => {
     const getToken = getHeader();
    return requestAdmin({
      method: "GET",
      url: "/admin/ban-hang/getALLCTSP",
      headers: {
        Authorization: getToken,
      },
    });
  };

  static addBill = (data) => {
     const getToken = getHeader();
    return requestAdmin({
      method: "POST",
      url: "/admin/ban-hang/add-hoa-don",
      data: data,
      headers: {
        Authorization: getToken,
      },
    });
  };

  static getAllHoaDonCho = () => {
     const getToken = getHeader();
    return requestAdmin({
      method: "GET",
      url: "/admin/ban-hang/hoa-don/hoa-don-cho",
      headers: {
        Authorization: getToken,
      },
    });
  };

  static getAllHoaDonChoHomNay = () => {
     const getToken = getHeader();
    return requestAdmin({
      method: "GET",
      url: "/admin/ban-hang/hoa-don/hoa-don-cho-hom-nay",
      headers: {
        Authorization: getToken,
      },
    });
  };

  static getAllHDCTByHD = (ma) => {
     const getToken = getHeader();
    return requestAdmin({
      method: "GET",
      url: `/admin/ban-hang/hien-thi-hdct/${ma}`,
      headers: {
        Authorization: getToken,
      },
    });
  };

  static addInvoice = (data) => {
     const getToken = getHeader();
    return requestAdmin({
      method: "POST",
      url: "/admin/ban-hang/addHDCT",
      data: data,
      headers: {
        Authorization: getToken,
      },
    });
  };

  static updateTraSau = (ma,idNV) => {
     const getToken = getHeader();
    return requestAdmin({
      method: "PUT",
      url: `/admin/ban-hang/tra-sau/hoa-don/${ma}/${idNV}`,
      headers: {
        Authorization: getToken,
      },
    });
  }

  static getLinkVnpay = (hoaDon, money) => {
     const getToken = getHeader();
    return requestAdmin({
      method: "GET",
      url: `/vnppayment/chuyen-khoan/${hoaDon}/${money}`,
      headers: {
        Authorization: getToken,
      },
    });
  };

  static getVoucherNoLimited = () => {
     const getToken = getHeader();
    return requestAdmin({
      method: "GET",
      url: `/admin/ban-hang/voucher/no-limited`,
      headers: {
        Authorization: getToken,
      },
    });
  };

  static getVoucherWithIDKH = (id) => {
     const getToken = getHeader();
    return requestAdmin({
      method: "GET",
      url: `/admin/ban-hang/voucher/${id}`,
      headers: {
        Authorization: getToken,
      },
    });
  };
  static deleteInvoiceAndRollBackProduct = (idCTSP, ma) => {
     const getToken = getHeader();
    return requestAdmin({
      method: "DELETE",
      url: `/admin/ban-hang/delete-hoa-don-chi-tiet/${idCTSP}/${ma}`,
      headers: {
        Authorization: getToken,
      },
    });
  };
  static updateSL = (idCTSP, ma, Value) => {
     const getToken = getHeader();
    return requestAdmin({
      method: "PUT",
      url: `/admin/ban-hang/hoa-don/updateSL/${idCTSP}/${ma}/${Value}`,
      headers: {
        Authorization: getToken,
      },
    });
  };

  static updateSL1 = (idCTSP, idHD) => {
     const getToken = getHeader();
    return requestAdmin({
      method: "PUT",
      url: `/admin/ban-hang/hoa-don/updateSL1/${idCTSP}/${idHD}`,
      headers: {
        Authorization: getToken,
      },
    });
  };

  static updateKH = (ma, idKH) => {
     const getToken = getHeader();
    return requestAdmin({
      method: "PUT",
      url: `/admin/ban-hang/nguoi-dung/update-nguoi-dung/${ma}/${idKH}`,
      headers: {
        Authorization: getToken,
      },
    });
  };

  static updateReturnKhachLe = (ma) => {
     const getToken = getHeader();
    return requestAdmin({
      method: "PUT",
      url: `/admin/ban-hang/nguoi-dung/update-khach-le/${ma}`,
      headers: {
        Authorization: getToken,
      },
    });
  };

  static updateThanhTien = (idHD) => {
     const getToken = getHeader();
    return requestAdmin({
      method: "PUT",
      url: `/admin/ban-hang/hoa-don/update-thanh-tien/${idHD}`,
      headers: {
        Authorization: getToken,
      },
    });
  };

  static updateVoucherToHD = (idHD, idVoucher) => {
     const getToken = getHeader();
    return requestAdmin({
      method: "PUT",
      url: `/admin/ban-hang/hoa-don/them-voucher/${idHD}/${idVoucher}`,
      headers: {
        Authorization: getToken,
      },
    });
  };
  static thanhToanTienMat = (data) => {
     const getToken = getHeader();
    return requestAdmin({
      method: "POST",
      url: `/admin/thanh-toan/thanh-toan-tien-mat`,
      data: data,
      headers: {
        Authorization: getToken,
      },
    });
  };

  static thanhToanChuyenKhoan = (data) => {
     const getToken = getHeader();
    return requestAdmin({
      method: "POST",
      url: `/admin/thanh-toan/thanh-toan-chuyen-khoan`,
      data: data,
      headers: {
        Authorization: getToken,
      },
    });
  };


  static thanhToanHoaDon = (ma,idNV,idVoucher) => {
    const getToken = getHeader();
   return requestAdmin({
     method: "PUT",
     url: `/admin/ban-hang/thanh-toan/hoa-don/${ma}/${idNV}/${idVoucher}`,
     headers: {
       Authorization: getToken,
     },
   });
   
 };

 static thanhToanHoaDonKhongVoucher = (ma,idNV) => {
  const getToken = getHeader();
 return requestAdmin({
   method: "PUT",
   url: `/admin/ban-hang/thanh-toan/hoa-don/${ma}/${idNV}`,
   headers: {
     Authorization: getToken,
   },
 });
 
};



  static updateVanChuyen = (ma, data) => {
     const getToken = getHeader();
    return requestAdmin({
      method: "PUT",
      url: `/admin/ban-hang/hoa-don/update-van-chuyen/${ma}`,
      data: data,
      headers: {
        Authorization: getToken,
      },
    });
  };

  static deleteVanChuyen = (ma) => {
     const getToken = getHeader();
    return requestAdmin({
      method: "PUT",
      url: `/admin/ban-hang/hoa-don/delete-van-chuyen/${ma}`,
      headers: {
        Authorization: getToken,
      },
    });
  };

  static addBillClient = (data) => {
     const getToken = getHeader();
    return requestAdmin({
      method: "POST",
      url: "/admin/ban-hang/addHDClient",
      data: data,
      headers: {
        Authorization: getToken,
      },
    });
  };

  static getSLAndSLT = (idSP,ma) => {
     const getToken = getHeader();
    return requestAdmin({
      method: "GET",
      url: `/admin/ban-hang/hoa-don/san-pham/so-luong/${idSP}/${ma}`,
      headers: {
        Authorization: getToken,
      },
    });
  };

  static updateTienVanChuyen = (ma,tien) => {
     const getToken = getHeader();
    return requestAdmin({
      method: "PUT",
      url: `/admin/ban-hang/hoa-don/update-tien-van-chuyen/${ma}/${tien}`,
      headers: {
        Authorization: getToken,
      },
    });
  }

  static getThanhTienbyMaHD = (ma) => {
     const getToken = getHeader();
    return requestAdmin({
      method: "GET",
      url: `/admin/ban-hang/hoa-don/so-tien/${ma}`,
      headers: {
        Authorization: getToken,
      },
    });
  }

  static voucherTotNhat = (idKH,money) => {
     const getToken = getHeader();
    return requestAdmin({
      method: "GET",
      url: `/admin/ban-hang/hoa-don/voucher-tot-nhat/${idKH}/${money}`,
      headers: {
        Authorization: getToken,
      },
    });
  }

  static voucherSapDatDuoc = (idKH,money,idV) => {
     const getToken = getHeader();
    return requestAdmin({
      method: "GET",
      url: `/admin/ban-hang/hoa-don/khuyen-mai-sap-dat-duoc/${idKH}/${money}/${idV}`,
      headers: {
        Authorization: getToken,
      },
    });
  }

  static detailHoaDon = (ma) => {
     const getToken = getHeader();
    return requestAdmin({
      method: "GET",
      url: `/admin/ban-hang/detail-hoa-don/${ma}`,
      headers: {
        Authorization: getToken,
      },
    });
  }
}