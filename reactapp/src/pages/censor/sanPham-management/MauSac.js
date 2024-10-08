import React, { useEffect, useState } from 'react';
import { Button, Divider, Form, Input, Select, Space, Table, Tag, Modal } from 'antd';
import { PlusCircleOutlined, RetweetOutlined } from "@ant-design/icons";
import { BookFilled } from "@ant-design/icons";
import { FilterFilled } from "@ant-design/icons";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BsFillEyeFill } from 'react-icons/bs';
import { IoColorPalette } from 'react-icons/io5';
import convert from 'color-convert';
import './SanPham.css'
import { MauSacAPI } from '../api/SanPham/mauSac.api';
export default function MauSac() {
  //Form
  const [selectedValue, setSelectedValue] = useState('1');
  const handleChange = (value) => {
    console.log(`Selected value: ${value}`);
    setSelectedValue(value);
  };
  const formItemLayout = {
    labelCol: {
      span: 4
    },
    wrapperCol: {
      span: 20
    },
  };

  const [ten, setTenMaus] = useState('');
  const doiMau = (e) => {
    const ma = e.target.value;
    const hexCode = ma.replace("#", "").toUpperCase();
    const rgb = convert.hex.rgb(hexCode);
    const colorName = convert.rgb.keyword(rgb);
    if (colorName === null) {
      console.log("hehe")
    } else {
      console.log(colorName);
      setTenMaus(colorName)
    }
  };
  console.log('Tên màu : ' + ten);
  const [componentSize, setComponentSize] = useState('default');
  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };
  const [form] = Form.useForm();
  //Tìm kiếm
  const onChangeFilter = (changedValues, allValues) => {
    console.log("All values : ", allValues)
    timKiemCT(allValues);
  }
  const timKiemCT = (dataSearch) => {
    MauSacAPI.search(dataSearch)
      .then((res) => {
        setMauSacs(res.data);
      })
  }
  //Ấn Add
  const [open, setOpen] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [bordered] = useState(false);
  const addMauSac = (value) => {
    const chekTrung = (code) => {
      return mauSac.some(color => color.ma === code);
    };
    if (!chekTrung(value.ma)) {
      console.log(value.ma);
      const hexCode = value.ma.replace("#", "").toUpperCase();
      const rgb = convert.hex.rgb(hexCode);
      const colorName = convert.rgb.keyword(rgb);
      value.ten = colorName;
      MauSacAPI.create(value)
        .then((res) => {
          toast('✔️ Thêm thành công!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          loadMauSac();
          setOpen(false);
          form.resetFields();
        })
    } else {
      console.log('hehe');
      toast.error('Mã màu đã tồn tại!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }
  //Update
  const [msUpdate, setmsUpdates] = useState({});
  const showModal = async (id) => {
    MauSacAPI.detail.then((res) => {
      setmsUpdates(res.data)
      setOpenUpdate(true);
    }); 
  };
  // const showModal = async (id) => {
  //   setOpenUpdate(true);
  //   MauSacAPI.detail(id)
  //   .then((res)=>{
  //       // setTenCheck(res.data.ten)
  //       setmsUpdates(res.data)
  //   })

  // };
  //Table
  const [mauSac, setMauSacs] = useState([]);

  useEffect(() => {
    loadMauSac();
  }, []);

  const loadMauSac = () => {
    MauSacAPI.getAll()
      .then((res) => {
        setMauSacs(res.data);
      })
  };

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
      title: "Mã",
      dataIndex: "ma",
      center: "true",
      sorter: (a, b) => a.ma - b.ma,
    }, ,
    {
      title: "Tên",
      dataIndex: "ten",
    },
    {
      title: "Màu",
      dataIndex: "ma",
      key: "Ma",
      render: (text, record) => {
        return <>
          <div style={{
            backgroundColor: `${record.ma}`,
            borderRadius: 6,
            width: 60,
            height: 25,
          }} className='custom-div'></div >
        </>;
      }
    },
    {
      title: "Trạng thái",
      dataIndex: "trangThai",
      key: "trangThai",
      render: (trang_thai) => (
        <>
          {trang_thai === 0 ? (
            <Tag color="green">
              Còn bán
            </Tag>
          ) : (
            <Tag color="red">
              Dừng bán
            </Tag>
          )}
        </>
      ),
    },
    {
      title: "Hành động",
      key: "action",
      dataIndex: "id",
      render: (title) => (
        <Space size="middle">
          <a className='btn btn-danger' onClick={() => showModal(`${title}`)}><BsFillEyeFill className='mb-1'  /></a>
        </Space>
      ),
    },
  ]

  return (
    <div className="container-fluid" style={{ borderRadius: 20 }}>
      <div className="container-fluid">
        <Divider orientation="center" color="#d0aa73">
          <h4 className="text-first pt-1 fw-bold">
            {" "}
            <IoColorPalette size={35} /> Quản lý màu sắc
          </h4>
        </Divider>
        <div
          className=" bg-light m-2 p-3 pt-2"
          style={{
            border: "1px solid #ddd", // Border color
            boxShadow: "0 3px 8px rgba(0, 0, 0, 0.1)", // Box shadow
            borderRadius: "8px",
          }}
        >
          <h5>
            <FilterFilled size={30} /> Bộ lọc
          </h5>
          <hr />
          <Form
            className="row"
            labelCol={{
              span: 10,
            }}
            wrapperCol={{
              span: 20,
            }}
            layout="horizontal"
            // initialValues={{
            //   size: componentSize,
            // }}
            onValuesChange={onChangeFilter}
            size={componentSize}
            style={{
              maxWidth: 1400,
            }}
          >
            <div className="col-md-5">
              <Form.Item label="Tên & Mã" name="ten">
                <Input
                  className="rounded-pill border-warning"
                  placeholder="Nhập tên hoặc mã"
                />
              </Form.Item>
            </div>
            <div className="col-md-5">
              <Form.Item label="Trạng Thái" name="trangThai">
                <Select
                  placeholder="Chọn trạng thái"
                  value={selectedValue}
                  onChange={handleChange}
                >
                  <Select.Option value="0">Còn Bán</Select.Option>
                  <Select.Option value="1">Dừng Bán</Select.Option>
                </Select>
              </Form.Item>
            </div>
            <Form.Item className="text-center" style={{ paddingLeft: 200 }}>
              <Button
                type="primary"
                htmlType="reset"
                icon={<RetweetOutlined />}
                onClick={loadMauSac}
              >
                Làm mới
              </Button>
            </Form.Item>
          </Form>
        </div>

        <div className="text-end">
          <button onClick={() => setOpen(true)} class="button-them">
            <span class="text">
              <PlusCircleOutlined /> Thêm màu sắc{" "}
            </span>
          </button>
        </div>
        <div
          className=" bg-light m-2 p-3 pt-2"
          style={{
            border: "1px solid #ddd", // Border color
            boxShadow: "0 3px 8px rgba(0, 0, 0, 0.1)", // Box shadow
            borderRadius: "8px",
          }}
        >
          <h5>
            <BookFilled size={30} /> Danh sách màu sắc
          </h5>
          <hr />
          <div className="ms-3">
            {/* Add ms */}
            <Modal
              title="Thêm Màu Sắc"
              centered
              open={open}
              onOk={() => setOpen(false)}
              onCancel={() => setOpen(false)}
              footer={[
                <Button onClick={() => setOpen(false)}>Hủy</Button>,
                <Button
                  type="primary"
                  onClick={() => {
                    Modal.confirm({
                      centered: true,
                      title: "Thông báo",
                      content: "Bạn có chắc chắn muốn thêm không?",
                      onOk: () => {
                        form.submit();
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
                  Thêm
                </Button>,
              ]}
              width={500}
            >
              <Form
                {...formItemLayout}
                initialValues={{
                  size: componentSize,
                }}
                onValuesChange={onFormLayoutChange}
                size={componentSize}
                onFinish={addMauSac}
                layout="vertical"
                form={form}
              >
                <div className="row">
                  <div className="col-md-6">
                    <label>
                      <b>Màu sắc :</b>
                    </label>
                    <Form.Item
                      name="ma"
                      hasFeedback
                      rules={[{ required: true, message: "Vui lòng chọn màu" }]}
                    >
                      <Input
                        className="card-mau"
                        type="color"
                        onChange={doiMau}
                      />
                    </Form.Item>
                  </div>
                  <div className="col-md-6 mt-5">
                    <label>
                      <b>Mã màu :</b>
                    </label>
                    <Form.Item
                      name="ma"
                      hasFeedback
                      rules={[{ required: true, message: "" }]}
                    >
                      <Input readOnly="true" className="border" type="text" />
                    </Form.Item>
                    <label>
                      <b>Tên màu :</b>
                    </label>
                    <Form.Item
                      hasFeedback
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng không để trống tên!",
                        },
                      ]}
                    >
                      <Input type="text" value={ten} />
                    </Form.Item>
                  </div>
                </div>
              </Form>
            </Modal>
            {/* Update ms */}
            <Modal
              title="Sửa Màu Sắc"
              centered
              open={openUpdate}
              onOk={() => setOpenUpdate(false)}
              onCancel={() => setOpenUpdate(false)}
              footer={[
                <Button onClick={() => setOpenUpdate(false)}>Hủy</Button>,
                <Button
                  type="primary"
                  onClick={() => {
                    Modal.confirm({
                      centered: true,
                      title: "Thông báo",
                      content: "Bạn có chắc chắn muốn thêm không?",
                      onOk: () => {
                        form.submit();
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
                  Sửa
                </Button>,
              ]}
              width={500}
            >
              <Form
                {...formItemLayout}
                initialValues={{
                  size: componentSize,
                }}
                onValuesChange={onFormLayoutChange}
                size={componentSize}
                onFinish={addMauSac}
                form={form}
              >
                <Form.Item
                  label="Màu"
                  name="ma"
                  hasFeedback
                  rules={[{ required: true, message: "Vui lòng chọn màu" }]}
                >
                  <Input
                    className="border"
                    type="color"
                    value={msUpdate.ma}
                    onChange={doiMau}
                  />
                </Form.Item>
                <Form.Item
                  label=" Mã"
                  name="ma"
                  hasFeedback
                  rules={[{ required: true, message: "" }]}
                >
                  <Input
                    readOnly="true"
                    className="border"
                    value={msUpdate.ma}
                    type="text"
                  />
                </Form.Item>
                <Form.Item
                  label="Tên"
                  hasFeedback
                  rules={[
                    { required: true, message: "Vui lòng không để trống tên!" },
                  ]}
                >
                  <Input
                    type="text"
                    value={msUpdate.ten}
                    onChange={(e) => setmsUpdates({ ...msUpdate, ten: e })}
                  />
                </Form.Item>
                <Form.Item label={<b>Trạng thái </b>}>
                  <Select
                    defaultValue={
                      msUpdate.trangThai == 0 ? "Còn bán" : "Dừng bán"
                    }
                    onChange={(e) =>
                      setmsUpdates({ ...msUpdate, trangThai: e })
                    }
                  >
                    <Select.Option value="0">Còn Bán</Select.Option>
                    <Select.Option value="1">Dừng Bán</Select.Option>
                  </Select>
                </Form.Item>
              </Form>
            </Modal>
          </div>
          <div className="container-fluid mt-4">
            <div>
              <Table
                className="text-center"
                dataSource={mauSac}
                columns={columns}
                pagination={{
                  showQuickJumper: true,
                  defaultPageSize: 5,
                  position: ["bottomCenter"],
                  defaultCurrent: 1,
                  total: 100,
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {/* Same as */}
      <ToastContainer />
    </div>
  );
}