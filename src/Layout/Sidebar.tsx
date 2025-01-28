import {
  ShoppingBag,
  User,
  DollarSign,
  LogOut,
  Menu,
  Car,
  ClipboardList,
} from "lucide-react";
import img from "../assets/Carizon.png";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { logout, useCurrentUser } from "@/redux/features/auth/authSlice";
import { useGetMeQuery } from "@/redux/features/Admin/userManagementApi";
import { toast } from "sonner";

const SideBar = () => {
  const [isActive, setIsActive] = useState(false);
  const dispatch = useAppDispatch();
  const handleToggle = () => {
    setIsActive((prevState) => !prevState);
  };
  const user = useAppSelector(useCurrentUser);
  console.log(user);

  const { data: newUser } = useGetMeQuery({
    email: user?.email,
    role: user?.role,
  });

  console.log(newUser?.data);

  const navigate = useNavigate();

  const handleLogOut = async () => {
    try {
      dispatch(logout());
      toast.success("Successfully logged out!");
      navigate("/login");
    } catch (error) {
      console.error("Error logging out", error);
      toast.error("An error occurred while logging out. Please try again.");
    }
  };

  const adminOptions = [
    {
      path: "/dashboard/add-car",
      name: "Add Car",
      icon: <Car className="w-5 h-5" />,
    },
    {
      path: "/dashboard/manage-car",
      name: "Manage Car",
      icon: <ClipboardList className="w-5 h-5" />,
    },
    {
      path: "/dashboard/manage-order",
      name: "Manage Order",
      icon: <ShoppingBag className="w-5 h-5" />,
    },
    {
      path: "/dashboard/manage-user",
      name: "Manage User",
      icon: <User className="w-5 h-5" />,
    },
    {
      path: "/dashboard/revenue-check",
      name: "Revenue Check",
      icon: <DollarSign className="w-5 h-5" />,
    },
  ];

  return (
    <div className="relative">
      {/* Mobile Toggle Button */}
      <button
        onClick={handleToggle}
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-red-500 text-white rounded-lg shadow-lg hover:bg-red-600 transition-all"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed md:sticky top-0 left-0 h-screen w-64 bg-white shadow-lg z-40 flex flex-col transform transition-transform duration-300 ease-in-out ${
          isActive ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        {/* Logo */}
        <div className="h-16 flex items-center justify-center border-b b">
          <Link to="/" className="text-xl font-bold text-white font-poppin">
            <img src={img} className="h-16" alt="Logo" />
          </Link>
        </div>

        {/* Admin Options */}
        <div className="flex-grow overflow-y-auto p-3 bg-gray-50">
          <div className="space-y-1">
            {adminOptions.map((option) => (
              <NavLink
                key={option.path}
                to={option.path}
                onClick={() => window.innerWidth < 768 && setIsActive(false)}
                className={({ isActive }) =>
                  `flex items-center px-4 py-3 rounded-lg text-base font-medium transition-all ${
                    isActive
                      ? "bg-red-500 text-white"
                      : "text-gray-700 hover:bg-red-100 hover:text-red-500"
                  }`
                }
              >
                {option.icon}
                <span className="ml-3">{option.name}</span>
              </NavLink>
            ))}
          </div>
        </div>

        {/* User Section */}
        <div className="p-4 border-t space-y-2 bg-gray-50">
          <div>
            {user ? (
              
              <>
                <Link
                  to="/my-profile"
                  onClick={() => window.innerWidth < 768 && setIsActive(false)}
                  className="flex items-center px-4 py-3 rounded-lg text-base font-medium text-gray-700 hover:bg-red-100 hover:text-red-500 transition-all"
                >
                  <img
                    title={newUser?.data?.name}
                    className="object-cover h-10 rounded-full cursor-pointer"
                    src={
                      "https://images.unsplash.com/photo-1586287011575-a23134f797f9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=48&q=60"
                    }
                    alt="Avatar"
                  />
                  <span className="ml-3">Profile</span>
                </Link>

                <button
                  onClick={() => window.innerWidth < 768 && setIsActive(false)}
                  onClickCapture={() => handleLogOut()}
                  className="flex items-center px-4 py-3 rounded-lg text-base font-medium text-gray-700 hover:bg-red-100 hover:text-red-500 transition-all"
                >
                  <LogOut className="w-5 h-5" />

                  <span className="ml-3">Logout</span>
                </button>
              </>
            ) : (
             
              <Link
                to="/login"
                onClick={() => window.innerWidth < 768 && setIsActive(false)}
                className="flex items-center px-4 py-3 rounded-lg text-base font-medium text-gray-700 hover:bg-red-100 hover:text-red-500 transition-all"
              >
                <User className="w-5 h-5" />
                <span className="ml-3">Login</span>
              </Link>
            )}
          </div>
        </div>
      </aside>

      {/* Overlay for Mobile */}
      {!isActive && (
        <div
          className="fixed  z-30 md:hidden"
          onClick={handleToggle}
        />
      )}
    </div>
  );
};

export default SideBar;
