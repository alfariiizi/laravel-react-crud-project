import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";

const DefaultLayout = () => {
  const { user, token } = useStateContext();
  if (!token) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <p>DefaultLayout</p>
      <Outlet />
    </div>
  );
};

export default DefaultLayout;
