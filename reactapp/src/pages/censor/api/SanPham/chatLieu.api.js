import { getHeader, requestAdmin } from "../request";

export class ChatLieuAPI {
  
  static getAll = () => {
    const getToken = getHeader();
    return requestAdmin({
      method: "GET",
      url: `/admin/chat-lieu`,
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
      url: `/admin/chat-lieu/tim-kiem`,
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
      url: `/admin/chat-lieu/add`,
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
      url: `admin/chat-lieu/update/${id}`,
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
      url: `/admin/chat-lieu/detail/${id}`,
      headers: {
        Authorization: getToken,
      },
    });
  };
}
