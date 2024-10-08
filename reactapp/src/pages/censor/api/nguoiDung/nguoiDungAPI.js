import {getHeader,requestAdmin } from "../request";

export class NguoiDungAPI {

  static getALLNguoiDung = () => {
    const getToken = getHeader();
    return requestAdmin({
      method: "GET",
      url: `/admin/nguoi-dung`,
      //   params: filter,
      headers: {
        Authorization: getToken,
      },
    });
  };
  static getDiaChiByIDND = (id) => {
    const getToken = getHeader();
    return requestAdmin({
      method: "GET",
      url: `/admin/khach-hang/ban-hang/dia-chi/${id}`,
      headers: {
        Authorization: getToken,
      },
    });
  }
}
