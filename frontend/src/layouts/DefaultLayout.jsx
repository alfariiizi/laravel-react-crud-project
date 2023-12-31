import React from "react";
import { Navigate, Outlet, Link } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import axiosClient from "../axios-client";

const DefaultLayout = () => {
  const { user, token } = useStateContext();
  if (!token) {
    return <Navigate to="/login" />;
  }

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      debugger;
      // const result = await axiosClient.post("/logout");
      localStorage.removeItem("ACCESS_TOKEN");
      window.location.reload(); // Reload the current page
    } catch (error) {
      console.error(error.response);
    }
  };

  return (
    <div className="flex h-screen">
      <aside className="flex flex-col gap-1 bg-teal-800 p-4 text-slate-200">
        <Link
          to={"/dashboard"}
          className="w-[14ch] rounded bg-inherit p-3 duration-200 hover:bg-teal-900">
          Dashboard
        </Link>
        <Link
          to={"/users"}
          className="w-[14ch] rounded bg-inherit p-3 duration-200 hover:bg-teal-900">
          Users
        </Link>
      </aside>
      <div className="flex w-full flex-col">
        <header className="flex w-full items-center justify-between px-10 py-6">
          <h1>Header</h1>
          <div className="flex items-center gap-3">
            <div className="capitalize">{user.name}</div>
            <button
              onClick={handleLogout}
              className="rounded bg-red-600 p-1 text-slate-200 duration-150 hover:bg-red-700">
              Logout
            </button>
          </div>
        </header>
        <main className="h-screen w-full bg-gray-200 p-5">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DefaultLayout;
