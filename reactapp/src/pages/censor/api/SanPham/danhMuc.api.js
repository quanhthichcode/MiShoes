import { getHeader, requestAdmin } from "../request";

export class DanhMucAPI {
  
  static getAll = () => {
    const getToken = getHeader();
    return requestAdmin({
      method: "GET",
      url: `/admin/danh-muc`,
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
      url: `/admin/danh-muc/tim-kiem`,
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
      url: `/admin/danh-muc/add`,
      data: data,
      headers: {
        Authorization: getToken,
      },
    });
  };
  static updateDM = (id, data) => {
    const getToken = getHeader();
    return requestAdmin({
      method: "PUT",
      url: `admin/danh-muc/update/${id}`,
      data: data,
      headers: {
        Authorization: getToken,
      },
    });
  };
  static detailDM = (id) => {
    const getToken = getHeader();
    return requestAdmin({
      method: "GET",
      url: `/admin/danh-muc/detail/${id}`,
      headers: {
        Authorization: getToken,
      },
    });
  };
}
