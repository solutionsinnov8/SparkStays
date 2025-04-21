import React, { useContext, useState } from 'react';
import {
  Collapse,
  Form,
  Input,
  Button,
  Modal,
  message,
  Avatar,
  Card,
} from 'antd';
import {
  ExclamationCircleOutlined,
  UserOutlined,
  EditOutlined,
  DeleteOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons';
import { AuthContext } from '../../context/AuthContext';
import api from '../../api/axiosInstance';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const { Panel } = Collapse;
const { confirm } = Modal;

const Settings = () => {
  const { token } = useContext(AuthContext);
  const [form] = Form.useForm();
  const { updateUser, logout } = useContext(AuthContext)
  const navigate = useNavigate();
  const handleProfileUpdate = async (values) => {
    try {
      await api.put('/auth/update-profile', values, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success('Profile updated successfully');
      updateUser({ fullName: values.name });
    } catch (error) {
      console.error(error);
      toast.error('Failed to update profile');
    }
  };

  const handleDeleteAccount = () => {
    confirm({
      title: 'Are you sure you want to delete your account?',
      icon: <ExclamationCircleOutlined />,
      content: 'This action is irreversible and all your data will be lost.',
      okText: 'Yes, delete',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk: async () => {
        try {
          await api.delete('/auth/delete-account', {
            headers: { Authorization: `Bearer ${token}` },
          });
          toast.success('Account deleted successfully');
          logout(); 
          navigate('/login');
        } catch (error) {
          console.error(error);
          toast.error('Failed to delete account');
        }
      },
    });
  };

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <Card className="shadow-md rounded-xl">
          <div className="flex items-center gap-4 mb-6">
            <Avatar size={64} icon={<UserOutlined />} />
            <div>
              <h2 className="text-2xl font-semibold text-gray-800">Settings</h2>
              <p className="text-gray-500">Manage your account, profile and preferences</p>
            </div>
          </div>

          <Collapse
            accordion
            ghost
            expandIconPosition="end"
            className="custom-collapse"
          >
            {/* Profile Settings */}
            <Panel
              header={
                <span className="w-full flex justify-between items-center">
                  <span className='text-xl font-semibold'><EditOutlined className="mr-2 " /> Profile Settings</span>
                </span>
              }
              key="1"
            >
              <Form layout="vertical" form={form} onFinish={handleProfileUpdate}>
                <Form.Item
                  name="name"
                  label="Full Name"
                  rules={[{ required: true, message: 'Please enter your name' }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name="email"
                  label="Email"
                  rules={[{ required: true, message: 'Please enter your email' }]}
                >
                  <Input type="email" />
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit" block>
                    Update Profile
                  </Button>
                </Form.Item>
              </Form>
            </Panel>

            {/* Delete Account */}
            <Panel
              header={
                <span className="w-full flex justify-between items-center">
                  <span className='text-xl font-semibold'><DeleteOutlined className="mr-2" /> Delete Account</span>
                </span>
              }
              key="2"
            >
              <p className="text-red-600 font-medium mb-4">
                Deleting your account is permanent and cannot be undone.
              </p>
              <Button danger onClick={handleDeleteAccount}>
                Delete My Account
              </Button>
            </Panel>

            {/* FAQs */}
            <Panel
              header={
                <span className="w-full flex justify-between items-center">
                  <span className='text-xl font-semibold'><QuestionCircleOutlined className="mr-2" /> FAQs</span>
                </span>
              }
              key="3"
            >
              <Collapse ghost className="custom-collapse text-lg font-medium">
                <Panel header="What happens when I delete my account?" key="faq1">
                  <p className='ml-[25px] text-base font-normal'>You will permanently lose all your packages, bookings, and profile data.</p>
                </Panel>
                <Panel header="Can I update my email later?" key="faq2">
                  <p className='ml-[25px] text-base font-normal'>Yes, you can update your profile details anytime from the settings page.</p>
                </Panel>
                <Panel header="Is there any support if I face an issue?" key="faq3">
                  <p className='ml-[25px] text-base font-normal'>Yes, contact support@example.com and we’ll be happy to help.</p>
                </Panel>
              </Collapse>
            </Panel>
          </Collapse>

        </Card>
      </div>
    </div>
  );
};

export default Settings;
