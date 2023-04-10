import React from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
  AppstoreOutlined,
  LikeOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Breadcrumb, Layout, Menu, theme } from "antd";
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

interface BreadcrumbItem {
  title: string;
  content: string;
  href?: string;
}

const AdminLayout: React.FC = () => {
  let items: BreadcrumbItem[] = [
    { title: "Home", content: "Home", href: "/products" },
    { title: "Categories", content: "Categories", href: "/admin/categories" },
    { title: "Products", content: "Product", href: "/admin/products" },
  ];
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout>
      <Header className="header">
        <div className="logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["2"]}
          // items={items1}
        >
          {items.map((_, index) => {
            const key = index + 2;
            return (
              <Menu.Item key={key}>
                <Link
                  className="link"
                  to={`http://localhost:5173${_.href}`}
                >{`${_?.title}`}</Link>
              </Menu.Item>
            );
          })}
        </Menu>
      </Header>
      <Layout>
        <Sider width={200} style={{ background: colorBgContainer }}>
          <Menu
            mode="inline"
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            style={{ height: "100%", borderRight: 0 }}
            // items={items2}
          >
            <Menu.Item key="1" icon={<UserOutlined />}>
              Users
            </Menu.Item>
            <SubMenu key="sub0" icon={<LikeOutlined />} title="Product">
              <Menu.Item key="2">
                <Link className="link" to="/admin/products">
                  Management
                </Link>
              </Menu.Item>
              <Menu.Item key="3">
                <Link className="link" to="/admin/products/add">
                  Add Product
                </Link>
              </Menu.Item>
            </SubMenu>
            <SubMenu key="sub1" icon={<AppstoreOutlined />} title="Category">
              <Menu.Item key="4">
                <Link className="link" to="/admin/categories">
                  Management
                </Link>
              </Menu.Item>
              <Menu.Item key="5">
                <Link className="link" to="/admin/categories/add">
                  Add Category
                </Link>
              </Menu.Item>
              <SubMenu key="sub1-2" title="Categories">
                <Menu.Item key="6">Option 5</Menu.Item>
                <Menu.Item key="7">Option 6</Menu.Item>
              </SubMenu>
            </SubMenu>
          </Menu>
        </Sider>
        <Layout style={{ padding: "0 24px 24px" }}>
          <Breadcrumb items={items} />;
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 580,
              background: colorBgContainer,
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
  // return <div>
  //
  // </div>;
};

export default AdminLayout;
