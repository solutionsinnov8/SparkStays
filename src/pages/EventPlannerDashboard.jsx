import React, { useEffect, useState } from 'react';
import { Card, Statistic, Table, Tag, List, Avatar, Button, Spin, message } from 'antd';
import {
  DollarOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  UserOutlined,
  CloseCircleOutlined,
} from '@ant-design/icons';
import { Bar } from '@ant-design/plots';
import api from '../api/axiosInstance';

const EventPlannerDashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    try {
      const response = await api.get('/bookings');
      setBookings(response.data);
    } catch (error) {
      message.error('Failed to fetch bookings');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
    const interval = setInterval(fetchBookings, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleUpdateStatus = async (id, status) => {
    try {
      await api.put(`/bookings/${id}`, { status });
      message.success(`Booking ${status}`);
      fetchBookings(); // Refetch updated data
    } catch (err) {
      message.error('Failed to update booking');
    }
  };

  // Dynamic Stats
  const totalBookings = bookings.length;
  const pending = bookings.filter((b) => b.status === 'pending').length;
  const accepted = bookings.filter((b) => b.status === 'accepted').length;
  const rejected = bookings.filter((b) => b.status === 'rejected').length;
  const totalRevenue = bookings
    .filter((b) => b.status === 'accepted')
    .reduce((acc, curr) => acc + parseFloat(curr.priceRange || 0), 0);

  const analytics = [
    { title: 'Total Bookings', value: totalBookings, icon: <UserOutlined className="text-2xl text-blue-500" /> },
    { title: 'Pending', value: pending, icon: <ClockCircleOutlined className="text-2xl text-yellow-500" /> },
    { title: 'Accepted', value: accepted, icon: <CheckCircleOutlined className="text-2xl text-green-500" /> },
    { title: 'Rejected',value: rejected, icon: <CloseCircleOutlined className="text-2xl text-red-500" />},
    { title: 'Revenue', value: `$${totalRevenue}`, icon: <DollarOutlined className="text-2xl text-purple-500" /> },
    
  ];

  const columns = [
    { title: 'Guest', dataIndex: 'guestName', key: 'guestName' },
    { title: 'Type', dataIndex: 'packageType', key: 'packageType' },
    {
      title: 'Date',
      key: 'date',
      render: (record) => {
        const rawDate = record.checkInDate || record.desiredDate || record.date;
        return rawDate ? new Date(rawDate).toISOString().split('T')[0] : 'No Date';
      }
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        const color = status === 'accepted' ? 'green' : status === 'rejected' ? 'red' : 'orange';
        return <Tag color={color}>{status.toUpperCase()}</Tag>;
      },
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) =>
        record.status === 'pending' ? (
          <div className="flex gap-2">
            <Button type="primary" onClick={() => handleUpdateStatus(record._id, 'accepted')}>
              Accept
            </Button>
            <Button danger onClick={() => handleUpdateStatus(record._id, 'rejected')}>
              Reject
            </Button>
          </div>
        ) : (
          <Tag color={record.status === 'accepted' ? 'green' : 'red'}>{record.status}</Tag>
        ),
    },
  ];

  const config = {
    data: [
      { type: 'Accepted', value: accepted },
      { type: 'Pending', value: pending },
      { type: 'Rejected', value: rejected },
    ],
    xField: 'type',
    yField: 'value',
    color: ({ type }) => {
      return type === 'Accepted' ? '#22c55e' : type === 'Pending' ? '#facc15' : '#ef4444';
    },
    columnWidthRatio: 0.5,
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-2">📊 Event Planner Dashboard</h1>
      <p className="text-gray-500 mb-6">Live view of bookings and activity.</p>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Spin size="large" />
        </div>
      ) : (
        <>
          {/* Analytics Summary */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
            {analytics.map((item, index) => (
              <Card key={index} bordered>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-gray-500">{item.title}</p>
                    <Statistic value={item.value} />
                  </div>
                  {item.icon}
                </div>
              </Card>
            ))}
          </div>

          {/* Bookings Table */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">📅 All Bookings</h2>
            <Table columns={columns} dataSource={bookings} rowKey="_id" bordered />
          </div>

          {/* Graphs */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">📈 Booking Overview</h2>
            <Card>
              <Bar {...config} />
            </Card>
          </div>

          {/* Accepted List */}
          <div>
            <h2 className="text-xl font-semibold mb-4">✅ Accepted Bookings</h2>
            <List
              itemLayout="horizontal"
              dataSource={bookings.filter((b) => b.status === 'accepted')}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar icon={<UserOutlined />} />}
                    title={item.guestName}
                    description={`Date: ${new Date(item.desiredDate).toLocaleDateString()}`}
                  />
                  <Tag color="green">Accepted</Tag>
                </List.Item>
              )}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default EventPlannerDashboard;
