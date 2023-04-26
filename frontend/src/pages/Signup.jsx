import React, { useState } from "react";
import { Link } from "react-router-dom";

const Signup = () => {
  const [firstname, setFirstname] = useState("");
  const [lastName, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-200">
      <div className="flex flex-col gap-5 rounded border-2 border-black bg-white p-8">
        <h1 className="text-center text-2xl">Signup for free</h1>
        <form
          action=""
          onSubmit={handleSubmit}
          className="flex flex-col gap-2 bg-white">
          <input
            type="text"
            name="first_name"
            id="first_name"
            placeholder="First Name"
            required
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
            className="rounded border-2 p-2"
          />
          <input
            type="text"
            name="last_name"
            id="last_name"
            placeholder="Last Name"
            required
            value={lastName}
            onChange={(e) => setLastname(e.target.value)}
            className="rounded border-2 p-2"
          />
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
          <input
            type="password"
            name="confirm_user_password"
            id="confirm_user_password"
            placeholder="Password Confirmation"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="rounded border-2 p-2"
          />
          <button
            type="submit"
            className="rounded bg-teal-700 p-2 text-slate-200 duration-150 hover:bg-teal-800">
            Signup
          </button>
        </form>
        <div>
          Already registered?{" "}
          <Link
            to="/login"
            className="text-teal-800 no-underline underline-offset-2 duration-150 hover:text-teal-900 hover:underline">
            Login to your account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
