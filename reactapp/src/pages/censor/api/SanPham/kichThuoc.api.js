import { getHeader, requestAdmin } from "../request";

export class KichThuocAPI {
 
  static getAll = () => {
    const getToken = getHeader();
    return requestAdmin({
      method: "GET",
      url: `/admin/kich-thuoc`,
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
      url: `/admin/kich-thuoc/tim-kiem`,
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
      url: `/admin/kich-thuoc/add`,
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
      url: `admin/kich-thuoc/update/${id}`,
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
      url: `/admin/kich-thuoc/detail/${id}`,
      headers: {
        Authorization: getToken,
      },
    });
  };
}
