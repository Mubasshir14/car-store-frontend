/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle,
  AlertCircle,
  Package,
  CreditCard,
  User,
  Clock,
} from "lucide-react";
import {
  useGetOrderQuery,
  useVerifyOrderMutation,
} from "@/redux/features/Admin/orderManagementApi";
import { useAppSelector } from "@/redux/hook";
import { useCurrentUser } from "@/redux/features/auth/authSlice";
import { useDeleteAllCartMutation } from "@/redux/features/Cart/cartApi";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import Loader from "@/pages/Loader";

const OrderVerification = () => {
  const user = useAppSelector(useCurrentUser);
  const { data: order } = useGetOrderQuery(undefined);
  const [verifyOrder, { isLoading }] = useVerifyOrderMutation();
  const [deleteCart] = useDeleteAllCartMutation();
  const navigate = useNavigate();

  const handleVerify = (order_id: string) => {
    verifyOrder(order_id)
      .unwrap()
      .then((response) => {
        console.log("Success:", response);
        toast.success("Order verified successfully!");
        navigate("/user-dashboard/my-orders");
        deleteCart(user?.email)
          .unwrap()
          .then((cartResponse) => {
            console.log("Cart cleared:", cartResponse);
          })
          .catch((cartError) => {
            console.error("Failed to clear cart:", cartError);
          });
      })
      .catch((error) => {
        console.error("Error details:", error);
        toast.error("Order verification failed");
      });
  };

  const pendingOrders = order?.data?.filter(
    (order: any) => order.status === "Pending"
  );

  if (isLoading) return <Loader />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl  font-bold text-red-500  mb-2">
              Pending Orders
            </h1>
          </div>
          <Badge variant="outline" className="px-4 py-2 text-lg">
            {pendingOrders?.length || 0} Pending
          </Badge>
        </div>

        <div className="space-y-8">
          {pendingOrders?.map((order: any) => (
            <div
              key={order._id as string}
              className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl"
            >
              <div className="p-6">
                <div className="grid gap-6 md:grid-cols-2">
                  {/* Order Details */}
                  <Card className="border-0 shadow-none bg-gray-50">
                    <CardHeader className="flex flex-row items-center space-x-4 pb-2">
                      <Package className="h-6 w-6 text-red-500" />
                      <CardTitle>Order Details</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <dl className="grid grid-cols-2 gap-3">
                        <dt className="text-gray-600">Order ID:</dt>
                        <dd className="font-mono text-sm">
                          {order._id as string}
                        </dd>
                        <dt className="text-gray-600">Amount:</dt>
                        <dd className="font-bold text-green-600">
                          ${order.totalPrice.toFixed(2)}
                        </dd>
                        <dt className="text-gray-600">Status:</dt>
                        <dd>
                          <Badge
                            variant="destructive"
                            className="animate-pulse"
                          >
                            {order.status}
                          </Badge>
                        </dd>
                        <dt className="text-gray-600">Date:</dt>
                        <dd className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-gray-400" />
                          {new Date(order.createdAt).toLocaleString()}
                        </dd>
                      </dl>
                    </CardContent>
                  </Card>

                  {/* Payment Information */}
                  <Card className="border-0 shadow-none bg-gray-50">
                    <CardHeader className="flex flex-row items-center space-x-4 pb-2">
                      <CreditCard className="h-6 w-6 text-purple-500" />
                      <CardTitle>Payment Information</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <dl className="grid grid-cols-2 gap-3">
                        <dt className="text-gray-600">Transaction ID:</dt>
                        <dd className="font-mono text-sm">
                          {order.transaction.id}
                        </dd>
                        <dt className="text-gray-600">Transaction Status:</dt>
                        <dd className="font-medium text-blue-600">
                          {order.transaction.transactionStatus}
                        </dd>
                      </dl>
                    </CardContent>
                  </Card>

                  {/* Customer Information */}
                  <Card className="border-0 shadow-none bg-gray-50">
                    <CardHeader className="flex flex-row items-center space-x-4 pb-2">
                      <User className="h-6 w-6 text-emerald-500" />
                      <CardTitle>Customer Information</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <dl className="grid grid-cols-2 gap-3">
                        <dt className="text-gray-600">Name:</dt>
                        <dd className="font-medium">{order.user.name}</dd>
                        <dt className="text-gray-600">Email:</dt>
                        <dd className="text-sm text-blue-600">
                          {order.user.email}
                        </dd>
                        <dt className="text-gray-600">Phone:</dt>
                        <dd>{order.user.phone}</dd>
                        <dt className="text-gray-600">Location:</dt>
                        <dd className="text-sm">
                          {order.user.address}, {order.user.city}
                        </dd>
                      </dl>
                    </CardContent>
                  </Card>

                  {/* Verification Status */}
                  <Card className="border-0 shadow-none bg-gray-50">
                    <CardHeader className="flex flex-row items-center space-x-4 pb-2">
                      <AlertCircle className="h-6 w-6 text-amber-500" />
                      <CardTitle>Verification Status</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-2 text-amber-600">
                          <span className="font-medium">
                            Awaiting Verification
                          </span>
                        </div>
                        <Button
                          onClick={() =>
                            handleVerify(order.transaction.id as string)
                          }
                          className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                        >
                          Verify Order
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          ))}

          {pendingOrders?.length === 0 && (
            <Card className="border-0 shadow-lg bg-white">
              <CardContent className="p-12 text-center">
                <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-red-500 mb-2">
                  All Caught Up!
                </h3>
                <p className="text-gray-600">
                  There are no pending orders to verify at this time.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderVerification;
