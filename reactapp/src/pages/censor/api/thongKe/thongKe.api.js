import { getHeader, requestAdmin } from "../request";

export class ThongKeAPI {

    static getAllThongKeNgay = () => {
        const getToken = getHeader();
        return requestAdmin({
            method: "GET",
            url: `/admin/thong-ke/ngay`,
            headers: {
                'Authorization': getToken}
            //   params: filter,
        });
    };
    static getAllThongKeThang = () => {
        const getToken = getHeader();
        return requestAdmin({
            method: "GET",
            url: `/admin/thong-ke/thang`,
            headers: {
                'Authorization': getToken}
            //   params: filter,
        });
    };
    static getAllThongKeNam = () => {
        const getToken = getHeader();
        return requestAdmin({
            method: "GET",
            url: `/admin/thong-ke/nam`,
            headers: {
                'Authorization': getToken}
            //   params: filter,
        });
    };
    static getDoanhThuNgayTruoc = () => {
        const getToken = getHeader();
        return requestAdmin({
            method: "GET",
            url: `/admin/thong-ke/doanh-thu-ngay-truoc`,
            headers: {
                'Authorization': getToken}
            //   params: filter,
        });
    };
    static getDoanhThuThangTruoc = () => {
        const getToken = getHeader();
        return requestAdmin({
            method: "GET",
            url: `/admin/thong-ke/doanh-thu-thang-truoc`,
            headers: {
                'Authorization': getToken}
            //   params: filter,
        });
    };
    static getDoanhThuNamTruoc = () => {
        const getToken = getHeader();
        return requestAdmin({
            method: "GET",
            url: `/admin/thong-ke/doanh-thu-nam-truoc`,
            headers: {
                'Authorization': getToken}
            //   params: filter,
        });
    };

    static bieuDoNgay = () => {
        const getToken = getHeader();
        return requestAdmin({
            method: "GET",
            url: `/admin/thong-ke/bieu-do-ngay`,
            //   params: filter,
            headers: {
                'Authorization': getToken}
        });
    };

    static bieuDoTuan = () => {
        const getToken = getHeader();
        return requestAdmin({
            method: "GET",
            url: `/admin/thong-ke/bieu-do-tuan`,
            headers: {
                'Authorization': getToken}
            //   params: filter,
        });
    };
    static bieuDoThang = () => {
        const getToken = getHeader();
        return requestAdmin({
            method: "GET",
            url: `/admin/thong-ke/bieu-do-thang`,
            headers: {
                'Authorization': getToken}
            //   params: filter,
        });
    };
    static bieuDoNam = () => {
        const getToken = getHeader();
        return requestAdmin({
            method: "GET",
            url: `/admin/thong-ke/bieu-do-nam`,
            headers: {
                'Authorization': getToken}
            //   params: filter,
        });
    };
    static trangThaiHoaDonThang = () => {
        const getToken = getHeader();
        return requestAdmin({
            method: "GET",
            url: `/admin/thong-ke/trang-thai-hoa-don-thang`,
            headers: {
                'Authorization': getToken}
            //   params: filter,
        });
    };
    static trangThaiHoaDonNgay = () => {
        const getToken = getHeader();
        return requestAdmin({
            method: "GET",
            url: `/admin/thong-ke/trang-thai-hoa-don-ngay`, headers: {
                'Authorization': getToken}
            //   params: filter,
        });
    };
    static trangThaiHoaDonTuan = () => {
        const getToken = getHeader();
        return requestAdmin({
            method: "GET",
            url: `/admin/thong-ke/trang-thai-hoa-don-tuan`, headers: {
                'Authorization': getToken}
            //   params: filter,
        });
    };
    static trangThaiHoaDonNam = () => {
        const getToken = getHeader();
        return requestAdmin({
            method: "GET",
            url: `/admin/thong-ke/trang-thai-hoa-don-nam`, headers: {
                'Authorization': getToken}
            //   params: filter,
        });
    };

    static sanPhamBanChayThang = () => {
        const getToken = getHeader();
        return requestAdmin({
            method: "GET",
            url: `/admin/thong-ke/san-pham-ban-chay-thang`, headers: {
                'Authorization': getToken}
            //   params: filter,
        });
    };
    static sanPhamBanChayTuan = () => {
        const getToken = getHeader();
        return requestAdmin({
            method: "GET",
            url: `/admin/thong-ke/san-pham-ban-chay-tuan`, headers: {
                'Authorization': getToken}
            //   params: filter,
        });
    };
    static sanPhamBanChayNgay = () => {
        const getToken = getHeader();
        return requestAdmin({
            method: "GET",
            url: `/admin/thong-ke/san-pham-ban-chay-ngay`,
            //   params: filter,
            headers: {
                'Authorization': getToken}
        });
    };
    static sanPhamBanChayNam = () => {
        const getToken = getHeader();
        return requestAdmin({
            method: "GET",
            url: `/admin/thong-ke/san-pham-ban-chay-nam`, headers: {
                'Authorization': getToken}
            //   params: filter,
        });
    };
    static sanPhamSapHet = () => {
        const getToken = getHeader();
        return requestAdmin({
            method: "GET",
            url: `/admin/thong-ke/san-pham-sap-het`, headers: {
                'Authorization': getToken}
            //   params: filter,
        });
    };
    static loadSanPhamNgay = () => {
        const getToken = getHeader();
        return requestAdmin({
            method: "GET",
            url: `/admin/thong-ke/san-pham-ban-ngay`, headers: {
                'Authorization': getToken}
            //   params: filter,
        });
    };
    static loadSanPhamNgayTruoc = () => {
        const getToken = getHeader();
        return requestAdmin({
            method: "GET",
            url: `/admin/thong-ke/san-pham-ban-ngay-truoc`, headers: {
                'Authorization': getToken}
            //   params: filter,
        });
    };
}    