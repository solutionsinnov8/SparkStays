import React from 'react';
import { Layout, Menu } from 'antd';
import {
  AppstoreOutlined,
  PlusOutlined,
  OrderedListOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { Link, Outlet } from 'react-router-dom';

const { Sider, Content } = Layout;

const EventPlannerLayout = () => {
  return (
    <div className="flex min-h-[calc(100vh-80px)] mt-[80px]">
      {/* Fixed Sidebar */}
      <div className="w-[250px] h-[calc(100vh-80px)] fixed top-[80px] left-0 bg-white shadow-md z-10">
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
      </div>

      {/* Scrollable Content Area */}
      <div className="ml-[250px] w-full p-6 bg-gray-50">
        <div className="bg-white p-6 shadow-md min-h-[calc(100vh-80px)]">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default EventPlannerLayout;
