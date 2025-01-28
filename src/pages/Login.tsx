/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import {
  useForm,
  Controller,
  SubmitHandler,
  FieldValues,
} from "react-hook-form";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  useLoginMutation,
  useRegisterMutation,
} from "@/redux/features/auth/authApi";
import { useNavigate, Navigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import {
  useCurrentUser,
  setUser,
  logout,
} from "@/redux/features/auth/authSlice";
import { verifyToken } from "@/utils/verifyTokem";
import { toast } from "sonner";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector(useCurrentUser);
  console.log(user);

  const [register, { isLoading: rLoading }] = useRegisterMutation();
  const [login, { isLoading: lLoading }] = useLoginMutation();

  const [tab, setTab] = useState("login");

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>();

  
  const handleLogin: SubmitHandler<FieldValues> = async (data) => {
    const toastId = "login-toast";
    try {
      const res = await login(data).unwrap();
      const user = verifyToken(res.data);
      dispatch(setUser({ token: res.data, user }));
      toast.success("Logged in successfully", { id: toastId });
      navigate("/");
    } catch (err: any) {
      toast.error(err?.data?.message || "Something went wrong", {
        id: toastId,
      });
    }
  };

  const handleRegister: SubmitHandler<FieldValues> = async (data) => {
    const toastId = "register-toast";
    try {
      await register(data).unwrap();
      toast.success("Registered successfully. Please Login now.", {
        id: toastId,
      });
      navigate("/login");
      setTab("login");
      dispatch(logout());
    } catch (err: any) {
      toast.error(err?.data?.message || "Something went wrong", {
        id: toastId,
      });
    }
  };

  if (user) {
    return <Navigate to="/" />;
  }

  return (
    <div className="flex items-center justify-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
      <Card className="w-full p-4 max-w-md shadow-md rounded-lg">
        <CardContent>
          <Tabs defaultValue="login" value={tab} onValueChange={setTab}>
            <TabsList className="flex justify-center mb-6">
              <TabsTrigger
                value="login"
                className="flex-1 font-bold text-red-500"
              >
                Login
              </TabsTrigger>
              <TabsTrigger
                value="register"
                className="flex-1 font-bold text-red-500"
              >
                Register
              </TabsTrigger>
            </TabsList>

            {/* Login Tab */}
            <TabsContent value="login">
              <form onSubmit={handleSubmit(handleLogin)}>
                <div className="relative mb-4">
                  <label className="block text-sm text-gray-700 dark:text-gray-300 font-bold">
                    Email
                  </label>
                  <Controller
                    name="email"
                    control={control}
                    render={({ field }) => (
                      <input
                        {...field}
                        type="email"
                        className="block w-full px-3 py-2 mt-1 text-gray-700 bg-white border rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
                        placeholder="Enter your email"
                      />
                    )}
                  />
                </div>

                <div className="relative mb-4">
                  <label className="block text-sm font-bold text-gray-700">
                    Password
                  </label>
                  <Controller
                    name="password"
                    control={control}
                    render={({ field }) => (
                      <input
                        {...field}
                        type="text"
                        className="block w-full px-3 py-2 mt-1 text-gray-700 bg-white border rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
                        placeholder="Enter your password"
                      />
                    )}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600"
                  disabled={lLoading}
                >
                  {lLoading ? "Logging in..." : "Login"}
                </button>
              </form>
            </TabsContent>

            {/* Register Tab */}
            <TabsContent value="register">
              <form onSubmit={handleSubmit(handleRegister)}>
                <div className="relative mb-4">
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300">
                    Name
                  </label>
                  <Controller
                    name="name"
                    control={control}
                    render={({ field }) => (
                      <input
                        {...field}
                        type="text"
                        className="block w-full px-3 py-2 mt-1 text-gray-700 bg-white border rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
                        placeholder="Enter your username"
                      />
                    )}
                  />
                </div>

                <div className="relative mb-4">
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300">
                    Email
                  </label>
                  <Controller
                    name="email"
                    control={control}
                    render={({ field }) => (
                      <input
                        {...field}
                        type="email"
                        className="block w-full px-3 py-2 mt-1 text-gray-700 bg-white border rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
                        placeholder="Enter your email"
                      />
                    )}
                  />
                </div>

                <div className="relative mb-4">
                  <label className="block text-sm font-bold text-gray-700">
                    Password
                  </label>
                  <Controller
                    name="password"
                    control={control}
                    render={({ field }) => (
                      <input
                        {...field}
                        type="password"
                        className="block w-full px-3 py-2 mt-1 text-gray-700 bg-white border rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
                        placeholder="Enter your password"
                      />
                    )}
                  />
                </div>

                <div className="relative mb-4">
                  <label className="block text-sm font-bold text-gray-700">
                    Phone
                  </label>
                  <Controller
                    name="phone"
                    control={control}
                    render={({ field }) => (
                      <input
                        {...field}
                        type="text"
                        className="block w-full px-3 py-2 mt-1 text-gray-700 bg-white border rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
                        placeholder="Enter your phone number"
                      />
                    )}
                  />
                </div>
                <div className="relative mb-4">
                  <label className="block text-sm font-bold text-gray-700">
                    Address
                  </label>
                  <Controller
                    name="address"
                    control={control}
                    render={({ field }) => (
                      <input
                        {...field}
                        type="text"
                        className="block w-full px-3 py-2 mt-1 text-gray-700 bg-white border rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
                        placeholder="Enter your address"
                      />
                    )}
                  />
                </div>
                <div className="relative mb-4">
                  <label className="block text-sm font-bold text-gray-700">
                    City
                  </label>
                  <Controller
                    name="city"
                    control={control}
                    render={({ field }) => (
                      <input
                        {...field}
                        type="text"
                        className="block w-full px-3 py-2 mt-1 text-gray-700 bg-white border rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
                        placeholder="Enter your city"
                      />
                    )}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600"
                  disabled={rLoading}
                >
                  {rLoading ? "Registering..." : "Register"}
                </button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
