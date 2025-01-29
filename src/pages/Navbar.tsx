/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { Menu, ShoppingCart, User, X } from "lucide-react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { MdOutlineDashboard } from "react-icons/md";
import { useAppSelector } from "@/redux/hook";
import { useCurrentUser } from "@/redux/features/auth/authSlice";
import { useGetMeQuery } from "@/redux/features/Admin/userManagementApi";
import { useGetCartQuery } from "@/redux/features/Cart/cartApi";
import logo from "../assets/Carizon.png";
const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const user = useAppSelector(useCurrentUser);
  const navigate = useNavigate();

  const { data: newUser } = useGetMeQuery({
    email: user?.email,
    role: user?.role,
  });

  const { data: cart } = useGetCartQuery(undefined);
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleAvatarClick = () => {
    if (user?.role === "admin") {
      navigate("/dashboard/add-car");
    } else if (user?.role === "user") {
      navigate("/user-dashboard/my-orders");
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const NavItem = ({ to, children }: any) => (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `relative group px-3 py-2 uppercase font-bold text-sm tracking-wider transition-all duration-300 
        ${isActive ? "text-red-500" : "text-gray-800 hover:text-red-500"}`
      }
    >
      {children}
      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-red-500 transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />
    </NavLink>
  );

  return (
    <div className="max-w-screen-xl mx-auto border-b-2 border-b-red-500 rounded-2xl">
      <div className="sticky top-0 z-50">
        <nav
          className={`
            transition-all duration-300 ease-in-out
            ${
              isScrolled
                ? "bg-white/95 backdrop-blur-md shadow-lg rounded-b-xl"
                : "bg-white/80"
            }
            border-b border-gray-100 hover:border-red-500
          `}
        >
          <div className="max-w-screen-2xl mx-auto px-4 ">
            <div className="flex items-center justify-between h-20">
              {/* Logo */}
              <Link
                to="/"
                className="flex-shrink-0 transition-transform duration-300 hover:scale-105"
              >
                <img src={logo} alt="Logo" className="h-16" />
              </Link>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-8">
                <NavItem to="/">Home</NavItem>
                <NavItem to="/all-products">All Cars</NavItem>
                <NavItem to="/about-us">About Us</NavItem>
              </div>

              {/* Right Side Icons */}
              <div className="hidden md:flex items-center space-x-6">
                {user ? (
                  <div className="flex items-center space-x-6">
                    {user.role === "user" ? (
                      <Link
                        to="/user-dashboard/my-cart"
                        className="relative group p-2 hover:bg-red-50 rounded-full transition-colors duration-200"
                      >
                        <ShoppingCart className="text-gray-700 group-hover:text-red-500 transition-colors duration-200" />
                        {cart?.data?.length > 0 && (
                          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                            {cart.data.length}
                          </span>
                        )}
                      </Link>
                    ) : (
                      user.role === "admin" && (
                        <Link
                          to="/dashboard/add-car"
                          className="p-2 hover:bg-red-50 rounded-full transition-colors duration-200 text-2xl"
                        >
                          <MdOutlineDashboard className="text-gray-700 hover:text-red-500 transition-colors duration-200 text-md" />
                        </Link>
                      )
                    )}

                    <div className="relative group">
                      <img
                        title={newUser?.data?.name}
                        className="h-10 w-10 rounded-full object-cover ring-2 ring-transparent group-hover:ring-red-500 transition-all duration-300 cursor-pointer"
                        src="https://images.unsplash.com/photo-1586287011575-a23134f797f9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=48&q=60"
                        alt="Avatar"
                        onClick={handleAvatarClick}
                      />
                    </div>
                  </div>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="p-2 hover:bg-red-50 rounded-full transition-colors duration-200"
                    >
                      <User className="text-gray-700 hover:text-red-500 transition-colors duration-200" />
                    </Link>
                    <button className="p-2 hover:bg-red-50 rounded-full transition-colors duration-200">
                      <ShoppingCart className="text-gray-700 hover:text-red-500 transition-colors duration-200" />
                    </button>
                  </>
                )}
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={toggleSidebar}
                className="md:hidden p-2 hover:bg-red-50 rounded-full transition-colors duration-200"
              >
                <Menu className="text-gray-700 hover:text-red-500 transition-colors duration-200" />
              </button>
            </div>
          </div>
        </nav>
      </div>

      {/* Sidebar */}
      <div
        className={`
          fixed top-0 left-0 h-full w-72 bg-white shadow-xl transform 
          transition-transform duration-300 ease-in-out z-50
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <img src={logo} alt="Logo" className="h-12" />
          <button
            onClick={toggleSidebar}
            className="p-2 hover:bg-red-50 rounded-full transition-colors duration-200"
          >
            <X className="text-gray-700 hover:text-red-500 transition-colors duration-200" />
          </button>
        </div>

        <div className="flex flex-col space-y-1 p-4">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `p-3 rounded-lg transition-all duration-200 ${
                isActive
                  ? "bg-red-50 text-red-500 font-semibold"
                  : "text-gray-700 hover:bg-red-50 hover:text-red-500"
              }`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/all-products"
            className={({ isActive }) =>
              `p-3 rounded-lg transition-all duration-200 ${
                isActive
                  ? "bg-red-50 text-red-500 font-semibold"
                  : "text-gray-700 hover:bg-red-50 hover:text-red-500"
              }`
            }
          >
            All Cars
          </NavLink>
          <NavLink
            to="/about-us"
            className={({ isActive }) =>
              `p-3 rounded-lg transition-all duration-200 ${
                isActive
                  ? "bg-red-50 text-red-500 font-semibold"
                  : "text-gray-700 hover:bg-red-50 hover:text-red-500"
              }`
            }
          >
            About Us
          </NavLink>
        </div>

        {/* User Profile and Cart in Sidebar */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t bg-gray-50">
          <div className="flex items-center justify-between">
            {user ? (
              <>
                <div className="flex items-center space-x-4">
                  <img
                    title={newUser?.data?.name}
                    className="h-10 w-10 rounded-full object-cover ring-2 ring-red-500"
                    src="https://images.unsplash.com/photo-1586287011575-a23134f797f9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=48&q=60"
                    alt="Avatar"
                    onClick={handleAvatarClick}
                  />
                  <span className="text-sm font-medium text-gray-700">
                    {newUser?.data?.name}
                  </span>
                </div>
                {user.role === "user" && (
                  <Link
                    to="/user-dashboard/my-cart"
                    className="relative p-2 hover:bg-red-50 rounded-full transition-colors duration-200"
                  >
                    <ShoppingCart className="text-gray-700 hover:text-red-500" />
                    {cart?.data?.length > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                        {cart.data.length}
                      </span>
                    )}
                  </Link>
                )}
              </>
            ) : (
              <Link
                to="/login"
                className="w-full py-2 px-4 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200 text-center font-medium"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 z-40"
          onClick={toggleSidebar}
        />
      )}
    </div>
  );
};

export default Navbar;
