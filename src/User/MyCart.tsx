/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import {
  useDeleteCartMutation,
  useGetCartQuery,
} from "@/redux/features/Cart/cartApi";
import { toast } from "sonner";
import Loader from "@/pages/Loader";
import { Modal } from "antd";
import { useAddOrderMutation } from "@/redux/features/Admin/orderManagementApi";
import { useAppSelector } from "@/redux/hook";
import { useCurrentUser } from "@/redux/features/auth/authSlice";
import { useGetMeQuery } from "@/redux/features/Admin/userManagementApi";
import { useState } from "react";

const MyCart = () => {
  const { data: cart, isLoading } = useGetCartQuery(undefined);
  const [deleteCart] = useDeleteCartMutation();
  const [createOrder] = useAddOrderMutation();
  const user = useAppSelector(useCurrentUser);
  const { data: newUser } = useGetMeQuery({
    email: user?.email,
    role: user?.role,
  });
  const [isProcessing, setIsProcessing] = useState(false);

  const totalPrice = cart?.data
    ?.reduce(
      (total: number, item: { price: number; quantity: number }) =>
        total + item.price * item.quantity,
      0
    )
    .toFixed(2);

  const handleDelete = (itemId: string) => {
    Modal.confirm({
      title: "Are you sure you want to delete this item?",
      content: "This action cannot be undone.",
      okText: "Yes, delete it",
      cancelText: "Cancel",
      onOk: async () => {
        try {
          await deleteCart(itemId).unwrap();
          toast.success("Removed from cart");
          console.log("Deleted item with ID:", itemId);
        } catch (error) {
          toast.error("Something went wrong");
          console.error("Failed to delete item:", error);
        }
      },
      onCancel: () => {
        toast.info("Item deletion canceled");
      },
    });
  };

  const handlePlaceOrder = async () => {
    try {
      setIsProcessing(true); // Start loading state
  
      console.log("Cart data:", cart?.data);

  
      // Adjust the payload to match the required structure
      const orderPayload = {
        cars: cart?.data?.map((item: {
          _id: string;
          car: string;
          quantity: number;
          name: string;
          brand: string;
          category: string;
          description: string;
          fuelType: string;
          image: string;
          milage: string;
          year: number;
          userName: string;
          email: string;
          price: number;
          address: string;
          phone: string;
          city: string;
          totalPrice: number;
         
        }) => ({
          car: item.car,        // Rename _id to car
          _id: item._id,        // Original _id
          quantity: item.quantity,
          name: item.name,
          brand: item.brand,
          category: item.category,
          description: item.description,
          fuelType: item.fuelType,
          image: item.image,
          milage: item.milage,
          year: item.year,
          userName: item.userName,
          email: item.email,
          price: item.price,
          address: item.address,
          phone: item.phone,
          city: item.city,
          totalPrice: item.totalPrice,
         
        })),
      };
      
  
      console.log("Order payload:", orderPayload);
  
      // Send the order payload to the backend
      const response = await createOrder(orderPayload).unwrap();
  
      // Redirect the user to the payment page if successful
      if (response?.data) {
        window.location.href = response.data; // Assuming response.data contains the checkout URL
      } else {
        toast.error("Failed to retrieve payment link.");
      }
    } catch (error: any) {
      console.error("Order error details:", error?.data?.errorSources);
      toast.error(
        error?.data?.message || "Failed to place the order. Please try again."
      );
    } finally {
      setIsProcessing(false); // End loading state
    }
  };
  
  

  if (isLoading || isProcessing) return <Loader />;

  return (
    <div className="max-w-screen-xl mx-auto min-h-[calc(100vh-250px)] p-4 md:p-8">
      <div className="text-black font-bold text-xl md:text-2xl font-poppins uppercase text-center mb-12">
        <h1 className="text-red-500">My Cart</h1>
      </div>

      {cart?.data?.length > 0 ? (
        <div className="flex items-center lg:justify-center lg:flex-row flex-col gap-8">
          {/* Cart Items Section */}
          <div className="border-2 border-red-500 p-4 rounded-lg w-full">
            {cart.data.map((c: any, index: any) => (
              <div
                key={index}
                className="flex flex-col md:flex-row p-4 border-b-2 border-gray-200 mb-6 hover:bg-gray-50 transition duration-300"
              >
                <figure className="flex justify-center md:w-1/4">
                  <img
                    src={c.image || "placeholder-image-url"}
                    alt={c.name}
                    className="w-32 h-32 object-cover rounded-lg shadow-lg"
                  />
                </figure>
                <div className="flex flex-col justify-between md:w-3/4 pl-4">
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl font-extrabold text-gray-800">
                      {c.name}
                    </h2>
                    <button
                      onClick={() => handleDelete(c._id)}
                      className="text-red-500 hover:text-red-700 transition duration-200"
                    >
                      <FaTrashAlt size={20} />
                    </button>
                  </div>
                  <div className="mt-4">
                    <div className="flex flex-col lg:flex-row gap-4">
                      <span className="text-red-500 font-semibold">
                        Quantity: {c.quantity}
                      </span>
                      <span className="text-red-500 font-semibold">
                        Price: ${(c.price * c.quantity).toFixed(0)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary Section */}
          <div className="w-full max-w-md border-2 border-red-500 bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
            <div className="flex justify-between mb-3 text-gray-700">
              <span>Subtotal</span>
              <span>${totalPrice}</span>
            </div>
            <div className="flex justify-between mb-3 text-gray-700">
              <span>Discount (0%)</span>
              <span className="text-red-500">-$0</span>
            </div>
            <hr className="border-t-2 border-red-500 my-3" />
            <div className="flex justify-between font-bold text-xl mt-4 mb-6 text-gray-800">
              <span>Total</span>
              <span>${totalPrice}</span>
            </div>
            <div className="flex space-x-2 mb-4">
              <input
                type="text"
                disabled
                placeholder="Add a promo code"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none"
              />
              <button className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-200">
                Apply
              </button>
            </div>
            <button
              onClick={handlePlaceOrder}
              // to="/checkout"
              className="w-full bg-red-500 text-white py-3 px-4 rounded-md font-semibold text-center hover:bg-red-600 transition duration-200"
            >
              Checkout ➔
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center p-4 rounded-lg">
          <Link to="/all-products">
            <button className="bg-red-500 text-white px-6 py-3 text-xl rounded-full mt-4 hover:bg-red-600 transition duration-200">
              Continue Shopping
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default MyCart;
