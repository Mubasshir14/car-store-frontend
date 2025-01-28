/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Badge, Button, Table, Typography } from "antd";
import { Link } from "react-router-dom";
import { useGetOrderQuery } from "@/redux/features/Admin/orderManagementApi";
import { useAppSelector } from "@/redux/hook";
import { useCurrentUser } from "@/redux/features/auth/authSlice";
import Loader from "@/pages/Loader";

const { Title, Text } = Typography;

const MyOrders = () => {
  const user = useAppSelector(useCurrentUser);
  const { data: order, isLoading } = useGetOrderQuery(undefined);

  const pendingOrders = order?.data?.filter(
    (order: any) => order.status === "Paid"
  );

  if (isLoading) <Loader/>


  const columns = [
    {
      title: "Name",
      dataIndex: "customerName",
      key: "customerName",
      render: (text: string) => <Text strong>{text}</Text>,
    },
    {
      title: "Cars Ordered",
      dataIndex: "cars",
      key: "cars",
      render: (cars: any[]) =>
        cars.map((car) => (
          <div key={car._id} className="mb-2">
            <div className="flex items-center gap-2">
              <img
                src={car.image}
                alt={car.name}
                className="w-12 h-12 object-cover rounded-md"
              />
              <div>
                <Text strong>{car.name}</Text>
                <br />
                <Text type="secondary">{car.brand}</Text>
              </div>
            </div>
          </div>
        )),
    },
    {
      title: "Total Price",
      dataIndex: "totalPrice",
      key: "totalPrice",
      render: (_: any, record: any) =>
        `$${record.cars.reduce((acc: number, car: any) => acc + car.totalPrice, 0)}`,
    },
    {
      title: "Order Status",
      dataIndex: "orderStatus",
      key: "orderStatus",
      render: (status: string) => (
        <Badge
          color={
            status === "Pending"
              ? "orange"
              : status === "Cancelled"
              ? "red"
              : status === "Shipped"
              ? "green"
              : "gray"
          }
          text={status}
        />
      ),
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      render: (_: any, record: any) => (
        <Link to={`/order/${record._id}`}>
          <Button type="link">View Details</Button>
        </Link>
      ),
    },
  ];

  // Format data for the table
  const dataSource = pendingOrders?.map((order: any) => ({
    key: order._id,
    customerName: order.user.name,
    cars: order.cars,
    orderStatus: order.orderStatus,
    _id: order._id,
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-8">
          <Title level={2} className="text-red-500">
            My Orders
          </Title>
          <Badge
            count={pendingOrders?.length || 0}
            style={{ backgroundColor: "#ff4d4f" }}
            showZero
          >
            <Text type="secondary">Total Orders</Text>
          </Badge>
        </div>

        {/* Ant Design Table */}
        <Table
          dataSource={dataSource}
          columns={columns}
          pagination={{ pageSize: 5 }}
          bordered
          rowClassName="hover:bg-gray-50"
        />
      </div>
    </div>
  );
};

export default MyOrders;
