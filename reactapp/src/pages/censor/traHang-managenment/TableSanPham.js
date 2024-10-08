import React, { useState, useEffect } from "react";
import { Table, Form, InputNumber, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  DeleteAll,
  GetReturnBill,
  LoadReturnBill,
  ReloadReturnBill,
  UpdateReturnBill,
} from "../../../store/reducer/ReturnBill.reducer";
import { UpdateNewBill } from "../../../store/reducer/NewBill.reducer";

const TableSanPham = ({ onSelectedSP, sanPhamHDCT }) => {
  const [form] = Form.useForm();
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const dispatch = useDispatch();
  let returnHoaDon = useSelector(GetReturnBill);
 
  useEffect(() => {
    dispatch(ReloadReturnBill());
    sanPhamHDCT.map((item) =>
      dispatch(
        LoadReturnBill({
          key: item.idHDCT,
          idHD: item.idHD,
          idCTSP: item.idCTSP,
          tenSP: item.tenSP,
          soLuong: item.soLuong,
          donGia: item.giaSauGiam,
          soLuongHienTai: 1,
          tenMS: item.tenMS,
          tenKT: item.tenKT,
          idHDCT: item.idHDCT,
          giaTriKhuyenMai: item.giaTriKhuyenMai,
          giaGiam: item.giaGiam,
        })
      )
    );
  }, [sanPhamHDCT]);
 

  const handleCheckboxChange = (selectedKeys, selectedRowKeys) => {
    if (selectedRowKeys !== null) {
      setSelectedRowKeys(selectedKeys);
      onSelectedSP(selectedRowKeys);
    }
  };
  
  const columnSanPham = [
    {
      title: "#",
      dataIndex: "idHDCT",
      key: "idHDCT",
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
      render: (text, record) => (
        <Form layout="inline">
          <Form.Item>
            <Button
              type="primary"
              onClick={() =>
                {
                dispatch(
                  UpdateReturnBill({
                    key: record.idHDCT,
                    soLuongHienTai: record.soLuongHienTai - 1,
                  })
                ) ;
          
                (dispatch(UpdateNewBill({key:record.idHDCT,soLuong:record.soLuongHienTai - 1}))) 
                
              }
            }
              disabled={record.soLuongHienTai === 0}
            >
              -
            </Button>
            <InputNumber
              value={record.soLuongHienTai}
              min={1}
              max={record.soLuong}
              style={{ margin: "0 16px" }}
              readOnly
            />
            <Button
              type="primary"
              onClick={() =>
                {
                dispatch(
                  UpdateReturnBill({
                    key: record.idHDCT,
                    soLuongHienTai: record.soLuongHienTai + 1,
                  })
                ) ;
                
                (dispatch(UpdateNewBill({key:record.idHDCT,soLuong:record.soLuongHienTai + 1}))) 
                
              }
            }
              disabled={record.soLuongHienTai === record.soLuong}
            >
              +
            </Button>
          </Form.Item>
          <Form.Item>
            {record.soLuongHienTai}/{record.soLuong}
          </Form.Item>
        </Form>
      ),
    },
    {
      title: "Đơn giá",
      dataIndex: "donGia",
      key: "donGia",
    },
  ];

  const rowSelection = {
    selectedRowKeys,
    onChange: handleCheckboxChange,
  };


  return (
    <Table
      rowSelection={{
        ...rowSelection,
        getCheckboxProps: (record) => ({
          disabled: record.giaTriKhuyenMai !== null,
        }),
      }}
      defaultSelectedRowKeys={selectedRowKeys}
      columns={columnSanPham}
      dataSource={returnHoaDon}
      pagination={false}
    />
  );
};

export default TableSanPham;
