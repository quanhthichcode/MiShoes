import {
    getHeader,requestAdmin
} from "../request";

export class NguoiDungVoucherAPI {
    static getAllByVoucher = (id) => {
       const getToken = getHeader();
        return requestAdmin({
          method: "GET",
          url: `/admin/nguoi-dung-voucher/voucher/${id}`,
          headers: {
            Authorization: getToken,
          },
        });
    };

    static getNguoiDungVoucher = (id) => {
       const getToken = getHeader();
        return requestAdmin({
          method: "GET",
          url: `/admin/nguoi-dung-voucher/ngv/${id}`,
          headers: {
            Authorization: getToken,
          },
        });
    };

    static create = (id,data) => {
       const getToken = getHeader();
        return requestAdmin({
          method: "POST",
          url: `/admin/nguoi-dung-voucher/add/${id}`,
          data: data,
          headers: {
            Authorization: getToken,
          },
        });
    };

    static delete = (idND,idV) => {
       const getToken = getHeader();
        return requestAdmin({
          method: "PUT",
          url: `/admin/nguoi-dung-voucher/delete-ndv/${idND}/${idV}`,
          headers: {
            Authorization: getToken,
          },
        });
        
    };
    static updateTTNgung = (idV,idKH) => {
       const getToken = getHeader();
        return requestAdmin({
          method: "PUT",
          url: `/admin/nguoi-dung-voucher/update/da-ket-thuc/${idV}/${idKH}`,
          headers: {
            Authorization: getToken,
          },
        });
    };
    static updateTTHD = (idV,idKH) => {
       const getToken = getHeader();
        return requestAdmin({
          method: "PUT",
          url: `/admin/nguoi-dung-voucher/update/da-ket-thuc/${idV}/${idKH}`,
          headers: {
            Authorization: getToken,
          },
        });
    };
    static updateTTSap = (idV,idKH) => {
       const getToken = getHeader();
        return requestAdmin({
          method: "PUT",
          url: `/admin/nguoi-dung-voucher/update/sap-bat-dau/${idV}/${idKH}`,
          headers: {
            Authorization: getToken,
          },
        });
    };

    static getByNguoiDung = (id) => {
       const getToken = getHeader();
        return requestAdmin({
          method: "GET",
          url: `/admin/nguoi-dung-voucher/nguoi-dung/${id}`,
          headers: {
            Authorization: getToken,
          },
        });
    };

    static getSearchKhachHang = (data) => {
       const getToken = getHeader();
        return requestAdmin({
            method: "POST",
            url: `/admin/nguoi-dung-voucher/searchKhachHang`,
            data: data,
                      headers: {
                'Authorization': getToken}
        });
    };
  
}