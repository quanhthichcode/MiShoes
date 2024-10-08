import { getHeader, requestAdmin } from "../request";

export class NhanVienAPI {
  
  static getAll = () => {
     const getToken = getHeader();
    return requestAdmin({
      method: "GET",
      url: `admin/nhan-vien`,
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
      url: `/admin/nhan-vien`,
      data: data,
      headers: {
        Authorization: getToken,
      },
    });
  };

  static update = (data) => {
     const getToken = getHeader();
    return requestAdmin({
      method: "PUT",
      url: `/admin/nhan-vien`,
      data: data,
      headers: {
        Authorization: getToken,
      },
    });
  };

  static updateStatus = (data) => {
     const getToken = getHeader();
    return requestAdmin({
      method: "POST",
      url: `/admin/employee/update`,
      data: data,
      headers: {
        Authorization: getToken,
      },
    });
  };

  static getOneByIdUser = (id) => {
     const getToken = getHeader();
    return requestAdmin({
      method: "GET",
      url: `/admin/nhan-vien/${id}`,
      headers: {
        Authorization: getToken,
      },
    });
  };
  static timKiem = (data) => {
     const getToken = getHeader();
    return requestAdmin({
      method: "POST",
      url: `/admin/nhan-vien/search`,
      data: data,
      headers: {
        Authorization: getToken,
      },
    });
  };
}
