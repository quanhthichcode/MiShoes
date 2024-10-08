import {
  Button,
  Modal,
  Space,
  Table,
  Input,
  Form
} from "antd";
import { useEffect, useState } from "react";
import { Image } from "cloudinary-react";
import { EyeOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { AddClient, GetClient } from "../../../store/reducer/Client.reducer";
import {
  GetBill,
  UpdateKHToBill,
  UpdateNullClient,
} from "../../../store/reducer/Bill.reducer";
import {SellAPI} from "../../censor/api/sell/sell.api";
import ModalAddKhachHang from "./ModalAddKhachHang";
import { KhachHangAPI } from "../api/user/khachHang.api";
import { NguoiDungAPI } from "../api/nguoiDung/nguoiDungAPI";
// import { KhachHangAPI } from "../api/user/khachHang.api";

const ModalKhachHang = ({setOpenKhachHang,openKhachHang,activeKey,onVoucher}) => {
  // const { openKhachHang, setOpenKhachHang } = props;
  // const activeKey = props.activeKey;
  const [openModalAddKhachHang, setopenModalAddKhachHang] = useState(false);
  const handleCloseAddKhachHang = () => {
    setopenModalAddKhachHang(false);
  };
  useEffect(() => {
    loadKhachHang();
  }, []);

  const dispatch = useDispatch();
  const client = useSelector(GetClient);
  const bill = useSelector(GetBill);
  const idKH = activeKey
    ? bill.filter((item) => item.key === activeKey)[0]?.nguoiDung
    : "";
  const handleClickAddClient = async (record) => {
    console.log("recorrd id",record);

    NguoiDungAPI.getDiaChiByIDND(record.idND).then((res) => {
      console.log("res",res.data);
      console.log("huyen id",res.data.idHuyen);
      console.log("xa id",res.data.idXa);
      dispatch(
        UpdateKHToBill({
          key: activeKey,
          nguoiDung: record.idND,
          tenNguoiDung: record.tenND,
          gtNguoiDung: record.gioiTinh,
          diemNguoiDung: record.diem,
          idHuyen: res.data.idHuyen,
          idXa: res.data.idXa,
        })
      );
    })

    await SellAPI.getVoucherWithIDKH(record.idND).then((res) => onVoucher(res));
   await NguoiDungAPI.getDiaChiByIDND(record.idND).then((resData) => console.log(resData.data));
   SellAPI.updateKH(activeKey, record.idND);
    setOpenKhachHang(false);
  };

  //Tìm khách hàng
  const [listKH, setListKH] = useState([]);
  const [form] = Form.useForm();
    const [componentSize, setComponentSize] = useState("default");
  const onChangeFilter = (changedValues, allValues) => {
    console.log("All values : ", allValues);
    timKiemKH(allValues);
  };
  const timKiemKH = (dataSearch) => {
    KhachHangAPI.timKiem(dataSearch).then((res) => {
       setListKH(res.data);
      console.log(res.data,"2222222222222");
    });
  };

  const handleClickRemoveClient = (record) => {
    dispatch(UpdateNullClient({ key: activeKey }));
    SellAPI.updateReturnKhachLe(activeKey);
    onVoucher("");
    setOpenKhachHang(false);
  };

  const loadKhachHang = async () => {
    const result = await SellAPI.getAllCustomers();
    result.data.map((i) =>
      dispatch(
        AddClient({
          idND: i.idND,
          maND: i.maND,
          tenND: i.tenND,
          cccd: i.cccd,
          email: i.email,
          gioiTinh: i.gioiTinh,
          ngaySinh: new Date(i.ngaySinh * 1).toDateString("DD-MM-YYYY"),
          anh: i.anh,
          sdt: i.sdt,
          diem: i.diem,
          trangThai: i.trangThai,
        })
      )
    );
    setListKH(result.data);
  };
  const handleClose = () => {
    setOpenKhachHang(false);
  };
  const columns = [
    {
      title: "STT",
      dataIndex: "idND",
      key: "idND",
      render: (idND, record, index) => {
        ++index;
        return index;
      },
      showSorterTooltip: false,
    },
    {
      title: "Ảnh",
      dataIndex: "anh",
      key: "link",
      center: "true",
      render: (link) => {
        return (
          <>
            <Image
              cloudName="dtetgawxc"
              publicId={link}
              width="100"
              height="140"
              crop="scale"
              href={link}
            />
          </>
        );
      },
    },
    {
      title: "Tên khách hàng",
      dataIndex: "tenND",
      center: "true",
      sorter: (a, b) => a.ma - b.ma,
    },

    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Số điện thoại",
      dataIndex: "sdt",
    },
    {
      title: "Điểm",
      dataIndex: "diem",
    },

    {
      title: "Hành động",
      render: (record) => (
        <Space size="middle">
          <>
            {idKH !== null && idKH === record.idND ? (
              <button
                type="primary"
                shape="round"
                className="btn btn-warning text-white"
                icon={<EyeOutlined />}
                onClick={() => handleClickRemoveClient(record)}
              >
                Bỏ khách hàng
              </button>
            ) : (
              <button
                type="primary"
                shape="round"
                className="btn btn-success text-white"
                icon={<EyeOutlined />}
                onClick={() => handleClickAddClient(record)}
              >
                Chọn khách hàng
              </button>
            )}
          </>
        </Space>
      ),
    },
  ];

  return (
    <Modal
      title="Khách hàng"
      open={openKhachHang}
      onOk={handleClose}
      onCancel={handleClose}
      height={300}
      width={1200}
      // zIndex={10000}
      style={{ top: 50 }}
    >
      <div className="container">
        <div className="row mt-4">
          <Form
            className="row col-md-12"
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 14,
            }}
            layout="horizontal"
            initialValues={{
              size: componentSize,
            }}
            onValuesChange={onChangeFilter}
            size={componentSize}
            style={{
              maxWidth: 1400,
            }}
            form={form}
          >
            <div className="col-md-10">
              <Form.Item label="Tìm kiếm" name="ten">
                <Input
                  className="rounded-pill border-warning"
                  placeholder="Nhập mã hoặc tên hoặc sđt ..."
                />
              </Form.Item>
            </div>
            <div className="col-md-2">
              <Form.Item className="text-end ">
                <Button type="primary" htmlType="reset" onClick={loadKhachHang}>
                  Làm mới
                </Button>
              </Form.Item>
            </div>
          </Form>

          <div className="d-flex justify-content-end">
            <Button
              className=" col-md-1 ms-5  bg-success float-end bg-primary"
              type="primary"
              onClick={() => setopenModalAddKhachHang(true)}
            >
              Thêm
            </Button>
          </div>

          <ModalAddKhachHang
            openModalAddKhachHang={openModalAddKhachHang}
            setopenModalAddKhachHang={setopenModalAddKhachHang}
            loadKhachHang={loadKhachHang}
            onOk={handleCloseAddKhachHang}
            onCancel={handleCloseAddKhachHang}
          />
        </div>
        <Table
          style={{ justifyContent: "right" }}
          className="text-center mt-4"
          dataSource={listKH}
          columns={columns}
          pagination={{
            showQuickJumper: true,
            defaultPageSize: 2,
            position: ["bottomCenter"],
            defaultCurrent: 1,
            total: client.length,
          }}
        />
      </div>
      {/* <div id="modal-root"></div> */}
    </Modal>
  );
};
export default ModalKhachHang;
