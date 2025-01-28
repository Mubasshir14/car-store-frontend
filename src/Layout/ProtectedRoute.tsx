import {
  logout,
  TUser,
  useCurrentToken,
} from "@/redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { verifyToken } from "@/utils/verifyTokem";

import { ReactNode } from "react";
import { Navigate } from "react-router";

const ProtectedRoute = ({
  children,
  role,
}: {
  children: ReactNode;
  role?: string;
}) => {
  const dispatch = useAppDispatch();
  const token = useAppSelector(useCurrentToken);

  let user;

  if (token) {
    user = verifyToken(token) as TUser | undefined;
  }

  if (role !== undefined && user?.role !== role) {
    dispatch(logout());
    return <Navigate to={"/login"}></Navigate>;
  }

  if (!token) {
    return <Navigate to={"/login"}></Navigate>;
  }

  return children;
};

export default ProtectedRoute;
