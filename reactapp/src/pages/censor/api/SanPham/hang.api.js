import { getHeader, requestAdmin } from "../request";

export class HangAPI {
  
  static getAll = () => {
    const getToken = getHeader();
    return requestAdmin({
      method: "GET",
      url: `/admin/hang`,
      headers: {
        Authorization: getToken,
      },
      //   params: filter,
    });
  };
  static search = (data) => {
    const getToken = getHeader();
    return requestAdmin({
      method: "POST",
      url: `/admin/hang/tim-kiem`,
      data: data,
      headers: {
        Authorization: getToken,
      },
    });
  };
  static create = (data) => {
    const getToken = getHeader();
    return requestAdmin({
      method: "POST",
      url: `/admin/hang/add`,
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
      url: `admin/hang/update/${id}`,
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
      url: `/admin/hang/detail/${id}`,
      headers: {
        Authorization: getToken,
      },
    });
  };
}
