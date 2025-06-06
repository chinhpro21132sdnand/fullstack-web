import React, { useCallback, useEffect, useState } from "react";
import { Col, Input, Row } from "antd";
import PopUpModal from "@/components/common/popup/page";
import { useDispatch } from "react-redux";
import {
  detailVegetable,
  updateVegetable,
} from "@/reduce/vegatable/apiRequest";
import toastMessage from "@/components/common/toastMessage/page";
interface UserCardProps {
  id: string;
  isModalOpen: boolean;
  onClose: () => void;
  title: string;
}
const { TextArea } = Input;

const UpdateVegetable: React.FC<UserCardProps> = ({
  id,
  isModalOpen,
  onClose,
  title,
}) => {
  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [number, setNumber] = useState<number>(0);
  const [unit, setUnit] = useState<string>("");
  const [supplier, setSupplier] = useState<string>("");
  const [content, setContent] = useState("");
  const [isActive, setIsActive] = useState("");
  const dispatch = useDispatch();

  const detailData = useCallback(async () => {
    try {
      const data = await detailVegetable(dispatch, id);
      if (data?.data?.data) {
        const data = await detailVegetable(dispatch, id);
        setName(data?.data.data.name);
        setPrice(data?.data.data.price);
        setNumber(data?.data.data.number);
        setUnit(data?.data.data.unit);
        setSupplier(data?.data.data.supplier);
        setContent(data?.data.data.content);
        setIsActive(data?.data.data.isActive);
      }
    } catch (err) {
      console.error("Error fetching vegetable details:", err);
    }
  }, [dispatch, id]);
  useEffect(() => {
    if (isModalOpen && id) {
      resetData();
      detailData();
    }
  }, [isModalOpen, id, detailData]);
  const fetchData = async () => {
    try {
      const payload = {
        name: name,
        price: price,
        number: number,
        unit: unit,
        supplier: supplier,
        content: content,
        isActive: isActive,
      };
      const res = await updateVegetable(dispatch, payload, id);
      if (res?.status.toString().startsWith("2")) {
        toastMessage(true);
        onClose();
      } else {
        toastMessage(false);
        onClose();
      }
    } catch (error) {
      console.error("Fetch failed:", error);
    }
  };
  const resetData = () => {
    setContent("");
    setSupplier("");
    setUnit("");
    setNumber(0);
    setPrice(0);
    setName("");
  };
  return (
    <>
      <PopUpModal
        isModalOpen={isModalOpen}
        onClose={onClose}
        title={title}
        handleOk={fetchData}
      >
        <Row gutter={16}>
          <Col span={12} style={{ marginTop: 16 }}>
            <p style={{ marginBottom: 10 }}>Tên rau củ quả</p>
            <Input value={name} onChange={(e) => setName(e.target.value)} />
          </Col>
          <Col span={12} style={{ marginTop: 16 }}>
            <p style={{ marginBottom: 10 }}>giá sản phẩm </p>
            <Input
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
            />
          </Col>
          <Col span={12} style={{ marginTop: 16 }}>
            <p style={{ marginBottom: 10 }}>số lượng</p>
            <Input
              value={number}
              onChange={(e) => setNumber(Number(e.target.value))}
            />
          </Col>
          <Col span={12} style={{ marginTop: 16 }}>
            <p style={{ marginBottom: 10 }}>đơn vị</p>
            <Input value={unit} onChange={(e) => setUnit(e.target.value)} />
          </Col>
          <Col span={24} style={{ marginTop: 16 }}>
            <p style={{ marginBottom: 10 }}>Nhà cung cấp</p>
            <Input
              value={supplier}
              onChange={(e) => setSupplier(e.target.value)}
            />
          </Col>
          <Col span={24} style={{ marginTop: 16 }}>
            <p style={{ marginBottom: 10 }}>Nội dung</p>
            <TextArea
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </Col>
        </Row>
      </PopUpModal>
    </>
  );
};

export default UpdateVegetable;
