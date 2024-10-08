import { Col, Form, Input, Select, Button, Modal } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AddressApi } from "../api/address/AddressApi";
import { ShipAPI } from "../api/ship/ship.api";
import LogoGHN from "../../../assets/images/LogoGHN.png";
import { SellAPI } from "../api/sell/sell.api";
import { toast } from "react-toastify";
import { UpdateVanChuyenToBill , UpdateTienVanChuyen} from "../../../store/reducer/Bill.reducer";
import { DeleteVanChuyenFromBill } from "../../../store/reducer/Bill.reducer";
import { dispatch } from "../../../store/redux/store";
import { useSelector } from "react-redux";
import Moment from "moment";

const DiaChiGiaoHang = ({
  money,
  money1,
  quantity,
  hoaDon,
  thongTinVanChuyen,
  thongTinKhachHang,
}) => {
  const [listProvince, setListProvince] = useState([]);
  const [listDistricts, setListDistricts] = useState([]);
  const [listWard, setListWard] = useState([]);
  const [districtID, setDistrictID] = useState("");
  const [proID,setProID] = useState("");
  const [hoaDon1, setHoaDon1] = useState("");
  const [wardCode, setWardCode] = useState("");
  const [timeShip, setTimeShip] = useState("");
  const [timeShip1, setTimeShip1] = useState("");
  const [moneyShip, setMoneyShip] = useState();
  const [moneyShip1, setMoneyShip1] = useState();
  const [form] = Form.useForm();
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  // Hàm để đóng modal
  const closeModal = () => {
    setIsOpen(false);
  };

  let indexThanhPhoDaCo = "";
  let thanhPhoDaCo = "";
  let diaChi1 = "";
  let indexQuanDaCo = "";
  let quanDaCo = "";
  let diaChi2 = "";
  let indexPhuongDaCo = "";
  let phuongDaCo = "";
  let diaChi3 = "";
  let indexSoNhaDaCo = "";
  let soNhaDaCo = "";

  let indexIDThanhPhoDaCo = "";
  let idThanhPhoDaCo = "";
  let ghiChu1 = "";
  let indexIDQuanDaCo = "";
  let idQuanDaCo = "";
  let ghiChu2 = "";
  let indexIDPhuongDaCo = "";
  let idPhuongDaCo = "";
  useEffect(() => {
    if (hoaDon === hoaDon1) {
      ShipAPI.fetchAllMoneyShip(districtID, wardCode, quantity).then((res) =>
        SellAPI.updateTienVanChuyen(
          hoaDon,
          roundToThousands(res.data.data.total)
        )

      );
      money(
         ShipAPI.fetchAllMoneyShip(districtID, wardCode, quantity).then(
          (res) => res.data.data.total
        )
      );
      setMoneyShip(
         ShipAPI.fetchAllMoneyShip(districtID, wardCode, quantity).then(
          (res) => res.data.data.total
        )
      );
      money1(0);
      setMoneyShip(0);
      ShipAPI.fetchAllMoneyShip(districtID, wardCode, quantity).then((res) =>
      dispatch(UpdateTienVanChuyen({key:hoaDon,tienVanChuyen:  roundToThousands(res.data.data.total)}))

    );

    } else {
      setHoaDon1(hoaDon);
    }
  }, [quantity]);

  useEffect(() => {
    loadDataProvince();
    setHoaDon1(hoaDon);
  }, []);

  useEffect(() => {
    if (thongTinVanChuyen) {
      console.log("Thông tin vận chuyển",thongTinVanChuyen)

      // lấy ra tên xã , huyện , thành phố trong địa chỉ
      indexThanhPhoDaCo = thongTinVanChuyen.diaChi.lastIndexOf("/");
      thanhPhoDaCo = thongTinVanChuyen.diaChi.substring(
        indexThanhPhoDaCo + 1,
        thongTinVanChuyen.diaChi.length
      );
      diaChi1 = thongTinVanChuyen.diaChi.substring(0, indexThanhPhoDaCo);
      indexQuanDaCo = diaChi1.lastIndexOf("/");
      quanDaCo = diaChi1.substring(indexQuanDaCo + 1, diaChi1.length);
      diaChi2 = diaChi1.substring(0, indexQuanDaCo);
      indexPhuongDaCo = diaChi2.lastIndexOf("/");
      phuongDaCo = diaChi2.substring(indexPhuongDaCo + 1, diaChi2.length);
      diaChi3 = diaChi2.substring(0, indexPhuongDaCo);
      indexSoNhaDaCo = diaChi3.lastIndexOf("/");
      soNhaDaCo = diaChi3.substring(indexSoNhaDaCo + 1, diaChi3.length);
      // lấy ra id của xã , huyện , thành phố có trong ghi chú
      if (thongTinVanChuyen.ghiChu !== null) {
      indexIDThanhPhoDaCo = thongTinVanChuyen.ghiChu.lastIndexOf("/");
      idThanhPhoDaCo = thongTinVanChuyen.ghiChu.substring(
        indexIDThanhPhoDaCo + 1,
        thongTinVanChuyen.ghiChu.length
      );
      ghiChu1 = thongTinVanChuyen.ghiChu.substring(0, indexIDThanhPhoDaCo);
      indexIDQuanDaCo = ghiChu1.lastIndexOf("/");
      idQuanDaCo = ghiChu1.substring(indexIDQuanDaCo + 1, ghiChu1.length);
      ghiChu2 = ghiChu1.substring(0, indexIDQuanDaCo);
      indexIDPhuongDaCo = ghiChu2.lastIndexOf("/");
      idPhuongDaCo = ghiChu2.substring(indexIDPhuongDaCo + 1, ghiChu2.length);

      }
      
      form.setFieldsValue({
        tenNguoiNhan: thongTinVanChuyen.tenNguoiNhan,
        soDienThoai: thongTinVanChuyen.soDienThoai,
        email: thongTinVanChuyen.email,
        tenThanhPho: thanhPhoDaCo,
        tenHuyen: quanDaCo,
        tenXa: phuongDaCo,
        soNha: soNhaDaCo,
      });
      console.log("Thông tin vận chuyển idHuyen", thongTinVanChuyen.idHuyen);
      console.log("Thông tin vận chuyển idXa", thongTinVanChuyen.idXa);
      if (thongTinVanChuyen.idHuyen && thongTinVanChuyen.idXa) {
        setTimeShip(thongTinVanChuyen.ngayDuKienNhan);
        money1(thongTinVanChuyen.tienVanChuyen);
        AddressApi.fetchAllProvinceDistricts(thongTinVanChuyen.idThanhPho).then(
          (res) => {
            setListDistricts(res.data.data);
          }
        );
        setDistrictID(thongTinVanChuyen.idHuyen);
        AddressApi.fetchAllProvinceWard(thongTinVanChuyen.idHuyen).then(
          (res) => {
            setListWard(res.data.data);
          }
        );
        setWardCode(thongTinVanChuyen.idXa);
        }
        else if (
          thongTinVanChuyen.ghiChu
        ) {
          // loadTimeAndMoney(
          //   thongTinVanChuyen.idHuyen,
          //   thongTinVanChuyen.idXa,
          //   quantity
          // );
          setTimeShip(thongTinVanChuyen.ngayDuKienNhan);
          money1(thongTinVanChuyen.tienVanChuyen);
          AddressApi.fetchAllProvinceDistricts(idThanhPhoDaCo).then(
            (res) => {
              setListDistricts(res.data.data);
            }
          );
          setDistrictID(idQuanDaCo);
          AddressApi.fetchAllProvinceWard(idQuanDaCo).then(
            (res) => {
              setListWard(res.data.data);
            }
          );
          setWardCode(idPhuongDaCo);
  
        } else {
          console.log("Tiền vận chuyển",thongTinVanChuyen.tienVanChuyen);
          money1(0);
        }
      

    } else if (thongTinKhachHang) {
      form.setFieldsValue({
        tenNguoiNhan: thongTinKhachHang.tenNguoiNhan,
        soDienThoai: thongTinKhachHang.soDienThoai,
        email: thongTinKhachHang.email,
        tenThanhPho: thongTinKhachHang.tenThanhPho,
        tenHuyen: thongTinKhachHang.tenHuyen,
        tenXa: thongTinKhachHang.tenXa,
        soNha: thongTinKhachHang.diaChi,
      });

      if (
        thongTinKhachHang.idHuyen !== null &&
        thongTinKhachHang.idXa !== null
      ) {
        loadTimeAndMoney(
          thongTinKhachHang.idHuyen,
          thongTinKhachHang.idXa,
          quantity
        );
        AddressApi.fetchAllProvinceDistricts(thongTinKhachHang.idThanhPho).then(
          (res) => {
            setListDistricts(res.data.data);
          }
        );
        setDistrictID(thongTinKhachHang.idHuyen);
        AddressApi.fetchAllProvinceWard(thongTinKhachHang.idHuyen).then(
          (res) => {
            setListWard(res.data.data);
          }
        );
        setWardCode(thongTinKhachHang.idXa);
      } else {
        money(0);
      }
    }
  }, [thongTinKhachHang, thongTinVanChuyen, hoaDon, quantity]);

  const loadDataProvince = () => {
    AddressApi.fetchAllProvince().then((res) => {
      setListProvince(res.data.data);
    });
  };
  const [componentSize, setComponentSize] = useState("default");
  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };
  const loadTimeAndMoney = async (districtID, valueWard, quantity) => {
    setTimeShip(
      await ShipAPI.fetchAllDayShip(districtID, valueWard).then(
        (res) => res.data.data.leadtime * 1000
      )
    );

    money(
      await ShipAPI.fetchAllMoneyShip(districtID, valueWard, quantity).then(
        (res) => res.data.data.total
      )
    );
    setMoneyShip(
      await ShipAPI.fetchAllMoneyShip(districtID, valueWard, quantity).then(
        (res) => res.data.data.total
      )
    );
  };

  const handleDelete = () => {
    dispatch(
      DeleteVanChuyenFromBill({
        key: hoaDon,
        id: hoaDon,
      })
    );
    SellAPI.deleteVanChuyen(hoaDon);
  };

  const handleSubmit = (value) => {
    console.log("Thành phố hiện tại",proID);
    console.log("Quận hiện tại",districtID);
    console.log("Phường hiện tại",wardCode);
    dispatch(
      UpdateVanChuyenToBill({
        key: hoaDon,
        //id: hoaDon,
        tenNguoiNhan: value.tenNguoiNhan,
        soDienThoai: value.soDienThoai,
        email: value.email,
        diaChi:
          value.soNha +
          "/" +
          value.tenXa +
          "/" +
          value.tenHuyen +
          "/" +
          value.tenThanhPho,
        ngayDuKienNhan:
          timeShip !== timeShip1 && !timeShip1 ? timeShip : timeShip1,
        tienVanChuyen:roundToThousands(
          moneyShip !== moneyShip1 && !moneyShip1 ? moneyShip : moneyShip1),
        idHuyen: districtID,
        idXa: wardCode,
        idThanhPho: proID,
      })
    );
    const data = [
      {
        tenNguoiNhan: value.tenNguoiNhan,
        soDienThoai: value.soDienThoai,
        email: value.email,
        diaChi:
          value.soNha +
          "/" +
          value.tenXa +
          "/" +
          value.tenHuyen +
          "/" +
          value.tenThanhPho,
        ngayDuKienNhan:
          timeShip !== timeShip1 && !timeShip1 ? timeShip : timeShip1,
        tienVanChuyen: roundToThousands(
          moneyShip !== moneyShip1 && !moneyShip1 ? moneyShip : moneyShip1
        ),
        ghiChu: wardCode+"/"+districtID+"/"+proID,
      },
    ];
    SellAPI.updateVanChuyen(hoaDon, data[0]);
  };

  const handleProvinceChange = (value, valueProvince) => {
    form.setFieldsValue({ provinceId: valueProvince.valueProvince });
    setProID(valueProvince.valueProvince);
    AddressApi.fetchAllProvinceDistricts(valueProvince.valueProvince).then(
      (res) => {
        setListDistricts(res.data.data);
      }
    );
  };

  const handleDistrictChange = (value, valueDistrict) => {
    form.setFieldsValue({ toDistrictId: valueDistrict.valueDistrict });
    setDistrictID(valueDistrict.valueDistrict);
    AddressApi.fetchAllProvinceWard(valueDistrict.valueDistrict).then((res) => {
      setListWard(res.data.data);
    });
  };

  const handleWardChange = async (value, valueWard) => {
    form.setFieldsValue({ wardCode: valueWard.valueWard });
    setWardCode(valueWard.valueWard);

    // setTimeShip(
    //   await ShipAPI.fetchAllDayShip(districtID, valueWard.valueWard).then(
    //     (res) => res.data.data.leadtime * 1000
    //   )
    // );
    if (districtID && valueWard) {
      setTimeShip1(
        await ShipAPI.fetchAllDayShip(districtID, valueWard.valueWard).then(
          (res) => res.data.data.leadtime * 1000
        )
      );
      money1(
        await ShipAPI.fetchAllMoneyShip(
          districtID,
          valueWard.valueWard,
          quantity
        ).then((res) => res.data.data.total)
      );
      console.log(
        await ShipAPI.fetchAllDayShip(districtID, valueWard.valueWard).then(
          (res) => res.data.data.leadtime * 1000
        )
      );
      setMoneyShip1(
        await ShipAPI.fetchAllMoneyShip(
          districtID,
          valueWard.valueWard,
          quantity
        ).then((res) => res.data.data.total)
      );
    }
  };

  const changeQuantity = async () => {};

  return (
    <>
      <Form
        className="mt-4"
        onFinish={handleSubmit}
        initialValues={{
          size: componentSize,
        }}
        layout="horizontal"
        onValuesChange={onFormLayoutChange}
        size={componentSize}
        form={form}
      >
        {/* //<Col span={25} style={{ marginRight: "20px" }}> */}
        <Form.Item
          name="tenNguoiNhan"
          label="Tên người nhận"
          tooltip="Họ tên đầy đủ của bạn là gì?"
          hasFeedback
          rules={[
            {
              required: true,
              message: "Vui lòng hãy nhập họ và tên.",
              whitespace: true,
            },
            {
              pattern: /^[A-Za-zÀ-Ỹà-ỹ\s]+$/,
              message: "Họ và tên chỉ được phép chứa chữ cái.",
            },
          ]}
        >
          <Input
            placeholder="Nhập họ và tên"
            style={{ width: 400, marginLeft: 50 }}
          />
        </Form.Item>
        <Form.Item
          name="soDienThoai"
          tooltip="Số điện thoại của bạn là gì?"
          label="Số điện thoại"
          hasFeedback
          rules={[
            {
              required: true,
              message: "Vui lòng hãy nhập số điện thoại.",
              whitespace: true,
            },
            {
              pattern: /^0\d{9}$/,
              message: "Vui lòng nhập số điện thoại hợp lệ.",
            },
          ]}
        >
          <Input
            placeholder="Nhập số điện thoại"
            style={{ width: 400, marginLeft: 64 }}
            // defaultValue={
            //   thongTinVanChuyen ? thongTinVanChuyen.soDienThoai : ""
            // }
          />
        </Form.Item>
        <Form.Item
          name="email"
          tooltip="Email của bạn là gì?"
          label="Email"
          hasFeedback
          rules={[
            {
              required: true,
              message: "Vui lòng hãy nhập email.",
              whitespace: true,
            },
            {
              type: "email",
              message: "Vui lòng nhập đúng định dạng email.",
            },
          ]}
        >
          <Input
            placeholder="Nhập email"
            style={{ width: 400, marginLeft: 110 }}
            // defaultValue={thongTinVanChuyen ? thongTinVanChuyen.email : ""}
          />
        </Form.Item>

        <Form.Item
          name="tenThanhPho"
          label="Tên thành phố"
          tooltip="Tỉnh/Thành phố của bạn là gì?"
          hasFeedback
          rules={[
            {
              required: true,
              message: "Vui lòng hãy chọn Tỉnh/Thành phố.",
              whitespace: true,
            },
          ]}
        >
          <Select
            // defaultValue={thanhPhoDaCo ? thanhPhoDaCo : null}
            style={{ width: 400, marginLeft: 56 }}
            onChange={handleProvinceChange}
          >
            <Select.Option>--Chọn Tỉnh/Thành phố--</Select.Option>
            {listProvince?.map((item) => {
              return (
                <Select.Option
                  key={item.ProvinceID}
                  value={item.ProvinceName}
                  valueProvince={item.ProvinceID}
                >
                  {item.ProvinceName}
                </Select.Option>
              );
            })}
          </Select>
        </Form.Item>
        <Form.Item
          name="tenHuyen"
          label="Tên Quận / Huyện"
          tooltip="Quận/Huyện của bạn là gì?"
          hasFeedback
          rules={[
            {
              required: true,
              message: "Vui lòng hãy chọn Quận/Huyện.",
              whitespace: true,
            },
          ]}
          // labelCol={{ span: 9 }}
          // wrapperCol={{ span: 15 }}
        >
          <Select
            style={{ width: 400, marginLeft: 34 }}
            // defaultValue={quanDaCo ? quanDaCo : null}
            onChange={handleDistrictChange}
          >
            <Select.Option>--Chọn Quận/Huyện--</Select.Option>
            {listDistricts?.map((item) => {
              return (
                <Select.Option
                  key={item.DistrictID}
                  value={item.DistrictName}
                  valueDistrict={item.DistrictID}
                >
                  {item.DistrictName}
                </Select.Option>
              );
            })}
          </Select>
        </Form.Item>
        <Form.Item
          name="tenXa"
          label="Tên Phường / Xã"
          tooltip="Xã/Phường của bạn là gì?"
          hasFeedback
          rules={[
            {
              required: true,
              message: "Vui lòng hãy chọn Xã/Phường.",
              whitespace: true,
            },
          ]}
        >
          <Select
            // defaultValue={phuongDaCo ? phuongDaCo : null}
            onChange={handleWardChange}
            style={{ width: 400, marginLeft: 44 }}
          >
            <Select.Option>--Chọn Xã/Phường--</Select.Option>
            {listWard?.map((item) => {
              return (
                <Select.Option
                  key={item.WardCode}
                  value={item.WardName}
                  valueWard={item.WardCode}
                >
                  {item.DistrictName}
                </Select.Option>
              );
            })}
          </Select>
        </Form.Item>

        <Form.Item
          name="soNha"
          label="Số nhà"
          tooltip="Số nhà của bạn là gì?"
          hasFeedback
          rules={[
            {
              required: true,
              message: "Vui lòng hãy nhập số nhà.",
              whitespace: true,
            },
          ]}
          // labelCol={{ span: 9 }}
          // wrapperCol={{ span: 15 }}
        >
          <Input
            placeholder="Nhập số nhà "
            //   onChange={handleSoNhaChange}
            style={{ width: 400, marginLeft: 98 }}
            // defaultValue={soNhaDaCo ? soNhaDaCo : null}
          />
        </Form.Item>
        {/* // </Col> */}

        <div className="row mt-2">
          <div className="col-md-4">
            <img src={LogoGHN} style={{ width: 200, height: 70 }}></img>
          </div>
          <div className="col-md-6 align-self-center fw-bold">
            <p>
              Thời gian giao hàng dự kiến :{" "}
              <span className="text-danger">
                {/* {new Date(timeShip * 1).getDate()} / {new Date(timeShip * 1).getUTCMonth()} / {new Date(timeShip * 1).getFullYear()} */}
                {thongTinVanChuyen && timeShip1 === timeShip
                  ? Moment(thongTinVanChuyen.ngayDuKienNhan).format(
                      "DD/MM/yyyy"
                    )
                  : timeShip1
                  ? // ? new Date(timeShip1).toLocaleDateString()
                    // : timeShip
                    // ? new Date(timeShip).toLocaleDateString()
                    Moment(timeShip1).format("DD/MM/yyyy")
                  : timeShip
                  ? Moment(timeShip).format("DD/MM/yyyy")
                  : "dd/MM/yyyy"}
              </span>
            </p>
          </div>
        </div>

        {!thongTinVanChuyen ? (
          <Button
            className=" mt-2 me-5 bg-success float-end bg-black"
            type="primary"
            onClick={() => {
              Modal.confirm({
                title: "Thông báo",
                content: "Bạn có chắc chắn muốn đặt hàng không?",
                onOk: () => {
                  form.submit();

                  toast("✔️ Cập nhật hóa đơn thành công!", {
                    position: "top-right",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                  });
                  //form.finish();
                },
                footer: (_, { OkBtn, CancelBtn }) => (
                  <>
                    <CancelBtn />
                    <OkBtn />
                  </>
                ),
              });
            }}
          >
            Xác nhận đặt hàng
          </Button>
        ) : (
          <div>
            <Button
              className=" mt-2 me-5 bg-success float-end bg-black"
              type="primary"
              onClick={() => {
                Modal.confirm({
                  title: "Thông báo",
                  content:
                    "Bạn có chắc chắn muốn sửa thông tin đặt hàng không?",
                  onOk: () => {
                    form.submit();
                    toast("✔️ Cập nhật hóa đơn thành công!", {
                      position: "top-right",
                      autoClose: 1000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                      theme: "light",
                    });
                    // form.finish();
                  },
                  footer: (_, { OkBtn, CancelBtn }) => (
                    <>
                      <CancelBtn />
                      <OkBtn />
                    </>
                  ),
                });
              }}
            >
              Sửa thông tin đặt hàng
            </Button>
            <Button
              className=" mt-2 me-5 bg-danger float-end bg-danger"
              type="primary"
              onClick={() => {
                Modal.confirm({
                  title: "Thông báo",
                  content:
                    "Bạn có chắc chắn muốn xóa thông tin đặt hàng không?",
                  onOk: () => {
                    handleDelete();
                    closeModal();
                    toast("✔️ Cập nhật hóa đơn thành công!", {
                      position: "top-right",
                      autoClose: 1000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                      theme: "light",
                    });
                    // form.finish();
                  },
                  footer: (_, { OkBtn, CancelBtn }) => (
                    <>
                      <CancelBtn />
                      <OkBtn />
                    </>
                  ),
                });
              }}
            >
              Hủy thông tin đặt hàng
            </Button>
          </div>
        )}
      </Form>
    </>
  );
};
export default DiaChiGiaoHang;

function roundToThousands(amount) {
  return Math.round(amount / 100) * 100;
}
