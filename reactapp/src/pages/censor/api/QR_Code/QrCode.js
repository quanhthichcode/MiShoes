import React, { useState } from "react";
import { Button, Modal } from "antd";
import { useZxing } from "react-zxing";

export default function QRScannerModal({
    visible,
    onCancel,
    onQRResult,
    scannerModalKey,
}) {
    const [result, setResult] = useState("");

    const RenderVideo = () => {
        const { ref } = useZxing({
            onDecodeResult(result) {
                setResult(result.getText());
                onQRResult(result.getText(), scannerModalKey);
            },
            paused: !visible,
        });
        return (
            <video
                ref={ref}
                style={{ width: "100%", height: "auto", borderRadius: "10px" }}
            />
        );
    };

    return (
        <Modal
            title="Quét mã QR"
            visible={visible}
            onOk={onCancel}
            onCancel={onCancel}
            footer={[
                <Button key="cancel" onClick={onCancel}>
                    Hủy
                </Button>,
            ]}
            width={400}
        >
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <RenderVideo />
                <p>
                    <span>Last result:</span>
                    <span>{result}</span>
                </p>
            </div>
        </Modal>
    );
}