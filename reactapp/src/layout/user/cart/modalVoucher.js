import { Button, Modal, Table, Tag, Radio, Space, InputNumber } from "antd";
import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import imgTicket from "../../../assets/images/discountTicket.png";
import { BanHangClientAPI } from "../../../pages/censor/api/banHangClient/banHangClient.api";

const ModalVoucher = (props) => {
  const { openModalVoucher, setOpenModalVoucher, userID , voucherID,setVoucherID,total,loadGiamGia} = props;
  const [top, setTop] = useState("none");
  const [bottom, setBottom] = useState("bottomRight");
  const [datas, setData] = useState([]);
  const loadVoucher =  () => {
    if (userID) {
       BanHangClientAPI.getVoucherWithIDKH(userID).then((result) => {
        setData(result.data);
      })
        .catch((error) => {
          console.log(error);
        });
    } else {
        BanHangClientAPI.getVoucherNoLimited().then((result) => {
        console.log("nolimit")
        setData(result.data);
      })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  useEffect(() => {
    // if (userID != null && userID != undefined) {
      loadVoucher();
      // console.log("hóa đơn",hoaDonID)
    // }
  }, [userID]);

  const handleChonVoucher = (record) => {
    setVoucherID(record);
    loadGiamGia(record);
    setOpenModalVoucher(false);
    
  }

  const dataSource = datas.map((item, index) => ({
    key: item.id,
    id: item.id,
    ma: item.ma,
    ten: item.ten,
    mucDo:item.mucDo,
    giamToiDa: item.giamToiDa,
    loaiVoucher: item.loaiVoucher,
    dieuKien: item.dieuKien
  }));

  const columns = [
    {
      title: "STT",
      dataIndex: "id",
      key: "id",
      render: (id, record, index) => {
        ++index;
        return index;
      },
      showSorterTooltip: false,
    },
    {
      title: "Ảnh",
      dataIndex: "anh",
      center: "true",
      render: () => (
        <Space size="middle">
          <img
            src={imgTicket}
            style={{
              width: 100,
              marginRight: "8px",
              heitgh: 80,
              marginTop: "15px",
            }}
          />
        </Space>
      ),
    },
    {
      title: "Mã",
      dataIndex: "ma",
      center: "true",
      sorter: (a, b) => a.ma - b.ma,
    }
    ,
    {
      title: "Tên",
      dataIndex: "ten",
      center: "true",
      sorter: (a, b) => a.ma - b.ma,
    }
    ,
    {
      title: "Loại",
      dataIndex: "loaiVoucher",
      center: "true",
      sorter: (a, b) => a.ma - b.ma,
    }
    ,
    {
      title: "Giảm tối đa",
      dataIndex: "giamToiDa",
      center: "true",
      sorter: (a, b) => a.ma - b.ma,
      render: (value) => `${value.toLocaleString('vi-VN')} VND`
    },
    {
      title: "Điều kiện",
      dataIndex: "dieuKien",
      render: (value) => `${value.toLocaleString('vi-VN')} VND`
    },
    {
      title: "Action",
      key: "action",

      render: (record) => (
        total>=record.dieuKien?(
        <Space size="middle">
          <button className='btn btn-danger' onClick={()=>{handleChonVoucher(record)}}>Chọn</button>
        </Space>
        ):(<Space size="middle">
        <button className='btn btn-danger' disabled>Chọn</button>
      </Space>)
      
      ),
    },
  ]

  const handleClose = () => {
    setOpenModalVoucher(false);
  };
  const handleCloseModalDiaChi = () => {
    setOpenModalVoucher(false);
  };
  return (
    <Modal
      title="Voucher"
      centered
      open={openModalVoucher}
      onOk={handleClose}
      onCancel={handleClose}
      width={1000}
    >
      <Table
        pagination={{
          position: [top, bottom],
        }}
        columns={columns}
        dataSource={dataSource}
      />
    </Modal>
  );
};
export default ModalVoucher;
