import React, { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-200">
      <div className="flex flex-col gap-5 rounded border-2 border-black bg-white p-8">
        <h1 className="text-center text-2xl">Login into your account</h1>
        <form
          action=""
          onSubmit={handleSubmit}
          className="flex flex-col gap-2 bg-white">
          <input
            type="email"
            name="user_email"
            id="user_email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="rounded border-2 p-2"
          />
          <input
            type="password"
            name="user_password"
            id="user_password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="rounded border-2 p-2"
          />
          <button
            type="submit"
            className="rounded bg-teal-700 p-2 text-slate-200 duration-150 hover:bg-teal-800">
            Login
          </button>
        </form>
        <div>
          Not registered yet?{" "}
          <Link
            to="/signup"
            className="text-teal-800 no-underline underline-offset-2 duration-150 hover:text-teal-900 hover:underline">
            Create an account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
