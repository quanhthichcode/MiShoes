import { requestClient } from "../request";

export class HomeAPI {
    //Get sản phẩm mới
    static getAllNewSanPham = () => {
        return requestClient({
            method: "GET",
            url: `/home/new`,
        });
    };   
     //Get sản phẩm hot
    static getHotSale = () => {
        return requestClient({
            method: "GET",
            url: `/home/hot`,
        });
    };
    //Get sản phẩm
    static getAllSanPham = () => {
        return requestClient({
            method: "GET",
            url: `/home`,
        });
    };
    //Get giá
    static getGia = (tenSP) => {
        return requestClient({
            method: "GET",
            url: `/home/${tenSP}`,
        });
    };
    // Tìm mảng 
    static timMang = (data) => {
        return requestClient({
            method: "POST",
            url: `/home/searchMang`,
            data: data
        });
    };
}