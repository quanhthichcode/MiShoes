import { getHeader, requestAdmin } from "../request";

export class TraHangAPI{
    static getHoaDonByMa = (ma) => {
        const getToken = getHeader();
        return requestAdmin({
            method: "GET",
            url: `/admin/tra-hang/hoa-don-chi-tiet/${ma}`,
            headers: {
                'Authorization': getToken}
            //   params: filter,
        });
    };
    static getThongTinHoaDon = (ma) => {
        const getToken = getHeader();
        return requestAdmin({
            method: "GET",
            url: `/admin/tra-hang/hoa-don/${ma}`,
            headers: {
                'Authorization': getToken}
            //   params: filter,
        });
    };
    static traHang = (data) => {
        const getToken = getHeader();
        return requestAdmin({
            method: "POST",
            url: `/admin/tra-hang/add-tra-hang`,
            data:data,
            headers: {
                'Authorization': getToken}
            //   params: filter,
        });
    };
}