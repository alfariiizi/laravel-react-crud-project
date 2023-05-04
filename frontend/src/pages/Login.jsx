import React, { useRef, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/ContextProvider";

const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { setUser, setToken } = useStateContext();
  const [errorMessage, setErrorMessage] = useState(null);
  const [isPasswordShown, setIsPasswordShown] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrorMessage(null);

    const payload = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    try {
      const result = await axiosClient.post("/login", payload);

      // Jika Auth::attempt me-return false
      if (result.data.message) {
        setErrorMessage(result.data.message);
      }

      setUser(result.data.user);
      setToken(result.data.token);
    } catch (error) {
      // Jika $request->validated() tidak sukses (tidak sesuai rule)
      console.error(error.response.data);
      setErrorMessage("Provided email address or password is incorrect");
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-200 font-inter">
      <div className="flex flex-col gap-5 rounded border-2 border-black bg-white p-8">
        <h1 className="text-center text-2xl">Login into your account</h1>
        {errorMessage && (
          <div className="rounded-lg bg-red-600 p-2 text-slate-200">
            {errorMessage}
          </div>
        )}
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
            ref={emailRef}
            className="rounded border-2 p-2"
          />
          <div className="flex items-center gap-2">
            <input
              type={isPasswordShown ? "text" : "password"}
              name="user_password"
              id="user_password"
              placeholder="Password"
              required
              ref={passwordRef}
              className="flex-1 rounded border-2 p-2"
            />
            <div
              className="cursor-pointer"
              onClick={() => {
                setIsPasswordShown(!isPasswordShown);
              }}>
              {isPasswordShown ? <FaEye /> : <FaEyeSlash />}
            </div>
          </div>
          <button
            type="submit"
            className="cursor-pointer rounded bg-gradient-to-tr from-teal-700 to-purple-700 p-2 text-slate-200 duration-150 hover:bg-gradient-to-br hover:from-purple-800 hover:to-teal-800">
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
