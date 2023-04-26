import React, { useRef } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/ContextProvider";

const Signup = () => {
  const firstnameRef = useRef();
  const lastnameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfRef = useRef();

  const { setUser, setToken } = useStateContext();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      firstname: firstnameRef.current.value,
      lastname: lastnameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      password_confirmation: passwordConfRef.current.value,
    };

    const result = await axiosClient.post("/signup", payload);
    try {
      setUser(result.data.user);
      setToken(result.data.token);
    } catch {
      if (result.status === 422) {
        console.log(result.data.errors);
      }
    }
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
            ref={firstnameRef}
            className="rounded border-2 p-2"
          />
          <input
            type="text"
            name="last_name"
            id="last_name"
            placeholder="Last Name"
            required
            ref={lastnameRef}
            className="rounded border-2 p-2"
          />
          <input
            type="email"
            name="user_email"
            id="user_email"
            placeholder="Email"
            required
            ref={emailRef}
            className="rounded border-2 p-2"
          />
          <input
            type="password"
            name="user_password"
            id="user_password"
            placeholder="Password"
            required
            ref={passwordRef}
            className="rounded border-2 p-2"
          />
          <input
            type="password"
            name="confirm_user_password"
            id="confirm_user_password"
            placeholder="Password Confirmation"
            required
            ref={passwordConfRef}
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
