import React from 'react';
import { Layout, Menu } from 'antd';
import {
  AppstoreOutlined,
  PlusOutlined,
  OrderedListOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { Link, Outlet } from 'react-router-dom'; // use Outlet to render nested routes

const { Sider, Content } = Layout;

const EventPlannerLayout = () => {
  return (
    <Layout style={{ marginTop: "80px" }} className='min-h-[calc(100vh-80px)]'>
      {/* Sidebar */}
      <Sider width={250} className="bg-white shadow-md">
        <div className="text-center py-6 font-bold text-xl text-blue-600">
          Event Planner
        </div>

        <Menu mode="inline" defaultSelectedKeys={['dashboard']}>
          <Menu.Item key="dashboard" icon={<AppstoreOutlined />}>
            <Link to="/event-planner/dashboard">Dashboard</Link>
          </Menu.Item>
          <Menu.Item key="create" icon={<PlusOutlined />}>
            <Link to="/event-planner/create-package">Create Package</Link>
          </Menu.Item>
          <Menu.Item key="packages" icon={<OrderedListOutlined />}>
            <Link to="/event-planner/packages">My Packages</Link>
          </Menu.Item>
          <Menu.Item key="settings" icon={<SettingOutlined />}>
            <Link to="/event-planner/settings">Settings</Link>
          </Menu.Item>
        </Menu>
      </Sider>

      {/* Content Area */}
      <Layout>
        <Content style={{ margin: '24px 16px', padding: 24, background: '#fff' }}>
          <Outlet /> {/* This will render the nested route content */}
        </Content>
      </Layout>
    </Layout>
  );
};

export default EventPlannerLayout;
