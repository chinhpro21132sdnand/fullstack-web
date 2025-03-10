import React from "react";
import { Modal } from "antd";

interface UserCardProps {
  isModalOpen: boolean;
  onClose: () => void;
  handleOk: () => void;
  title: string;
  children?: React.ReactNode;
}
const PopUpModal: React.FC<UserCardProps> = ({
  isModalOpen,
  onClose,
  handleOk,
  title,
  children,
}) => {
  return (
    <>
      <Modal
        title={
          <span style={{ fontSize: "28px", fontWeight: "bold" }}>{title}</span>
        }
        width={700}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={onClose}
        className="custom-modal"
      >
        {children}
      </Modal>
    </>
  );
};

export default PopUpModal;
