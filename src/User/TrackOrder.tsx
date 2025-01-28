/* eslint-disable @typescript-eslint/no-explicit-any */
import Loader from "@/pages/Loader";
import { Input, Button, message, Typography, Card, Space, Steps } from "antd";
import { useState } from "react";
import { useGetOrderQuery } from "@/redux/features/Admin/orderManagementApi";

const { Title, Text } = Typography;

const TrackOrder = () => {
  const { data: order, isLoading } = useGetOrderQuery(undefined);
  const [searchId, setSearchId] = useState("");
  const [orderDetails, setOrderDetails] = useState<any>(null);

  if (isLoading) return <Loader />;

  const handleSearch = () => {
    if (!searchId) {
      message.warning("Please enter an order ID.");
      return;
    }

    const foundOrder = order?.data?.find(
      (orderItem: { _id: any }) => orderItem._id === searchId
    );

    if (foundOrder) {
      const deliveryEstimate = 
        foundOrder.orderStatus.toLowerCase() !== 'cancelled' 
          ? Math.floor(Math.random() * 7) + 1 
          : null;
      setOrderDetails({ ...foundOrder, deliveryEstimate });
    } else {
      setOrderDetails(null);
      message.error("No Order Found");
    }
  };

  const getOrderStep = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'pending':
        return 0;
      case 'processing':
        return 1;
      case 'shipped':
        return 2;
      case 'delivered':
        return 3;
      case 'cancelled':
        return -1;
      default:
        return 0;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-rose-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <Title level={2} className="text-red-600 mb-4">
            Track Your Order
          </Title>
          <Text className="text-gray-600">
            Enter your order ID to track your package
          </Text>
        </div>

        <div className="mb-8 flex justify-center">
          <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-xl">
            <div className="flex items-center space-x-3">
              <Input
                placeholder="Enter your order ID here"
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
                className="text-lg py-2"
                size="large"
              />
              <Button
                type="primary"
                onClick={handleSearch}
                className="bg-red-500 hover:bg-red-600 h-12 px-8"
                size="large"
                disabled={!searchId}
              >
                Track
              </Button>
            </div>
          </div>
        </div>

        {orderDetails ? (
          <div className="space-y-8">
            <Card className="shadow-lg rounded-xl overflow-hidden">
              <div className="mb-8">
                <Steps
                  current={getOrderStep(orderDetails.orderStatus)}
                  status={orderDetails.orderStatus.toLowerCase() === 'cancelled' ? 'error' : 'process'}
                  items={[
                    { title: 'Order Placed' },
                    { title: 'Processing' },
                    { title: 'Shipped' },
                    { title: 'Delivered' },
                  ]}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
                <div className="space-y-4">
                  <div className="bg-red-50 p-4 rounded-lg">
                    <Text className="text-sm text-gray-500">Order ID</Text>
                    <div className="text-lg font-semibold">{orderDetails._id}</div>
                  </div>
                  <div className="bg-red-50 p-4 rounded-lg">
                    <Text className="text-sm text-gray-500">Customer Name</Text>
                    <div className="text-lg font-semibold">{orderDetails.user.name}</div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="bg-red-50 p-4 rounded-lg">
                    <Text className="text-sm text-gray-500">Status</Text>
                    <div className={`text-lg font-semibold capitalize ${
                      orderDetails.orderStatus.toLowerCase() === 'cancelled' 
                        ? 'text-red-600' 
                        : ''
                    }`}>
                      {orderDetails.orderStatus}
                    </div>
                  </div>
                  {orderDetails.orderStatus.toLowerCase() !== 'cancelled' && (
                    <div className="bg-green-50 p-4 rounded-lg">
                      <Text className="text-sm text-gray-500">Estimated Delivery</Text>
                      <div className="text-lg font-semibold text-green-600">
                        {orderDetails.deliveryEstimate} days
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="border-t pt-6">
                <div className="flex items-center mb-4">
                  <Title level={4} className="mb-0 text-red-500">
                    Order Items
                  </Title>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {orderDetails.cars.map((car: any) => (
                    <Card
                      key={car._id}
                      className="shadow-md hover:shadow-xl transition-shadow duration-300"
                      cover={
                        <div className="relative h-48 overflow-hidden">
                          <img
                            alt={car.name}
                            src={car.image}
                            className="absolute inset-0 w-full h-full object-cover"
                          />
                        </div>
                      }
                    >
                      <Card.Meta
                        title={
                          <div className="flex justify-between items-center">
                            <Text className="text-lg font-semibold">{car.name}</Text>
                            <Text className="text-red-500 font-bold">
                              ${car.totalPrice}
                            </Text>
                          </div>
                        }
                        description={
                          <Space direction="vertical" size="small" className="w-full">
                            <div className="flex justify-between text-gray-500">
                              <span>Quantity:</span>
                              <span className="font-medium">{car.quantity}</span>
                            </div>
                            <div className="flex justify-between text-gray-500">
                              <span>User:</span>
                              <span className="font-medium">{car.userName}</span>
                            </div>
                          </Space>
                        }
                      />
                    </Card>
                  ))}
                </div>
              </div>
            </Card>
          </div>
        ) : (
          <div className="text-center mt-12">
            <Text className="text-gray-500 text-lg">
              Enter an order ID to view tracking details
            </Text>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrackOrder;