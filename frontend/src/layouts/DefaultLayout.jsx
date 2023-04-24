import React from "react";
import { Outlet } from "react-router-dom";

const DefaultLayout = () => {
  return (
    <div>
      <p>DefaultLayout</p>
      <Outlet />
    </div>
  );
};

export default DefaultLayout;
