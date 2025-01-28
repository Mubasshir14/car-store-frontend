/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { CardHeader, CardTitle } from "@/components/ui/card";
import {
  useGetAllOrdersQuery,
  useUpdateOrderStatusMutation,
} from "@/redux/features/Admin/orderManagementApi";
import { Button, Table, Badge, Card, Typography } from "antd";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const { Title } = Typography;
console.log(Title);

const ManageOrder = () => {
  const { data: order } = useGetAllOrdersQuery(undefined);
  const [updateOrderStatus] = useUpdateOrderStatusMutation();

  const handleStatusUpdate = async (id: string, status: string) => {
    const toastId = "updateOrderToast";
    try {
      await updateOrderStatus({ id, status }).unwrap();
      toast.success(`Order successfully ${status.toLowerCase()}`, {
        description: `Order #${id.slice(-6)} has been ${status.toLowerCase()}`,
        id: toastId,
      });
    } catch (error) {
      toast.error("Failed to update order status", {
        id: toastId,
      });
    }
  };
  const sortedOrders = order?.data
    ? [...order.data].sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
    : [];

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "paid":
        return "green";
      case "pending":
        return "orange";
      default:
        return "default";
    }
  };

  const getOrderStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "orange";
      case "ship":
        return "green";
      case "cancelled":
        return "red";
      default:
        return "default";
    }
  };
  console.log(getOrderStatusColor);

  const columns = [
    {
      title: "Name",
      dataIndex: "cars",
      key: "userName",
      render: (cars: any) =>
        Array.isArray(cars) && cars.length > 0 ? (
          <div className="font-medium">{cars[0].userName}</div>
        ) : (
          "N/A"
        ),
    },
    {
      title: "Email",
      dataIndex: "cars",
      key: "email",
      render: (cars: any) =>
        Array.isArray(cars) && cars.length > 0 ? (
          <div className="text-gray-600">{cars[0].email}</div>
        ) : (
          "N/A"
        ),
    },
    {
      title: "Car",
      dataIndex: "cars",
      key: "cars",
      render: (cars: any) =>
        Array.isArray(cars) ? (
          <div className="font-medium text-blue-600">
            {cars.map((car: any) => car.name).join(", ")}
          </div>
        ) : (
          "N/A"
        ),
    },
    {
      title: "Total Price",
      dataIndex: "totalPrice",
      key: "totalPrice",
      render: (price: number) => (
        <div className="font-semibold">${price.toLocaleString()}</div>
      ),
    },
    {
      title: "Order Status",
      dataIndex: "orderStatus",
      key: "orderStatus",
      render: (status: string) => (
        <Badge
          className="px-3 py-1 rounded-full"
          color={
            status === "Pending"
              ? "orange"
              : status === "Shipped"
              ? "green"
              : status === "Cancelled"
              ? "red"
              : "default"
          }
          text={status}
        />
      ),
    },
    {
      title: "Payment Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <Badge
          className="px-3 py-1 rounded-full"
          color={getStatusColor(status)}
          text={status}
        />
      ),
    },
    {
      title: "Action",
      key: "action",
      width: 120,
      render: (_: any, record: any) => {
        const isDisabled =
          record.orderStatus === "Shipped" ||
          record.orderStatus === "Cancelled";

        return (
          <div className="flex flex-col gap-2">
            <Button
              type="primary"
              className="bg-blue-500 flex items-center justify-center w-full"
              size="middle"
              onClick={() =>
                handleStatusUpdate(record._id as string, "Shipped")
              }
              disabled={isDisabled}
            >
              Ship
            </Button>
            <Button
              type="primary"
              danger
              className="flex items-center justify-center w-full"
              size="middle"
              onClick={() =>
                handleStatusUpdate(record._id as string, "Cancelled")
              }
              disabled={isDisabled}
            >
              Cancel
            </Button>
            <Link
              to={`/dashboard/order/${record._id}`}
              className="flex btn btn-outline items-center justify-center w-full"
            >
              View Details
            </Link>
          </div>
        );
      },
    },
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <Card className="shadow-2xl rounded-3xl">
        <div className="mb-6 ">
          <CardHeader className="bg-gradient-to-r from-rose-600 to-red-500 py-6">
            <CardTitle className="text-4xl font-extrabold text-white text-center tracking-wide drop-shadow-lg">
              Manage Orders
            </CardTitle>
          </CardHeader>
        </div>

        <Table
          columns={columns}
          dataSource={sortedOrders}
          rowKey="_id"
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showTotal: (total, range) =>
              `${range[0]}-${range[1]} of ${total} orders`,
          }}
          className="bg-white rounded-lg"
          rowClassName="hover:bg-gray-50"
        />
      </Card>
    </div>
  );
};

export default ManageOrder;
