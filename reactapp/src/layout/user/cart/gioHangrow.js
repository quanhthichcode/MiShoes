import React, { useEffect, useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { GioHangAPI } from "../../../pages/censor/api/gioHang/gioHang.api";
import { Badge, Image } from "antd";
import { get, set } from "local-storage";
import { useCart } from "../cart/CartContext";
function ProductRow({ product, loadghct, loadSoLuongSPTrongGH }) {
  const [quantity, setQuantity] = useState();
  const [price, setPrice] = useState();
  const [ctsp, setCtsp] = useState({});
  const [priceOne, setPriceOne] = useState();
  const { updateTotalQuantity } = useCart();
  const storedData = get("userData");
  const storedGioHang = get("GioHang");
  console.log("chit tioeest sản phẩm", ctsp);
  console.log("thit pro", product);
  useEffect(() => {
    setQuantity(product.soLuong);
    setPrice(product.thanhTien);
    setPriceOne(product.thanhTien / product.soLuong);
    loadCountGioHang();
    GioHangAPI.detailCTSP(product.chiTietSanPham).then((res) => {
      setCtsp(res.data);
    });
    //loadghct();
  }, [product.id]);

  const decreaseQuantity = () => {
    setQuantity(quantity - 1 > 0 ? quantity - 1 : 0);
    setPrice(quantity > 0 ? price - priceOne : 0);
    if (quantity > 0) {
      handleUpdateGHCT(quantity - 1, price - priceOne, product);
    }
    if (quantity === 1) {
      handleDeleteGHCT();
    }
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1 < ctsp.soLuong ? quantity + 1 : ctsp.soLuong);
    setPrice(quantity < ctsp.soLuong ? price + priceOne : price);
    if (quantity < ctsp.soLuong) {
      handleUpdateGHCT(quantity + 1, price + priceOne, product);
    }
  };

  const loadCountGioHang = () => {
    if (storedData != null) {
      GioHangAPI.getByIDKH(storedData.userID).then((res) => {
        GioHangAPI.getAllGHCTByIDGH(res.data.id).then((res) => {
          updateTotalQuantity(res.data.length);
          console.log("counttttttt", res.data.length);
        });
      });
    } else {
      console.log("giỏ hàng", storedGioHang);
      GioHangAPI.getAllGHCTByIDGH(storedGioHang.id).then((res) => {
        updateTotalQuantity(res.data.length);
        console.log("count", res.data);
      });
    }
  };
  const handleDeleteGHCT = () => {
    //  loadghct();
    //  loadCountGioHang();
    console.log("Xóa sp", product);
    GioHangAPI.deleteGHCT(product.id);
    loadghct();
    loadCountGioHang();
    // loadSoLuongSPTrongGH();
  };
  const handleUpdateGHCT = (quantity, price, product) => {
    const data = {
      id: product.id,
      gioHang: product.gioHang,
      chiTietSanPham: product.chiTietSanPham,
      soLuong: quantity,
      thanhTien: price,
    };
    GioHangAPI.updateGHCT(data).then((res) => {
      loadghct();
    });
  };
  return (
    <tr>
      <td className="row">
        <div className="col-md-3">
          <Badge.Ribbon
            text={
              ctsp.loaiKM
                ? ctsp.loaiKM === "Tiền mặt"
                  ? "-" +
                    `${Intl.NumberFormat("en-US").format(
                      ctsp.giaTriKhuyenMai
                    )} VNĐ`
                  : "-" + ctsp.giaTriKhuyenMai + "%"
                : ""
            }
            color={ctsp.loaiKM !== null ? "red" : "rgba(255, 255, 255, 0)"}
            size="small"
            style={{
              marginRight: -65,
              // width: ctsp.loaiKM ? 50 : ctsp.loaiKM === "Tiền mặt" ? 200 :0,
              height: ctsp.loaiKM ? 25 : 0,
            }}
          >
            <Image
              style={{ width: 150, height: 150 }}
              src={ctsp.ghiChu}
              alt="Product"
            />
          </Badge.Ribbon>
        </div>
        <div className="col-md-6 fw-bold mt-3" style={{ paddingLeft: 80 }}>
          <h6> {ctsp.tenSP}</h6>
          <h6 className="mt-2 text-danger">{ctsp.kichThuoc}</h6>
          <div
            className="mt-2"
            style={{
              backgroundColor: `${ctsp.mauSac}`,
              borderRadius: 6,
              width: 60,
              height: 25,
            }}
          ></div>
        </div>
      </td>
      <td>
        <h6 className=" fw-bold" style={{ color: "red", marginTop: "50px" }}>
          <del style={{ color: "black" }} hidden={ctsp.loaiKM ? false : true}>
            {Intl.NumberFormat("en-US").format(ctsp.loaiKM ? ctsp.giaBan : 0)}{" "}
            VND
            <br />
          </del>
          {Intl.NumberFormat("en-US").format(
            ctsp.loaiKM === "Tiền mặt"
              ? ctsp.giaBan - ctsp.giaTriKhuyenMai
              : ctsp.giaBan - (ctsp.giaBan * ctsp.giaTriKhuyenMai) / 100
          )}{" "}
          VND
        </h6>
      </td>
      <td>
        <div
          className="d-flex align-items-center"
          style={{ marginTop: "45px" }}
        >
          <button
            onClick={decreaseQuantity}
            style={{ width: 35, borderRadius: 10 }}
          >
            -
          </button>
          <input
            value={quantity}
            className="ms-2 me-2 text-center"
            style={{ width: 35 }}
            min={0}
            readOnly
          ></input>
          <button
            onClick={increaseQuantity}
            style={{ width: 35, borderRadius: 10 }}
          >
            +
          </button>
        </div>
      </td>
      <td>
        <h6 className=" fw-bold" style={{ color: "red", marginTop: "50px" }}>
          {Intl.NumberFormat("en-US").format(price)}VNĐ
        </h6>
      </td>
      <td>
        <button
          style={{ borderRadius: 5, marginTop: "45px" }}
          onClick={handleDeleteGHCT}
        >
          <FaRegTrashAlt />
        </button>
      </td>
    </tr>
  );
}

export default ProductRow;
