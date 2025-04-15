import React, { useContext, useState } from 'react';
import { Form, Input, InputNumber, Button, Select, Card } from 'antd';
import api from '../../api/axiosInstance';
import { AuthContext } from '../../context/AuthContext';


const { TextArea } = Input;
const { Option } = Select;

const CreatePackage = () => {
  const [form] = Form.useForm();
  const { user } = useContext(AuthContext);
  const eventPlannerName = user.fullName;
  const [previewData, setPreviewData] = useState({
    name: '',
    type: '',
    price: null,
    duration: null,
    description: '',
  });

  const onFinish = async (values) => {
    try {
      const packageData = {
        ...values,
        planner: eventPlannerName,
      };

      const res = await api.post('/packages', packageData);
      console.log('Package Created:', res.data);

      form.resetFields();
      setPreviewData({
        name: '',
        type: '',
        price: null,
        duration: null,
        description: '',
      });
    } catch (error) {
      console.error('Error creating package:', error);
    }
  };

  const onValuesChange = (_, allValues) => {
    setPreviewData(allValues);
  };

  const getTimeUnit = (type) => {
    if (type === 'event') return 'hrs';
    if (type === 'stay') return 'days';
    return '';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fef6e4] to-[#e0f7fa] p-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Form Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Create a New Package</h2>
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            onValuesChange={onValuesChange}
          >
            <Form.Item
              label="Package Name"
              name="name"
              rules={[{ required: true, message: 'Please enter package name' }]}
            >
              <Input placeholder="e.g. Wedding Deluxe" />
            </Form.Item>

            <Form.Item
              label="Package Type"
              name="type"
              rules={[{ required: true, message: 'Please select a package type' }]}
            >
              <Select placeholder="Choose type">
                <Option value="event">Event</Option>
                <Option value="stay">Stay</Option>
              </Select>
            </Form.Item>

            <Form.Item
              label="Price (USD)"
              name="price"
              rules={[{ required: true, message: 'Please enter the price' }]}
            >
              <InputNumber
                min={0}
                style={{ width: '100%' }}
                prefix="$"
                placeholder="e.g. 500"
              />
            </Form.Item>

            <Form.Item
              label={`Duration (${getTimeUnit(previewData.type) || 'Hours/Days'})`}
              name="duration"
              rules={[{ required: true, message: 'Please enter the duration' }]}
            >
              <InputNumber min={1} style={{ width: '100%' }} placeholder="e.g. 6" />
            </Form.Item>

            <Form.Item
              label="Description"
              name="description"
              rules={[{ required: true, message: 'Please add a short description' }]}
            >
              <TextArea rows={4} placeholder="Includes stage, lights, food, etc." />
            </Form.Item>

            <Button type="primary" htmlType="submit" className="w-full bg-blue-600 hover:bg-blue-700">
              Create Package
            </Button>
          </Form>
        </div>

        {/* Live Preview Section */}
        <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-[#e0c3fc] to-[#8ec5fc] p-8 shadow-xl">
          <div className="absolute inset-0 bg-white/30 backdrop-blur-md rounded-2xl" />
          <div className="relative z-10">
            <h2 className="text-2xl font-bold text-white mb-4">Live Preview</h2>
            <Card
              bordered={false}
              className="rounded-xl bg-white/80 shadow-xl backdrop-blur-md"
            >
              <h3 className="text-xl font-bold mb-2 text-gray-800">
                {previewData.name || 'Package Name'}
              </h3>
              <p className="text-sm text-gray-500 capitalize">
                {previewData.type ? `Type: ${previewData.type}` : 'Package type will appear here'}
              </p>
              <p className="text-lg font-semibold text-blue-600 mt-2">
                {previewData.price ? `$${previewData.price}` : '$0'} —{' '}
                {previewData.duration ? `${previewData.duration} ${getTimeUnit(previewData.type)}` : 'Duration'}
              </p>
              <p className="mt-4 text-gray-700">
                {previewData.description || 'Description will appear here'}
              </p>
              <div className="mt-6 text-sm text-gray-500 italic">
                Created by: {eventPlannerName}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePackage;
