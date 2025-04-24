import React, { useContext, useEffect, useState } from 'react';
import {
  Card,
  Statistic,
  Table,
  Tag,
  List,
  Avatar,
  Button,
  Spin,
  message,
  Dropdown,
  Menu,
} from 'antd';
import { Bar } from '@ant-design/plots';
import {
  UserOutlined,
  TeamOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  DollarOutlined,
  MoreOutlined,
} from '@ant-design/icons';
import api from '../api/axiosInstance';
import { AuthContext } from '../context/AuthContext';

const AdminDashboard = () => {
  const [planners, setPlanners] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token } = useContext(AuthContext);

  const fetchPlanners = async () => {
    try {
      const response = await api.get('/auth/getalleventplanner');
      setPlanners(response.data);
    } catch (error) {
      message.error('Failed to fetch planners');
    }
  };

  const fetchBookings = async () => {
    try {
      const response = await api.get('/bookings');
      setBookings(response.data);
    } catch (error) {
      message.error('Failed to fetch bookings');
    }
  };

  useEffect(() => {
    fetchPlanners();
    fetchBookings();
    setLoading(false);
  }, []);

  const handlePlannerStatus = async (id, status) => {
    try {
      await api.put(
        '/auth/planner-acceptance',
        { id, status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      message.success(`Planner ${status} successfully`);
      fetchPlanners();
    } catch (err) {
      message.error('Failed to update planner status');
    }
  };

  const totalPlanners = planners.length;
  const approvedPlanners = planners.filter((p) => p.status === 'approved').length;
  const pendingPlanners = planners.filter((p) => p.status === 'pending').length;
  const totalGuests = bookings.reduce(
    (acc, curr) => (acc.includes(curr.guestName) ? acc : [...acc, curr.guestName]),
    []
  ).length;

  const totalRevenue = bookings
  
    .filter((b) => b.status === 'accepted')
    .reduce((acc, curr) => acc + parseFloat(curr.priceRange || 0), 0);

  const analytics = [
    {
      title: 'Total Event Planners',
      value: totalPlanners,
      icon: <TeamOutlined className="text-2xl text-blue-500" />,
    },
    {
      title: 'Approved Planners',
      value: approvedPlanners,
      icon: <CheckCircleOutlined className="text-2xl text-green-500" />,
    },
    {
      title: 'Pending Approvals',
      value: pendingPlanners,
      icon: <CloseCircleOutlined className="text-2xl text-red-500" />,
    },
    {
      title: 'Total Guests',
      value: totalGuests,
      icon: <UserOutlined className="text-2xl text-purple-500" />,
    },
    {
      title: 'Total Revenue',
      value: `$${totalRevenue}`,
      icon: <DollarOutlined className="text-2xl text-yellow-500" />,
    },
  ];

  const columns = [
    { title: 'Name', dataIndex: 'fullName', key: 'name' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    {
      title: 'Registration Date',
      dataIndex: 'createdAt',
      key: 'registrationDate',
      render: (date) =>
        new Date(date).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }),
    },
    {
      title: 'Status',
      key: 'status',
      dataIndex: 'status',
      render: (status) =>
        status === 'approved' ? (
          <Tag color="green">Approved</Tag>
        ) : status === 'rejected' ? (
          <Tag color="red">Rejected</Tag>
        ) : (
          <Tag color="orange">Pending</Tag>
        ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => {
        const menu = (
          <Menu
            onClick={({ key }) => handlePlannerStatus(record._id, key)}
            items={[
              { label: 'Approve', key: 'approved' },
              { label: 'Reject', key: 'rejected' },
            ]}
          />
        );
    
        return (
          <Dropdown overlay={menu} trigger={['click']}>
            <Button icon={<MoreOutlined />} />
          </Dropdown>
        );
      },
    }
    
  ];

  const config = {
    data: [
      { type: 'Accepted', value: bookings.filter((b) => b.status === 'accepted').length },
      { type: 'Pending', value: bookings.filter((b) => b.status === 'pending').length },
      { type: 'Rejected', value: bookings.filter((b) => b.status === 'rejected').length },
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
      <h1 className="text-3xl font-bold mb-2">📊 Admin Dashboard</h1>
      <p className="text-gray-500 mb-6">Overview of system activity and approvals.</p>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Spin size="large" />
        </div>
      ) : (
        <>
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

          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">📋 Event-Planner Accounts Approvals</h2>
            <Table columns={columns} dataSource={planners} rowKey="_id" bordered />
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">📈 Booking Overview</h2>
            <Card>
              <Bar {...config} />
            </Card>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">✅ Latest Accepted Bookings</h2>
            <List
              itemLayout="horizontal"
              dataSource={bookings.filter((b) => b.status === 'accepted')}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar icon={<UserOutlined />} />}
                    title={item.guestName}
                    description={`Date: ${new Date(item.desiredDate || item.date).toLocaleDateString()}`}
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

export default AdminDashboard;
