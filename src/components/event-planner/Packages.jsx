import React, { useContext, useEffect, useState } from 'react';
import {
  Card,
  Row,
  Col,
  Button,
  Modal,
  Drawer,
  Form,
  Input,
  InputNumber,
  Select,
  message,
} from 'antd';
import {
  EditOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import { AuthContext } from '../../context/AuthContext';
import api from '../../api/axiosInstance';

const { Meta } = Card;
const { confirm } = Modal;




const Packages = () => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [form] = Form.useForm();
  const [packages, setPackages]=useState([])
  const { token } = useContext(AuthContext); 
  

  const showEditDrawer = (pkg) => {
    setSelectedPackage(pkg);
    form.setFieldsValue(pkg);
    setDrawerVisible(true);
  };

  const handleUpdate = (values) => {
    setPackages((prev) =>
      prev.map((item) =>
        item._id === selectedPackage._id ? { ...item, ...values } : item
      )
    );
    message.success('Package updated successfully!');
    setDrawerVisible(false);
  };

  const showDeleteConfirm = (pkgId) => {
    confirm({
      title: 'Are you sure delete this package?',
      icon: <ExclamationCircleOutlined />,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        setPackages((prev) => prev.filter((item) => item._id !== pkgId));
        message.success('Package deleted successfully!');
      },
    });
  };
  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const res = await api.get('/packages', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }); 
        setPackages(res.data);
      } catch (error) {
        console.error('Failed to fetch packages:', error);
        message.error('Failed to load packages');
      }
    };
  
    fetchPackages();
  }, []);
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        My Packages
      </h1>

      <Row gutter={[24, 24]}>
        {packages.map((pkg) => (
          <Col xs={24} sm={12} md={8} key={pkg._id}>
            <Card
              hoverable
              className="rounded-xl shadow"
              actions={[
                <EditOutlined
                  key="edit"
                  onClick={() => showEditDrawer(pkg)}
                />,
                <DeleteOutlined
                  key="delete"
                  onClick={() => showDeleteConfirm(pkg._id)}
                />,
              ]}
              cover={
                <img
                  alt={pkg.name}
                  src={`https://source.unsplash.com/400x300/?event,${pkg.type}`}
                  className="h-48 object-cover rounded-t-xl"
                />
              }
            >
              <Meta
                title={pkg.name}
                description={
                  <>
                    <p className="mt-1 text-gray-600">{pkg.description}</p>
                    <p className="mt-2 text-sm text-gray-500">
                      <strong>Type:</strong> {pkg.type} |{' '}
                      <strong>Duration:</strong> {pkg.duration} days
                    </p>
                    <p className="text-indigo-600 font-bold text-lg mt-1">
                      ₹{pkg.price}
                    </p>
                  </>
                }
              />
            </Card>
          </Col>
        ))}
      </Row>

      <Drawer
        title="Edit Package"
        width={400}
        onClose={() => setDrawerVisible(false)}
        visible={drawerVisible}
        destroyOnClose
      >
        <Form layout="vertical" onFinish={handleUpdate} form={form}>
          <Form.Item name="name" label="Package Name" rules={[{ required: true }]}>
            <Input placeholder="Enter package name" />
          </Form.Item>
          <Form.Item name="type" label="Type" rules={[{ required: true }]}>
            <Select>
              <Select.Option value="stay">Stay</Select.Option>
              <Select.Option value="tour">Tour</Select.Option>
              <Select.Option value="event">Event</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item name="price" label="Price (₹)" rules={[{ required: true }]}>
            <InputNumber className="w-full" min={0} />
          </Form.Item>
          <Form.Item name="duration" label="Duration (days)" rules={[{ required: true }]}>
            <InputNumber className="w-full" min={1} />
          </Form.Item>
          <Form.Item name="description" label="Description" rules={[{ required: true }]}>
            <Input.TextArea rows={4} />
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
