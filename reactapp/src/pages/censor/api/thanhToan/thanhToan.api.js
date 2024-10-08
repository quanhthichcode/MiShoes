import { getHeader,requestAdmin } from "../request";

export class ThanhToanAPI {
  static LichSuThanhToanByIdHD = (idHD) => {
    const getToken = getHeader();
    return requestAdmin({
      method: "GET",
      url: `/admin/thanh-toan/${idHD}`,
      headers: {
        Authorization: getToken,
      },
    });
  };

  static getThanhToan = (maHD) => {
    const getToken = getHeader();
    return requestAdmin({
      method: "GET",
      url: `/admin/thanh-toan/hoa-don/${maHD}`,
      headers: {
        Authorization: getToken,
      },
    });
  };

  static xoaTT = (maHD,phuongThuc) => {
    const getToken = getHeader();
    return requestAdmin({
      method: "DELETE",
      url: `/admin/thanh-toan/hoa-don/xoa/${maHD}/${phuongThuc}`,
      headers: {
        Authorization: getToken,
      },
    });
  };
}
