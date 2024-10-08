import { getHeader, requestAdmin } from "../request";

export class PromotionAPI {

  static getAll = () => {
    const getToken = getHeader();
    return requestAdmin({
      method: "GET",
      url: `/admin/khuyen-mai/hien-thi`,
      headers: {
        Authorization: getToken,
      },
    });
  };

  static create = (data) => {
     const getToken = getHeader();
    return requestAdmin({
      method: "POST",
      url: "/admin/khuyen-mai/add",
      data: data,
      headers: {
        Authorization:getToken,
      },
    });
  };

  static update = (id, data) => {
     const getToken = getHeader();
    return requestAdmin({
      method: "PUT",
      url: `/admin/khuyen-mai/update/${id}`,
      data: data,
      headers: {
        Authorization:getToken,
      },
    });
  };

  static detail = (id) => {
     const getToken = getHeader();
    return requestAdmin({
      method: "GET",
      url: `/admin/khuyen-mai/detail/${id}`,
      headers: {
        Authorization:getToken,
      },
    });
  };

  static updateAutoClose = (id, data) => {
     const getToken = getHeader();
    return requestAdmin({
      method: "PUT",
      url: `/admin/khuyen-mai/updateTrangThai/${id}`,
      data: data,
      headers: {
        Authorization:getToken,
      },
    });
  };

  static updateAutoStart = (id, data) => {
     const getToken = getHeader();
    return requestAdmin({
      method: "PUT",
      url: `/admin/khuyen-mai/updateTrangThai1/${id}`,
      data: data,
      headers: {
        Authorization:getToken,
      },
    });
  };

  static updateClosePromotion = (id, data) => {
     const getToken = getHeader();
    return requestAdmin({
      method: "PUT",
      url: `/admin/khuyen-mai/updateTrangThai2/${id}`,
      data: data,
      headers: {
        Authorization:getToken,
      },
    });
  };

  static updateOpenPromotion = (id, data) => {
     const getToken = getHeader();
    return requestAdmin({
      method: "PUT",
      url: `/admin/khuyen-mai/updateTrangThai3/${id}`,
      data: data,
      headers: {
        Authorization:getToken,
      },
    });
  };

  static search = (data) => {
     const getToken = getHeader();
    return requestAdmin({
      method: "POST",
      url: `/admin/khuyen-mai/search-khuyen-mai`,
      data: data,
      headers: {
        Authorization:getToken,
      },
    });
  };

  static updateProductByPromotion = (id, data) => {
     const getToken = getHeader();
    return requestAdmin({
      method: "PUT",
      url: `/admin/ctsp/updateKM/${id}`,
      data: data,
      headers: {
        Authorization:getToken,
      },
    });
  };

  static showProductByPromotion = (id) => {
     const getToken = getHeader();
    return requestAdmin({
      method: "GET",
      url: `/admin/ctsp/showKM/${id}`,
      headers: {
        Authorization:getToken,
      },
    });
  };

  static deletePromotion = (id) => {
     const getToken = getHeader();
    return requestAdmin({
      method: "PUT",
      url: `/admin/ctsp/deleteKM/${id}`,
      headers: {
        Authorization:getToken,
      },
    });
  };

  static showSPByProduct = (id) => {
     const getToken = getHeader();
    return requestAdmin({
      method: "GET",
      url: `/admin/san-pham/showSP/${id}`,
      headers: {
        Authorization:getToken,
      },
    });
  };

  static loadCTSPBySP = (id) => {
     const getToken = getHeader();
    return requestAdmin({
      method: "GET",
      url: `/admin/ctsp/showCTSP/${id}`,
      headers: {
        Authorization:getToken,
      },
    });
  };

  static loadSP = () => {
     const getToken = getHeader();
    return requestAdmin({
      method: "GET",
      url: `/admin/san-pham`,
      headers: {
        Authorization:getToken,
      },
    });
  };
}
