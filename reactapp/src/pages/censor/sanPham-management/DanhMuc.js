import React, { useEffect, useState } from 'react';
import { Button, Divider, Radio, Form, Input, Select, Space, Table, Tag, Modal } from 'antd';
import { PlusCircleOutlined, RetweetOutlined } from "@ant-design/icons";
import { BookFilled } from "@ant-design/icons";
import { FilterFilled } from "@ant-design/icons";
import { BiSolidCategory } from 'react-icons/bi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BsFillEyeFill } from 'react-icons/bs';
import { DanhMucAPI } from '../api/SanPham/danhMuc.api';

export default function DanhMuc() {
  //Form
  const [selectedValue, setSelectedValue] = useState('1');
  const handleChange = (value) => {
    console.log(`Selected value: ${value}`);
    setSelectedValue(value);
  };
  const [componentSize, setComponentSize] = useState('default');
  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };
  const formItemLayout = {
    labelCol: {
      span: 4
    },
    wrapperCol: {
      span: 20
    },
  };
  //Ấn add 
  const [open, setOpen] = useState(false);
  const [bordered] = useState(false);
  const addDanhMuc = (value) => {
    const checkTrung = (code) => {
      return danhMuc.some(dm => dm.ten.trim().toLowerCase() === code.trim().toLowerCase());
    };
    if (!(checkTrung(value.ten))) {
      DanhMucAPI.create(value)
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
          loadDanhMuc();
          setOpen(false);
          form1.resetFields();
        })
    } else {
      toast.error('Danh mục đã tồn tại!', {
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
  const [openUpdate, setOpenUpdate] = useState(false);
  const [dmUpdate, setDmUpdate] = useState("");
  const [tenCheck, setTenCheck] = useState("");

  const showModal = async (idDetail) => {
    await DanhMucAPI.detailDM(idDetail)
      .then((res) => {
        setTenCheck(res.data.ten)
        setDmUpdate(res.data)
      })
      setOpenUpdate(true)
  };
  console.log(dmUpdate)
  const updateDanhMuc = () => {

    if (dmUpdate.ten != tenCheck) {
      const checkTrung = (ten) => {
        return danhMuc.some(dm =>
          dm.ten === ten
        );
      };

      if (checkTrung(dmUpdate.ten)) {
        toast.error('Danh mục trùng với danh mục khác !', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        return;
      }
    }
    DanhMucAPI.updateDM(dmUpdate.id, dmUpdate)
      .then((res) => {
        toast('✔️ Sửa thành công!', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setDmUpdate("");
        loadDanhMuc();
        setOpenUpdate(false);

      })
  }
  //Tìm kiếm
  const onChangeFilter = (changedValues, allValues) => {
    console.log("All values : ", allValues)
    timKiemCT(allValues);
  }
  const timKiemCT = (dataSearch) => {
    DanhMucAPI.search(dataSearch)
      .then((res) => {
        setDanhMucs(res.data);
      })
  }
  //Validate
  const validateDateDanhMuc = (_, value) => {
    const { getFieldValue } = form1;
    const tenDanhMuc = getFieldValue("ten");
  if (!tenDanhMuc.trim()) {
    return Promise.reject("Tên không được để trống");
  }
  const specialCharacterRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
  if (specialCharacterRegex.test(tenDanhMuc)) {
    return Promise.reject("Tên không được chứa ký tự đặc biệt");
  }
    return Promise.resolve();
  };
  //Table
  const [danhMuc, setDanhMucs] = useState([]);

  useEffect(() => {
    loadDanhMuc();
  }, []);

  const loadDanhMuc = () => {
    DanhMucAPI.getAll()
      .then((res) => {
        setDanhMucs(res.data.reverse());
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
          <a className='btn btn-danger' onClick={() => showModal(`${title}`) }><BsFillEyeFill className='mb-1' /></a>
        </Space>
      ),
    },
  ]
  const [form] = Form.useForm();
  const [form1] = Form.useForm();
  const [form2] = Form.useForm();
  return (
    <div className="container-fluid" style={{ borderRadius: 20 }}>
      <div className="container-fluid">
        <Divider orientation="center" color="#d0aa73">
          <h4 className="text-first pt-1 fw-bold">
            {" "}
            <BiSolidCategory size={35} /> Quản lý danh mục
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
            <div className="col-md-5">
              <Form.Item label="Tên & Mã" name="ten">
                <Input
                  className="rounded-pill border-warning"
                  placeholder="Nhập tên hoặc mã"
                />
              </Form.Item>
            </div>
            <div className="col-md-5">
              <Form.Item
                placeholder="Chọn trạng thái"
                label="Trạng Thái"
                name="trangThai"
              >
                <Select value={selectedValue} onChange={handleChange}>
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
                onClick={loadDanhMuc}
              >
                Làm mới
              </Button>
            </Form.Item>
          </Form>
        </div>
        <div className="text-end">
          <button onClick={() => setOpen(true)} class="button-them">
            <span class="text">
              <PlusCircleOutlined /> Thêm danh mục
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
            <BookFilled size={30} /> Danh sách danh mục
          </h5>
          <hr />
          <div className="ms-3">
            {/* Add danh mục */}

            <Modal
              title="Thêm Danh Mục"
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
                        form1.submit();
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
                initialValues={{
                  size: componentSize,
                }}
                onValuesChange={onFormLayoutChange}
                size={componentSize}
                style={{
                  maxWidth: 1000,
                }}
                onFinish={addDanhMuc}
                form={form1}
              >
                <Form.Item
                  label="Tên"
                  name="ten"
                  hasFeedback
                  rules={[{ validator: validateDateDanhMuc }]}
                >
                  <Input className="border"></Input>
                </Form.Item>
              </Form>
            </Modal>

            {/* Update danh mục */}
            <Modal
              title="Sửa Danh Mục"
              centered
              open={openUpdate}
              onOk={() => setOpenUpdate(false)}
              onCancel={() => {
                setOpenUpdate(false);
              }}
              footer={[
                <Button
                  onClick={() => {
                    setOpenUpdate(false);
                  }}
                >
                  Hủy
                </Button>,
                <Button
                  type="primary"
                  onClick={() => {
                    Modal.confirm({
                      centered: true,
                      title: "Thông báo",
                      content: "Bạn có chắc chắn muốn sửa không?",
                      onOk: () => {
                        form2.submit();
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
                style={{
                  maxWidth: 1000,
                }}
                onFinish={updateDanhMuc}
                form={form2}
              >
                <Form.Item
                  label={<b>Tên</b>}
                  hasFeedback
                  rules={[
                    { required: true, message: "Vui lòng không để trống tên!" },
                  ]}
                >
                  <Input
                    className="border"
                    value={dmUpdate.ten}
                    onChange={(e) =>
                      setDmUpdate({ ...dmUpdate, ten: e.target.value })
                    }
                  ></Input>
                </Form.Item>
                <Form.Item label={<b>Trạng thái </b>}>
                  <Radio.Group
                    onChange={(e) =>
                      setDmUpdate({ ...dmUpdate, trangThai: e.target.value })
                    }
                    value={dmUpdate.trangThai}
                  >
                    <Radio value={0}>Còn bán</Radio>
                    <Radio value={1}>Dừng bán</Radio>
                  </Radio.Group>
                </Form.Item>
              </Form>
            </Modal>
          </div>
          <div className="container-fluid mt-4">
            <Table
              align="center"
              dataSource={danhMuc}
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