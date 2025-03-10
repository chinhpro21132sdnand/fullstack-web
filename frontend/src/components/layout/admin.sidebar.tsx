"use client";
import Layout from "antd/es/layout";
import Menu from "antd/es/menu";
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import React, { useContext } from "react";
import { AdminContext } from "@/library/admin.context";
import type { MenuProps } from "antd";
import Link from "next/link";

type MenuItem = Required<MenuProps>["items"][number];
const AdminSideBar = () => {
  const { Sider } = Layout;
  const { collapseMenu } = useContext(AdminContext)!;

  const items: MenuItem[] = [
    {
      key: "grp",
      label: "BASE VIEW CMS NEXTJS",
      type: "group",
      children: [
        {
          key: "dashboard",
          label: <Link href={"/dashboard"}>Dashboard</Link>,
          icon: <AppstoreOutlined />,
        },
        {
          key: "Users",
          label: <Link href={"/dashboard/user"}>Manage Users</Link>,
          icon: <TeamOutlined />,
        },
        {
          key: "Quản lý danh mục hàng hóa",
          label: "Quản lý danh mục hàng hóa",
          icon: <MailOutlined />,
          children: [
            {
              key: "Quản lý rau củ quả",
              label: (
                <Link href={"/dashboard/vegatable"}>Quản lý rau củ quả</Link>
              ),
            },
            {
              key: "Quản lý các loại đồ uống",
              label: "Quản lý các loại đồ uống",
              type: "group",
              children: [
                { key: "3", label: "Quản lý đồ uống có ga" },
                { key: "4", label: "Quản lý đồ uống có cồn" },
                { key: "5", label: "Quản lý các loại cà phê" },
              ],
            },
            {
              key: "Quản lý các loại đồ ăn liền",
              label: "Quản lý các loại đồ ăn liền",
              type: "group",
              children: [
                { key: "3", label: "Quản lý các loại mì" },
                { key: "4", label: "Quản lý các loại đồ ăn vặt" },
                { key: "8", label: "Quản lý các loại thức ăn đặc biệt" },
              ],
            },
            {
              key: "Quản lý  thuốc lá",
              label: "Quản lý  thuốc lá",
              type: "group",
            },
          ],
        },
        {
          key: "Quản lý tài khoản",
          label: "Quản lý tài khoản",
          icon: <AppstoreOutlined />,
          children: [
            { key: "5", label: "Option 5" },
            { key: "6", label: "Option 6" },
            {
              key: "sub3",
              label: "Submenu",
              children: [
                { key: "7", label: "Option 7" },
                { key: "8", label: "Option 8" },
              ],
            },
          ],
        },
        {
          type: "divider",
        },
        {
          key: "Quản lý crypto",
          label: "Quản lý crypto",
          icon: <SettingOutlined />,
          children: [
            { key: "9", label: "Option 9" },
            { key: "10", label: "Option 10" },
            { key: "11", label: "Option 11" },
            { key: "12", label: "Option 12" },
          ],
        },
      ],
    },
  ];

  return (
    <Sider
      className={`sider ${collapseMenu} ? "collapsed" : "expanded"`}
      collapsed={collapseMenu}
      style={{
        minWidth: "300px !important",
      }}
    >
      <Menu
        mode="inline"
        defaultSelectedKeys={["dashboard"]}
        items={items}
        style={{
          height: "100vh",
          overflowY: "scroll",
          paddingTop: "20px",
          backgroundColor: "#000000",
          boxShadow: " 0px 4px 10px rgba(0, 0, 0, 0.5)",
        }}
        className="MenuItem"
      />
    </Sider>
  );
};

export default AdminSideBar;
