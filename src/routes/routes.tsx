import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "@/pages/Login";
import Home from "@/Home/Home";
import AllProducts from "@/pages/AllProducts";
import AboutUsCarizon from "@/pages/AboutCarizon";
import ProductDetails from "@/pages/ProductDetails";
import DashBoard from "@/Layout/Dashboard";
import AddProduct from "@/Admin/AddProduct";
import ManageCar from "@/Admin/ManageCar";
import ManageOrder from "@/Admin/ManageOrder";
import ManageUser from "@/Admin/ManageUser";
import RevenueCheck from "@/Admin/RevenueCheck";
import UpdateCar from "@/Admin/UpdateCar";
import UserDashBoard from "@/User/UserDashboard";
import MyOrders from "@/User/MyOrders";
import MyProfile from "@/User/MyProfile";
import MyCart from "@/User/MyCart";
import ProtectedRoute from "@/Layout/ProtectedRoute";
import Orderverification from "@/User/Orderverification";
import OrderDetails from "@/pages/OrderDetails";
import AdminProductDetails from "@/pages/AdminProductDetails";
import TermsConditions from "@/pages/TermsConditions";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import Payment from "@/pages/Payment";
import TrackOrder from "@/User/TrackOrder";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/all-products",
        element: <AllProducts />,
      },
      {
        path: "/about-us",
        element: <AboutUsCarizon />,
      },
      {
        path: "/terms-condition",
        element: <TermsConditions />,
      },
      {
        path: "/privacy-policy",
        element: <PrivacyPolicy />,
      },
      {
        path: "/payment-policy",
        element: <Payment />,
      },
      {
        path: "/car/:id",
        element: <ProductDetails />,
      },
      // {
      //   path: "/order/:id",
      //   element: (
      //     <ProtectedRoute>
      //       <OrderDetails />
      //     </ProtectedRoute>
      //   ),
      // },
      {
        path: "/my-profile",
        element: (
          <ProtectedRoute>
            <MyProfile />
          </ProtectedRoute>
        ),
      },
      {
        path: "verification",
        element: (
          <ProtectedRoute>
            <Orderverification />
          </ProtectedRoute>
        ),
      },
      { path: "/login", element: <Login /> },
    ],
  },

  {
    path: "/dashboard",
    element: (
      <ProtectedRoute role="admin">
        <DashBoard />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "add-car",
        element: <AddProduct />,
      },
      {
        path: "manage-car",
        element: <ManageCar />,
      },
      {
        path: "update-car/:id",
        element: <UpdateCar />,
      },
      {
        path: "manage-order",
        element: <ManageOrder />,
      },
      {
        path: "manage-user",
        element: <ManageUser />,
      },
      {
        path: "revenue-check",
        element: <RevenueCheck />,
      },
      {
        path: "order/:id",
        element: <AdminProductDetails />,
      },
    ],
  },
  {
    path: "/user-dashboard",
    element: (
      <ProtectedRoute role="user">
        <UserDashBoard />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "my-orders",
        element: <MyOrders />,
      },
      {
        path: "my-cart",
        element: <MyCart />,
      },
      {
        path: "verification",
        element: <Orderverification />,
      },
      {
        path: "order/:id",
        element: <OrderDetails />,
      },
      {
        path: "order/track-order",
        element: <TrackOrder />,
      },
    ],
  },
]);

export default router;
