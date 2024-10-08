import { requestAdmin } from "../request";

export class LoginAPI {
  //Đăng nhập
  static login = (dataLogin) => {
    return requestAdmin({
      method: "POST",
      url: `/api/login`,
      data: dataLogin,
    });
  };
  static signUp = (data) => {
    return requestAdmin({
      method: "POST",
      url: `/api/sign-up`,
      data: data,
    });
  };
  static forgotPass = (data) => {
    return requestAdmin({
      method: "POST",
      url: `/api/forgot-password`,
      data: data,
    });
  };
}