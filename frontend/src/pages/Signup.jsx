import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/ContextProvider";

const Signup = () => {
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfRef = useRef();

  const { setUser, setToken } = useStateContext();

  // For handling error message like password not same, etc.
  const [errorMessages, setErrorMessages] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessages(null);

    const payload = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      password_confirmation: passwordConfRef.current.value,
    };

    try {
      const result = await axiosClient.post("/signup", payload);
      setUser(result.data.user);
      setToken(result.data.token);

      // console.log({
      //   user: result.data.user,
      //   token: result.data.token,
      // });
    } catch (error) {
      setErrorMessages(error.response.data.errors.password);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-200 font-inter">
      <div className="flex flex-col gap-5 rounded border-2 border-black bg-white p-8">
        <h1 className="text-center text-2xl">Signup for free</h1>
        {errorMessages && (
          <ul className="flex flex-col rounded-lg bg-red-600 p-2 text-slate-200">
            {errorMessages.map((error, index) => (
              <li key={index} className="">
                {error}
              </li>
            ))}
          </ul>
        )}
        <form
          action=""
          onSubmit={handleSubmit}
          className="flex flex-col gap-2 bg-white">
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Full Name"
            required
            ref={nameRef}
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
            className="cursor-pointer rounded bg-gradient-to-tr from-teal-700 to-purple-700 p-2 text-slate-200 duration-150 hover:bg-gradient-to-br hover:from-purple-800 hover:to-teal-800">
            Login
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
