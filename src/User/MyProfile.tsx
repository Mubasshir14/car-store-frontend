/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useChangePasswordMutation, useGetMeQuery } from "@/redux/features/Admin/userManagementApi";
import { logout, useCurrentUser } from "@/redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { Button, Input } from "antd";
import { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const MyProfile = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
  });
  const dispatch = useAppDispatch();
  const user = useAppSelector(useCurrentUser);
  const { data: newUser } = useGetMeQuery({
    email: user?.email,
    role: user?.role,
  });
  const [changePassword] = useChangePasswordMutation();
  const navigate = useNavigate();

  const handleLogOut = async () => {
    try {
      dispatch(logout());
      toast.success("Successfully logged out!");
      navigate("/");
    } catch (error) {
      console.error("Error logging out", error);
      toast.error("An error occurred while logging out. Please try again.");
    }
  };

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response: any = await changePassword(formData);
      if (response?.data?.success) {
        toast.success("Password changed successfully!");
        setIsModalOpen(false);
        setFormData({ oldPassword: "", newPassword: "" });
        dispatch(logout());
        navigate("/login");
      } else {
        toast.error(response?.data?.message || "Failed to change password.");
      }
    } catch (error) {
      console.error("Error changing password", error);
      toast.error("An error occurred while changing the password. Please try again.");
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="flex justify-center items-center my-20 bg-gradient-to-r from-indigo-50 to-blue-50">
      <Card className="w-full max-w-md bg-white shadow-xl rounded-2xl">
        <CardHeader className="text-center p-3">
          <div className="flex justify-center">
            <img
              src={
                newUser?.data?.image ||
                "https://images.unsplash.com/photo-1586287011575-a23134f797f9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=48&q=60"
              }
              alt="Profile"
              className="w-24 h-24 rounded-full shadow-md object-cover border-4 border-blue-200"
            />
          </div>
          <CardTitle className="mt-4 text-2xl font-bold text-gray-800">
            {newUser?.data?.name || "John Doe"}
          </CardTitle>
          <p className="text-gray-500 text-sm uppercase mt-1">
            {newUser?.data?.role || "User Role"}
          </p>
        </CardHeader>
        <CardContent>
          <div className="text-center space-y-2">
            <p className="text-gray-600 text-base">
              <span className="font-medium text-gray-800">Email:</span>{" "}
              {newUser?.data?.email || "user@example.com"}
            </p>
            <p className="text-gray-600 text-base">
              <span className="font-medium text-gray-800">Phone:</span>{" "}
              {newUser?.data?.phone || "N/A"}
            </p>
            <p className="text-gray-600 text-base">
              <span className="font-medium text-gray-800">Address:</span>{" "}
              {newUser?.data?.address || "N/A"}
            </p>
            <p className="text-gray-600 text-base">
              <span className="font-medium text-gray-800">City:</span>{" "}
              {newUser?.data?.city || "N/A"}
            </p>
          </div>
          <div className="mt-8 flex flex-col gap-4">
            <Button
              className="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-3 rounded-lg transition duration-300 shadow-md hover:shadow-lg"
              onClick={() => setIsModalOpen(true)}
            >
              Change Password
            </Button>
            <Button
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 rounded-lg transition duration-300 shadow-md hover:shadow-lg"
              onClick={handleLogOut}
            >
              Logout
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Change Password Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="bg-white p-6 rounded-lg shadow-lg max-w-sm">
          <DialogHeader>
            <DialogTitle className="text-red-500 text-lg font-semibold">
              Change Password
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleFormSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="oldPassword"
                className="block text-sm font-medium text-gray-700"
              >
                Old Password
              </label>
              <Input
                id="oldPassword"
                name="oldPassword"
                type="password"
                value={formData.oldPassword}
                onChange={handleInputChange}
                required
                className="mt-1"
              />
            </div>
            <div>
              <label
                htmlFor="newPassword"
                className="block text-sm font-medium text-gray-700"
              >
                New Password
              </label>
              <Input
                id="newPassword"
                name="newPassword"
                type="password"
                value={formData.newPassword}
                onChange={handleInputChange}
                required
                className="mt-1"
              />
            </div>
            <div className="flex justify-end gap-4 mt-4">
              <Button onClick={() => setIsModalOpen(false)}>Cancel</Button>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MyProfile;
