import React, { useContext, useEffect, useState } from 'react';
import {
  Table,
  Button,
  Drawer,
  Form,
  Input,
  InputNumber,
  Select,
  Modal,
  Tag,
} from 'antd';
import {
  EditOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import { AuthContext } from '../../context/AuthContext';
import api from '../../api/axiosInstance';
import { toast } from 'react-toastify';

const { confirm } = Modal;

const Packages = () => {
  const [packages, setPackages] = useState([]);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [form] = Form.useForm();
  const { token } = useContext(AuthContext);

  const fetchPackages = async () => {
    try {
      const res = await api.get('/packages/planner-packages', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPackages(res.data);
    } catch (err) {
      console.error(err);
      toast.error('Failed to load packages');
    }
  };

  useEffect(() => {
    fetchPackages();
  }, []);

  const showEditDrawer = (pkg) => {
    setSelectedPackage(pkg);
    form.setFieldsValue(pkg);
    setDrawerVisible(true);
  };

  const handleUpdate = async (values) => {
    try {
      await api.put(`/packages/${selectedPackage._id}`, values, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success('Package updated!');
      setDrawerVisible(false);
      fetchPackages();
    } catch (error) {
      console.error(error);
      toast.error('Update failed!');
    }
  };

  const showDeleteConfirm = (pkgId) => {
    confirm({
      title: 'Are you sure you want to delete this package?',
      icon: <ExclamationCircleOutlined />,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      centered: true,
      onOk: async () => {
        try {
          await api.delete(`/packages/${pkgId}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          toast.success('Package deleted!');
          fetchPackages();
        } catch (error) {
          console.error(error);
          toast.error('Failed to delete package!');
        }
      },
    });
  };

  const columns = [
    {
      title: 'Package Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <strong>{text}</strong>,
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      render: (type) => (
        <Tag color={type === 'stay' ? 'geekblue' : type === 'tour' ? 'green' : 'volcano'}>
          {type.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: 'Duration',
      key: 'duration',
      render: (_, record) => {
        const label =
          record.type === 'event'
            ? `${record.duration} hours`
            : `${record.duration} days`;
        return <span className="text-indigo-600 font-semibold">{label}</span>;
      },
    },
    {
      title: 'Price ($)',
      dataIndex: 'price',
      key: 'price',
      render: (price) => <span className="text-indigo-600 font-semibold">${price}</span>,
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      ellipsis: true,
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <div className="flex gap-2">
          <Button
            icon={<EditOutlined />}
            type="primary"
            size="small"
            onClick={() => showEditDrawer(record)}
          />
          <Button
            icon={<DeleteOutlined />}
            type="primary"
            danger
            size="small"
            onClick={() => showDeleteConfirm(record._id)}
          />
        </div>
      ),
    },
  ];

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        My Packages
      </h1>

      <Table
        columns={columns}
        dataSource={packages}
        rowKey="_id"
        bordered
        pagination={{ pageSize: 5 }}
        className="shadow-lg rounded-xl overflow-hidden"
      />

      <Drawer
        title="Edit Package"
        width={400}
        onClose={() => setDrawerVisible(false)}
        visible={drawerVisible}
        destroyOnClose
      >
        <Form layout="vertical" form={form} onFinish={handleUpdate}>
          <Form.Item name="name" label="Package Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="type" label="Type" rules={[{ required: true }]}>
            <Select>
              <Select.Option value="stay">Stay</Select.Option>
              <Select.Option value="event">Event</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item name="price" label="Price ($)" rules={[{ required: true }]}>
            <InputNumber className="w-full" min={0} />
          </Form.Item>
          <Form.Item name="duration" label="Duration" rules={[{ required: true }]}>
            <InputNumber className="w-full" min={1} />
          </Form.Item>
          <Form.Item name="description" label="Description" rules={[{ required: true }]}>
            <Input.TextArea rows={3} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Update Package
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    </div>
  );
};

export default Packages;
