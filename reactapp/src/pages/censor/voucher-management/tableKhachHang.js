import React, { useState, useEffect } from "react";
import {
  Table,
  Form,
  Input,
} from "antd";
import { KhachHangAPI } from "../api/user/khachHang.api";
import { NguoiDungVoucherAPI } from "../api/voucher/nguoiDungVoucher.api";

const TableKhachHang = ({ onSelectedKH, suaKH }) => {
  const [form] = Form.useForm();
  const [khachHang, setKhachHangs] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [top] = useState("none");
  const [bottom] = useState("bottomCenter");
  const onChangeFilter = (changedValues, allValues) => {
   
    timKiemKH(allValues);
  }
  const timKiemKH = (dataSearch) => {
  
   NguoiDungVoucherAPI.getSearchKhachHang(dataSearch)
      .then((res) => {
  
        setKhachHangs(res.data);
      })
  }

  const loadKhachHang = () => {
    KhachHangAPI.getAll().then((result) => {
      setKhachHangs(result.data);
    });
  }

  useEffect(() => {
    loadKhachHang();
  }, []);


  useEffect(() => {
    setSelectedRowKeys(suaKH);
    onSelectedKH(suaKH);
  }, [suaKH]);


  const handleCheckboxChange = (selectedKeys, selectedRowKeys) => {
    if (selectedRowKeys !== null) {
      setSelectedRowKeys(selectedKeys);
      onSelectedKH(selectedKeys);


    };
  }

  const columnsKhachHang = [

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
      key: "tenND",
    },
    {
      title: "Điểm",
      dataIndex: "diem",
      key: "diem",
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



  const rowSelection = {
    selectedRowKeys,
    onChange: handleCheckboxChange,
  };


  const dataSource = khachHang.map((item, index) => ({
    key: item.idND,
    // checkbox: ++index,
    idND: item.idND,
    maND: item.maND,
    tenND: item.tenND,
    diem: item.diem,
    sdt: item.sdt,
    email: item.email
  }));


  return (
    <div className="container">
      <Form
      onValuesChange={onChangeFilter}
      form={form}>
        <Form.Item label="Tìm kiếm" name="ten">
          <Input placeholder="Tìm kiếm"  className="rounded-pill border-warning" />
        </Form.Item>
      </Form>

      <Table
        rowSelection={rowSelection}
        defaultSelectedRowKeys={selectedRowKeys}
        columns={columnsKhachHang}
        dataSource={dataSource}
        pagination={{
          showQuickJumper: true,
          position: [top, bottom],
          defaultPageSize: 10,
          defaultCurrent: 1,
          total: 100,
        }}
      />
    </div>

  );
};

export default TableKhachHang;


