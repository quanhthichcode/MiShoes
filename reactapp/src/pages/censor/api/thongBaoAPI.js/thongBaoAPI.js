import { getHeader, requestAdmin,requestClient } from "../request";

export class ThongBaoAPI {
  
  static getALlThongBaoAdmin = () => {
    const getToken = getHeader();
    // return requestAdmin.get(`/admin/thong-bao/getAll`);
    return requestAdmin({
      method: "GET",
      url: `/admin/thong-bao/getAll`,
      headers: {
        'Authorization': getToken}
      //   params: filter,
    });
  };

  static countThongBaoAdmin = () => {
    const getToken = getHeader();
    return requestAdmin({
      method: "GET",
      url: `/admin/thong-bao/count`,
      headers: {
        'Authorization': getToken}
      //   params: filter,
    });
  };

  static getALlThongBaoKH = (tokens) => {
    return requestClient({
      method: "GET",
      url: `/KH/thong-bao/getAll`,
      params: { token: tokens },
    });
  };

  static countThongBaoKH = (tokens) => {
    return requestClient({
      method: "GET",
      url: `/KH/thong-bao/count`,
      params: { token: tokens },
    });
  };

  static updateStatus = (id) => {
    const getToken = getHeader();
    return requestAdmin({
      method: "PUT",
      url: `/admin/thong-bao/da-xem/${id}`, headers: {
        'Authorization': getToken}
      //   params: filter,
    });
  };
}    