import { getHeader, requestAdmin } from "../request";

export class VoucherAPI {
  
  static getAll = () => {
     const getToken = getHeader();
    return requestAdmin({
      method: "GET",
      url: `admin/voucher`,
      headers: {
        Authorization: getToken,
      },
      //   params: filter,
    });
  };

  static create = (data) => {
     const getToken = getHeader();
    return requestAdmin({
      method: "POST",
      url: `/admin/voucher/add`,
      data: data,
      headers: {
        Authorization: getToken,
      },
    });
  };

  static update = (id, data) => {
     const getToken = getHeader();
    return requestAdmin({
      method: "PUT",
      url: `/admin/voucher/update/${id}`,
      data: data,
      headers: {
        Authorization: getToken,
      },
    });
  };

  static updateTTHD = (id, data) => {
     const getToken = getHeader();
    return requestAdmin({
      method: "PUT",
      url: `/admin/voucher/updateTTHD/${id}`,
      data: data,
      headers: {
        Authorization: getToken,
      },
    });
  };
  static updateTTNgung = (id, data) => {
     const getToken = getHeader();
    return requestAdmin({
      method: "PUT",
      url: `/admin/voucher/updateTTNgung/${id}`,
      data: data,
      headers: {
        Authorization: getToken,
      },
    });
  };
  static updateTTSap = (id, data) => {
     const getToken = getHeader();
    return requestAdmin({
      method: "PUT",
      url: `/admin/voucher/updateTTSap/${id}`,
      data: data,
      headers: {
        Authorization: getToken,
      },
    });
  };
  static updateTTTamDung = (id, data) => {
     const getToken = getHeader();
    return requestAdmin({
      method: "PUT",
      url: `/admin/voucher/updateTTTamDung/${id}`,
      data: data,
      headers: {
        Authorization: getToken,
      },
    });
  };
  static detail = (id) => {
     const getToken = getHeader();
    return requestAdmin({
      method: "GET",
      url: `/admin/voucher/detail/${id}`,
      headers: {
        Authorization: getToken,
      },
    });
  };
  static search = (data) => {
     const getToken = getHeader();
    return requestAdmin({
      method: "POST",
      url: `/admin/voucher/search-voucher`,
      data: data,
      headers: {
        Authorization: getToken,
      },
    });
  };
}
