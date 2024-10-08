import React, { useState, useEffect } from "react";
import {
  Table,
  Form,
  Input,
} from "antd";
import { NguoiDungVoucherAPI } from "../api/voucher/nguoiDungVoucher.api";

const TableNguoiDungVoucher=(props)=>{
    const {idV}=props;
    const [khachHang, setKhachHangs] = useState([]);
  
    useEffect(() => {
        const loadKhachHang = () => {
            NguoiDungVoucherAPI.getNguoiDungVoucher(idV).then((result) => {
            
              setKhachHangs(result.data); 
            });
          };
          loadKhachHang();
      }, []);

    const columnsKhachHang= [

        {
          title: "#",
          dataIndex: "idND",
          key: "idND",
          render: (id, record, index) => {
            ++index;
            return index;
          },
          showSorterTooltip: false,
        },
        {
          title: "Mã",
          dataIndex: "maND",
          key: "maND",
          sorter: (a, b) => a.ma.slice(2) - b.ma.slice(2),
        },
        {
          title: "Tên",
          dataIndex: "tenND",
          key:"tenND",
        },
        {
          title: "Điểm",
          dataIndex: "diem",
          key:"diem",
        },
        {
          title: "Số điện thoại",
          dataIndex: "sdt",
          key: "sdt",
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
          },
      ];

      const dataSource = khachHang.map((item, index) => ({
        key: item.idND,
       // checkbox: ++index,
        idND: item.idND,
        maND: item.maND,
        tenND: item.tenND,
        diem: item.diem,
        sdt: item.sdt,      
        email : item.email
      }));

    return(
        <div className="container">
        <Form>
          <Form.Item label="Tìm kiếm" name="key">
            <Input placeholder="Tìm kiếm"  className="rounded-pill border-warning"/>
          </Form.Item>
        </Form>

      <Table
      columns={columnsKhachHang}
      dataSource={dataSource}  
      pagination={{ defaultPageSize: 5 }}
     /> 
      </div>
    );
};
export default TableNguoiDungVoucher;