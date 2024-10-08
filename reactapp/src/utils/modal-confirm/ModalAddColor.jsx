import {
  Button,
  Card,
  Col,
  ColorPicker,
  Form,
  Input,
  Modal,
  Row,
  message,
} from "antd";
import { useAppDispatch } from "../../app/hook";
import showConfirmationModal from "./ModalConfirm";
import convert from "color-convert";
import { ColorAPI } from "../../apis/color/color.api";
import { CreateColor } from "../../app/reducer/Color.reducer";

export default function ShowModalAddColor({ visible, onCancel }) {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();

  const getColorName = (colorCode) => {
    const hexCode = colorCode.replace("#", "").toUpperCase();
    const rgb = convert.hex.rgb(hexCode);
    const colorName = convert.rgb.keyword(rgb);

    if (colorName === null) {
      return "Unknown";
    } else {
      return colorName;
    }
  };

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        const category = {
          ...values,
          status: "DANG_SU_DUNG",
        };
        ColorAPI.create(category).then((res) => {
          console.log(res.data.data);
          dispatch(CreateColor(res.data.data));
          message.success("Thêm thành công");
          form.resetFields();
          onCancel();
        });
      })
      .catch((error) => {});
  };

  return (
    <>
      <Modal
        title="Thêm màu sắc"
        open={visible}
        onOk={handleOk}
        onCancel={onCancel}
        width={700}
        footer={[
          <Button key="cancel" onClick={onCancel}>
            Hủy
          </Button>,
          <Button
            key="submit"
            type="primary"
            onClick={() =>
              showConfirmationModal("Bạn có chắc muốn thêm ?", handleOk)
            }
          >
            Thêm
          </Button>,
        ]}
      >
        <Form form={form}>
          <Row justify={"space-between"}>
            <Col span={8}>
              <Form.Item name="code">
                <Input
                  type="color"
                  style={{ height: "250px" }}
                  onChange={(e) => {
                    const maMau = e.target.value;
                    const tenMau = getColorName(maMau);
                    form.setFieldsValue({ name: tenMau });
                  }}
                />
              </Form.Item>
            </Col>
            <Col span={15}>
              <Card style={{ height: "250px" }}>
                <Form.Item
                  label="Mã màu sắc"
                  name="code"
                  rules={[
                    { required: true, message: "Vui lòng nhập mã màu" },
                    { max: 50, message: "Tên thương hiệu tối đa 50 ký tự" },
                  ]}
                >
                  <Input
                    readOnly
                    placeholder="Tên mã màu"
                    style={{ height: "40px", textAlign: "center" }}
                  />
                </Form.Item>
                <Form.Item
                  label="Tên màu sắc"
                  name="name"
                  rules={[
                    { required: true, message: "Vui lòng nhập tên màu" },
                    { max: 50, message: "Tên thương hiệu tối đa 50 ký tự" },
                  ]}
                >
                  <Input
                    readOnly
                    placeholder="Tên màu sắc"
                    style={{ height: "40px", textAlign: "center" }}
                  />
                </Form.Item>
                <Form.Item
                  name="status"
                  label="Trạng thái"
                  labelCol={{ span: 7 }}
                  wrapperCol={{ span: 17 }}
                  initialValue="Đang sử dụng"
                >
                  <Input readOnly style={{ textAlign: "center" }} />
                </Form.Item>
              </Card>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
}
