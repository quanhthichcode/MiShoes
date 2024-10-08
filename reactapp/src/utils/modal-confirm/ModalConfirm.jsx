import { Modal } from "antd";

const showConfirmationModal = (content, onConfirm) => {
  Modal.confirm({
    title: "Xác nhận",
    content: <span>{content}</span>,
    okText: "Đồng ý",
    cancelText: "Hủy",
    onOk: onConfirm,
  });
};

export default showConfirmationModal;
