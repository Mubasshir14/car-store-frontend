import { useState } from "react";
import { Menu, ShoppingCart, User, X } from "lucide-react";
import logo from "../assets/Carizon.png";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAppSelector } from "@/redux/hook";
import { useCurrentUser } from "@/redux/features/auth/authSlice";
import { useGetMeQuery } from "@/redux/features/Admin/userManagementApi";
import { useGetCartQuery } from "@/redux/features/Cart/cartApi";
import { MdOutlineDashboard } from "react-icons/md";
const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const user = useAppSelector(useCurrentUser);


  const { data: newUser } = useGetMeQuery({
    email: user?.email,
    role: user?.role,
  });


  const navigate = useNavigate();
  const { data: cart } = useGetCartQuery(undefined);

  // Handle avatar click based on user role
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

  const scrollToSection = (id: string) => {
    const section = document.querySelector(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <nav className="bg-white rounded-b-2xl border-b-2 hover:border-b-[#D01818] shadow-md container mx-auto">
        <div className="px-4 flex items-center justify-between h-24">
          <Link to="/">
            {" "}
            <img src={logo} alt="Logo" className="h-20" />
          </Link>
          <div className="hidden md:flex space-x-6">
            {/* Updated NavLink with active styling */}
            <NavLink
              to="/"
              className={({ isActive }) =>
                `relative uppercase font-bold text-xl ${
                  isActive
                    ? "text-red-500 border-b-2 border-red-500"
                    : "text-black hover:text-red-500"
                }`
              }
            >
              Home
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-red-500 transition-all duration-300 ease-in-out hover:w-full"></span>
            </NavLink>
            <NavLink
              to="/cars"
              className={({ isActive }) =>
                `relative uppercase font-bold text-xl ${
                  isActive
                    ? "text-red-500 border-b-2 border-red-500"
                    : "text-black hover:text-red-500"
                }`
              }
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("#product");
                // handleLinkClick();
              }}
            >
              Cars
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-red-500 transition-all duration-300 ease-in-out hover:w-full"></span>
            </NavLink>
            <NavLink
              to="/all-products"
              className={({ isActive }) =>
                `relative uppercase font-bold text-xl ${
                  isActive
                    ? "text-red-500 border-b-2 border-red-500"
                    : "text-black hover:text-red-500"
                }`
              }
             
            >
              All Cars
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-red-500 transition-all duration-300 ease-in-out hover:w-full"></span>
            </NavLink>
            
            <NavLink
              to="/cars"
              className={({ isActive }) =>
                `relative uppercase font-bold text-xl ${
                  isActive
                    ? "text-red-500 border-b-2 border-red-500"
                    : "text-black hover:text-red-500"
                }`
              }
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("#brand");
                // handleLinkClick();
              }}
            >
              Brands
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-red-500 transition-all duration-300 ease-in-out hover:w-full"></span>
            </NavLink>
            <NavLink
              to="/news"
              className={({ isActive }) =>
                `relative uppercase font-bold text-xl ${
                  isActive
                    ? "text-red-500 border-b-2 border-red-500"
                    : "text-black hover:text-red-500"
                }`
              }
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("#news");
                // handleLinkClick();
              }}
            >
              News
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-red-500 transition-all duration-300 ease-in-out hover:w-full"></span>
            </NavLink>
            <NavLink
              to="/about-us"
              className={({ isActive }) =>
                `relative uppercase font-bold text-xl ${
                  isActive
                    ? "text-red-500 border-b-2 border-red-500"
                    : "text-black hover:text-red-500"
                }`
              }
            >
              About Us
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-red-500 transition-all duration-300 ease-in-out hover:w-full"></span>
            </NavLink>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            {user ? (
              <>
                {user.role === "user" ? (
                  <Link
                    to="/user-dashboard/my-cart"
                    className="relative text-black font-bold text-xl hover:text-red-500"
                  >
                    <ShoppingCart size={24} />
                    {cart?.data?.length > 0 && (
                      <span className="absolute top-[-5px] right-[-10px] bg-red-500 text-white text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center">
                        {cart.data.length}
                      </span>
                    )}
                  </Link>
                ) : (
                  user.role === "admin" && (
                    <Link
                      to="/dashboard/add-car"
                      className="text-black font-bold text-xl hover:text-red-500"
                    >
                      <MdOutlineDashboard size={24} />
                    </Link>
                  )
                )}

                <img
                  title={newUser?.data?.name}
                  className="object-cover h-10 rounded-full cursor-pointer"
                  src={
                    "https://images.unsplash.com/photo-1586287011575-a23134f797f9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=48&q=60"
                  }
                  alt="Avatar"
                  onClick={handleAvatarClick}
                />
              </>
            ) : (
              <Link
                to="/login"
                className="text-black font-bold text-xl hover:text-red-500"
              >
                <User size={24} />
              </Link>
            )}

            {!user && (
              <button className="text-black font-bold text-xl hover:text-red-500">
                <ShoppingCart size={24} />
              </button>
            )}
          </div>

          <div className="md:hidden">
            <button onClick={toggleSidebar} className="text-black">
              <Menu size={24} />
            </button>
          </div>
        </div>
      </nav>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <img src={logo} alt="Logo" className="h-12" />
          <button onClick={toggleSidebar} className="text-black">
            <X size={24} />
          </button>
        </div>
        <div className="flex flex-col space-y-2 p-2">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `block font-bold text-xl px-3 py-2 ${
                isActive
                  ? "text-red-500 border-b-2 border-red-500"
                  : "text-black hover:text-red-500 hover:border-b-2 hover:border-red-500"
              }`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/all-products"
            className={({ isActive }) =>
              `block font-bold text-xl px-3 py-2 ${
                isActive
                  ? "text-red-500 border-b-2 border-red-500"
                  : "text-black hover:text-red-500 hover:border-b-2 hover:border-red-500"
              }`
            }
          >
            Cars
          </NavLink>
          <NavLink
            to="/news"
            className={({ isActive }) =>
              `block font-bold text-xl px-3 py-2 ${
                isActive
                  ? "text-red-500 border-b-2 border-red-500"
                  : "text-black hover:text-red-500 hover:border-b-2 hover:border-red-500"
              }`
            }
          >
            News
          </NavLink>
          <NavLink
            to="/all-products"
            className={({ isActive }) =>
              `block font-bold text-xl px-3 py-2 ${
                isActive
                  ? "text-red-500 border-b-2 border-red-500"
                  : "text-black hover:text-red-500 hover:border-b-2 hover:border-red-500"
              }`
            }
          >
            ALl Cars
          </NavLink>
          <NavLink
            to="/about-us"
            className={({ isActive }) =>
              `block font-bold text-xl px-3 py-2 ${
                isActive
                  ? "text-red-500 border-b-2 border-red-500"
                  : "text-black hover:text-red-500 hover:border-b-2 hover:border-red-500"
              }`
            }
          >
            About Us
          </NavLink>
        </div>

        {/* User Profile and Cart in Sidebar */}
        <div className="flex items-center space-x-6 p-4 border-t">
          {user ? (
            <>
              {user.role === "user" ? (
                <Link
                  to="/user-dashboard/my-cart"
                  className="relative text-black font-bold text-xl hover:text-red-500"
                >
                  <ShoppingCart size={24} />
                  {cart?.data?.length > 0 && (
                    <span className="absolute top-[-5px] right-[-10px] bg-red-500 text-white text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center">
                      {cart.data.length}
                    </span>
                  )}
                </Link>
              ) : (
                user.role === "admin" && (
                  <Link
                    to="/dashboard/add-car"
                    className="text-black font-bold text-xl hover:text-red-500"
                  >
                    <MdOutlineDashboard size={24} />
                  </Link>
                )
              )}

              <img
                title={newUser?.data?.name}
                className="object-cover h-10 rounded-full cursor-pointer"
                src={
                  "https://images.unsplash.com/photo-1586287011575-a23134f797f9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=48&q=60"
                }
                alt="Avatar"
                onClick={handleAvatarClick}
              />
            </>
          ) : (
            <Link
              to="/login"
              className="text-black font-bold text-xl hover:text-red-500"
            >
              <User size={24} />
            </Link>
          )}

          {!user && (
            <button className="text-black font-bold text-xl hover:text-red-500">
              <ShoppingCart size={24} />
            </button>
          )}
        </div>
      </div>

      {/* Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40"
          onClick={toggleSidebar}
        ></div>
      )}
    </>
  );
};

export default Navbar;
