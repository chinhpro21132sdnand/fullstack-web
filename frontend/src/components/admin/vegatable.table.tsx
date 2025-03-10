"use client";
import { UserOutlined } from "@ant-design/icons";
import { Button, Card, Table, Tag, Input, Select } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PaginationComponent from "../common/pagination/page";
import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getAllvegetale } from "@/reduce/vegatable/apiRequest";
import IsActiveStart from "@/types/dataStart";
import PopUpModals from "../vegetable/addVegetable/page";
const { Column } = Table;

const UserTable = () => {
  const [dataSource, setDataSource] = useState([]);
  const [PageSize, getPagesize] = useState(10);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [total, getTotal] = useState(1);
  const [currentPage, getCurrent] = useState(1);
  const [name, setName] = useState("");
  const [isActive, setIsActive] = useState("");
  const dispatch = useDispatch();

  const fetchData = async () => {
    try {
      console.log(isActive, "isActive");
      const params = [
        name.toString() && `name=${name}`,
        isActive.toString() && `active=${isActive}`,
        PageSize && `page=${PageSize}`,
        currentPage && `current=${currentPage}`,
      ].filter(Boolean);
      const url = params.length > 0 ? `?${params.join("&")}` : "";
      const res = await getAllvegetale(dispatch, url);
      getPagesize(res?.data.pagination?.pageSize);
      getTotal(res?.data.pagination?.totalItems);
      setDataSource(res?.data.data);
    } catch (error) {
      console.error("Fetch failed:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    fetchData();
  }, [currentPage, name, isActive]);
  const handlePageChange = useCallback((page: number, pageSize: number) => {
    console.log(pageSize);
    getCurrent(page);
    getTotal(total);
  }, []);

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: "20px",
        }}
      >
        <Button type="primary" onClick={() => setIsModalOpen(true)}>
          Thêm mới
        </Button>
        <PopUpModals
          isModalOpen={isModalOpen}
          title="thêm mới rau củ quả"
          onClose={() => setIsModalOpen(false)}
        ></PopUpModals>
      </div>
      <Card>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 20,
          }}
        >
          <h3>Quản lý rau củ quả</h3>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Input
              size="large"
              style={{ width: "40%" }}
              placeholder="Nhập để tìm kiếm"
              prefix={<UserOutlined />}
              onChange={(e) => setName(e.target.value)}
            />
            <Select
              size="large"
              style={{ width: "40%", marginLeft: "20px" }}
              onChange={(e) => setIsActive(e)}
              options={IsActiveStart}
              placeholder="Lọc theo..."
            />
          </div>
        </div>
        <Table
          dataSource={dataSource}
          scroll={{ y: 310 }}
          pagination={false}
          className="custom-scroll-table"
        >
          <Column title="STT" dataIndex="stt" key="stt" />
          <Column title="TÊN SẢN PHẨM" dataIndex="name" key="name" />
          <Column title="MÔ TẢ" dataIndex="content" key="content" />
          <Column title="GIÁ SẢN PHẨM" dataIndex="price" key="price" />
          <Column title="SỐ LƯỢNG TỒN KHO" dataIndex="number" key="number" />
          <Column title="ĐƠN VỊ" dataIndex="unit" key="unit" />
          <Column title="NGÀY NHẬP" dataIndex="dateto" key="dateto" />
          <Column title="NGÀY HẾT HẠN" dataIndex="datefrom" key="datefrom" />
          <Column title="NHÀ CUNG CẤP" dataIndex="supplier" key="supplier" />
          <Column
            title="Active"
            dataIndex="isActive"
            key="tags"
            render={(isActive) => (
              <Tag color={isActive === 1 ? "green" : "red"}>
                {isActive === 1 ? "Hoạt động" : "Khóa"}
              </Tag>
            )}
          />
          <Column
            title="Chức năng"
            dataIndex="fn"
            key="Chức năng"
            render={() => <FontAwesomeIcon icon="ellipsis-vertical" />}
          />
        </Table>
        <PaginationComponent
          PageSize={PageSize}
          currentPage={currentPage}
          total={total}
          onChange={handlePageChange}
        />
      </Card>
    </>
  );
};

export default UserTable;
