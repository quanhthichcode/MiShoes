import React, { useState, useEffect } from "react";
import { Table, Form, Input, Badge } from "antd";
import { KhachHangAPI } from "../api/user/khachHang.api";
import { useDispatch, useSelector } from "react-redux";
import { floatButtonPrefixCls } from "antd/es/float-button/FloatButton";
import { DeleteNewBill, GetNewBill, LoadNewBill,UpdateNewBill,UpdateGhiChuBill } from "../../../store/reducer/NewBill.reducer";

const TableSanPhamHoanTra = ({ onSelectedSP, sanPhamHoanTra }) => {
  const [form] = Form.useForm();
  const dispatch= useDispatch();
  let newBill = useSelector(GetNewBill);

  let totalNewBill = newBill.reduce((accumulator, currentItem) => {
    return accumulator + currentItem.tongTien;
  }, 0); // đây là tổng tiền của bill mới
  console.log("sanPhamHoanTra",sanPhamHoanTra);

  

  useEffect(() => {
    dispatch(DeleteNewBill());
    sanPhamHoanTra.map((item) => {
      dispatch(LoadNewBill({
        key: item.idHDCT,
        idCTSP:item.idCTSP,
        tenSP: item.tenSP,
        soLuong: item.soLuongHienTai,
        donGia: item.donGia,
        tenMS:item.tenMS,
        tenKT:item.tenKT,
        idHDCT:item.idHDCT,
        tongTien: parseFloat(item.soLuongHienTai) * parseFloat(item.donGia),
        ghiChu:null,
      }))
    })
  
  }, [sanPhamHoanTra]);


  const columnsKhachHang = [
    {
      title: "#",
      dataIndex: "idCTSP",
      key: "idCTSP",
      render: (id, record, index) => {
        ++index;
        return index;
      },
      showSorterTooltip: false,
    },
    {
      title: "Sản phẩm",
      dataIndex: "tenSP",
      key: "tenSP",
      render: (text, record) => (
        <span>{`${record.tenSP} [${record.tenMS}-${record.tenKT}]`}</span>
      ),
    },
    {
      title: "Số lượng",
      dataIndex: "soLuong",
      key: "soLuong",
      // render:(record)=>(
      //   <Badge color="#b5b5b5" count={record.soLuong}></Badge>
      // )
    },
    {
      title: "Đơn giá",
      dataIndex: "donGia",
      key: "donGia",
    },
    {
      title: "Tổng tiền",
      dataIndex: "tongTien",
      key: "tongTien",
    },
    {
      title: "Ghi chú",
      dataIndex: "idHDCT",
      key: "idHDCT",
      render: (record) => {
        return (
          <Input 
            placeholder="Ghi chú" 
            onChange={(e) => { 
              dispatch(
                UpdateGhiChuBill({
                  key: record,
                  ghiChu: e.target.value,
                })
              );
            }} 
          />
        );
      }
    },
  ];




  return (
    <div className="container">
      <Table
        columns={columnsKhachHang}
        dataSource={newBill}
        pagination={false}
      />
    </div>
  );
};

export default TableSanPhamHoanTra;
