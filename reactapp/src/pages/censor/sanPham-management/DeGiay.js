import React, { useEffect, useState } from 'react';
import {Button,Divider,Radio,Form,Input,Select,Space,Table,Tag,Modal} from 'antd';
import { PlusCircleOutlined, RetweetOutlined } from "@ant-design/icons";
import { BookFilled } from "@ant-design/icons";
import { FilterFilled } from "@ant-design/icons";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AiOutlineColumnHeight } from 'react-icons/ai';
import { BsFillEyeFill } from 'react-icons/bs';
import { DeGiayAPI } from '../api/SanPham/deGiay.api';
export default function DeGiay() {
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
  const [form] = Form.useForm();
  const [form1] = Form.useForm();
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
  const addDeGiay = (value) => {
    const checkTrung = (code) => {
      return deGiay.some(dg => dg.ten.trim().toLowerCase() === code.trim().toLowerCase());
    };
    if (!(checkTrung(value.ten))) {
      DeGiayAPI.create(value)
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
          loadDeGiay();
          setOpen(false);
          form.resetFields();
        })
    } else {
      toast.error('Đế giày đã tồn tại!', {
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
    const [dgUpdate, setDgUpdate] = useState("");
    const [tenCheck, setTenCheck] = useState("");
  
    const showModal = async (idDetail) => {
      await DeGiayAPI.detail(idDetail)
        .then((res) => {
          setTenCheck(res.data.ten)
          setDgUpdate(res.data)
        })
        setOpenUpdate(true)
    };
    console.log(dgUpdate)
    const updateDeGiay = () => {
  
      if (dgUpdate.ten != tenCheck) {
        const checkTrung = (ten) => {
          return deGiay.some(x =>
            x.ten === ten
          );
        };
  
        if (checkTrung(dgUpdate.ten)) {
          toast.error('Đế giày trùng với đế giày khác !', {
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
      DeGiayAPI.update(dgUpdate.id, dgUpdate)
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
          setDgUpdate("");
          loadDeGiay();
          setOpenUpdate(false);
        })
    }
  //Tìm kiếm
  const onChangeFilter = (changedValues, allValues) => {
    timKiemDG(allValues);
  }
  const timKiemDG = (dataSearch) => {
   DeGiayAPI.search(dataSearch)
      .then((res) => {
        setDeGiays(res.data);
      })
  }
  //Validate
  const validateDateDeGiay = (_, value) => {
    const { getFieldValue } = form;
    const tenDeGiay = getFieldValue("ten");
  
    if (!tenDeGiay.trim()) {
      return Promise.reject("Tên không được để trống");
    }
  
    const specialCharacterRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
    if (specialCharacterRegex.test(tenDeGiay)) {
      return Promise.reject("Tên không được chứa ký tự đặc biệt");
    }
  
    const deGiay = parseInt(value);
    if (isNaN(deGiay) || deGiay < 1 || deGiay > 10) {
      return Promise.reject("Đế giày phải là số nguyên từ 1 đến 10");
    }
  
    return Promise.resolve();
  };

  //Table
  const [deGiay, setDeGiays] = useState([]);

  useEffect(() => {
    loadDeGiay();
  }, []);

  const loadDeGiay = async () => {
    DeGiayAPI.getAll()
    .then((res)=>{
      setDeGiays(res.data.reverse()); 
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

  return (
    <div className="container-fluid" style={{ borderRadius: 20 }}>
      <div className="container-fluid">
        <Divider orientation="center" color="#d0aa73">
          <h4 className="text-first pt-1 fw-bold">
            {" "}
            <AiOutlineColumnHeight size={35} /> Quản lý đế giày
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
                onClick={loadDeGiay}
              >
                Làm mới
              </Button>
            </Form.Item>
          </Form>
        </div>
        <div className="text-end">
          <button onClick={() => setOpen(true)} class="button-them">
            <span class="text">
              <PlusCircleOutlined /> Thêm Đế Giày
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
            <BookFilled size={30} /> Danh sách đế giày
          </h5>
          <hr />
          <div className="ms-3">
            {/* Add dc */}
            <Modal
              title="Thêm Đế Giày"
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
                initialValues={{
                  size: componentSize,
                }}
                onValuesChange={onFormLayoutChange}
                size={componentSize}
                style={{
                  maxWidth: 1000,
                }}
                onFinish={addDeGiay}
                form={form}
              >
                <Form.Item
                  label="Tên"
                  name="ten"
                  hasFeedback
                  rules={[{ validator: validateDateDeGiay }]}
                >
                  <Input className="border" />
                </Form.Item>
              </Form>
            </Modal>
            {/* Update đế giày */}
            <Modal
              title="Sửa Đế Giày"
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
                onFinish={updateDeGiay}
                form={form1}
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
                    value={dgUpdate.ten}
                    onChange={(e) =>
                      setDgUpdate({ ...dgUpdate, ten: e.target.value })
                    }
                  ></Input>
                </Form.Item>
                <Form.Item label={<b>Trạng thái </b>}>
                  <Radio.Group
                    onChange={(e) =>
                      setDgUpdate({ ...dgUpdate, trangThai: e.target.value })
                    }
                    value={dgUpdate.trangThai}
                  >
                    <Radio value={0}>Còn bán</Radio>
                    <Radio value={1}>Dừng bán</Radio>
                  </Radio.Group>
                </Form.Item>
              </Form>
            </Modal>
          </div>
          <div className="container-fluid mt-4">
            <div>
              <Table
                className="text-center"
                dataSource={deGiay}
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