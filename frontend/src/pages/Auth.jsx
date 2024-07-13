import React, { useEffect, useState } from "react";
import Menubar from "../components/Menubar";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import {
  useLoadUserQuery,
  useLoginMutation,
  useRegisterMutation,
} from "../redux/services/auth";

const Auth = () => {
  const [login, setLogin] = useState(true);
  const [register, serRegister] = useState(false);
  const navigate = useNavigate();
  const result = useLoadUserQuery();
  useEffect(() => {
    setTimeout(() => {
      if (result.isSuccess) {
        navigate("/account");
      }
    }, 200);
  }, [result, navigate]);

  const previousRoute = () => {
    navigate(-1);
  };
  return (
    <main className="bg-[#DADADA] min-h-screen ">
      <header className="flex items-center h-[8vh] bg-[#DADADA] p-10 gap-4">
        <svg
          onClick={previousRoute}
          id="Layer_1"
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 31.09 54.68"
          className="w-2"
        >
          <defs>
            <style></style>
          </defs>
          <path
            style={{ fill: "#3c3c3b" }}
            className="cls-1"
            d="M335.08,357.68,313,335.61,334.6,314a2.78,2.78,0,0,0,0-3.92l-.79-.79a2.78,2.78,0,0,0-3.91,0l-24.3,24.3a2.79,2.79,0,0,0,0,3.92l24.78,24.85a2.78,2.78,0,0,0,3.91,0l.79-.79A2.78,2.78,0,0,0,335.08,357.68Z"
            transform="translate(-304.8 -308.51)"
          />
        </svg>
        <p className="font-bold text-lg text-gray-600">
          {login ? "Login" : "Register"}
        </p>
      </header>
      <div className="up flex flex-col items-center justify-center bg-[#DADADA] py-5 pb-7">
        <svg
          id="Layer_1"
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 320.65 387.48"
          className="w-16"
        >
          <defs>
            <style></style>
          </defs>
          <path
            className="cls-1 fill-[#f4a5af]"
            d="M788.63,1059.71h0S626.92,1021.8,628.31,915.83c.52-40,0-160,0-160a70.32,70.32,0,0,1,49.3-67c71.71-22.64,145.63-22,221.7,1.2A70.15,70.15,0,0,1,949,757.13v158.7C949,1004.38,841.74,1050.8,788.63,1059.71Z"
            transform="translate(-628.3 -672.23)"
          />
          <path
            className="cls-2 fill-[#e30613] "
            d="M788.63,1025.25h0C745,1017.92,656.83,979.76,656.83,907V759.81A35.81,35.81,0,0,1,680,726.41c69.76-26.67,142.11-26.12,216.94.64a35.59,35.59,0,0,1,23.53,33.55V907C920.39,994.83,788.63,1025.25,788.63,1025.25Z"
            transform="translate(-628.3 -672.23)"
          />
          <path
            className="cls-3 fill-[#fff] "
            d="M858.55,823.94v-.34c0-35.9-26.22-65.1-58.45-65.1H783.57c-32.23,0-58.45,29.2-58.45,65.1v.34h-.61v100.9H859.16V823.94Zm-112.62-.34c0-23.12,16.89-41.92,37.64-41.92H800.1c20.75,0,37.64,18.8,37.64,41.92v.34H745.93Z"
            transform="translate(-628.3 -672.23)"
          />
        </svg>
        <h1 className="text-xl text-gray-600 font-bold ">Secure Access</h1>
      </div>
      <div className="down bg-white rounded-t-3xl h-fit mt-5 flex flex-col gap-4 py-6 px-6 mx-auto">
        <div className="sections mt-5">
          <div className="texts flex justify-around cursor-pointer">
            <span
              onClick={() => {
                setLogin(true);
                serRegister(false);
              }}
              className="text-lg relative flex justify-center tems-center"
            >
              Login
              <hr
                className={`absolute top-7 ${
                  login ? "border-red-500" : " border-b-gray-200"
                } w-[50vw] my-2 transition-all `}
              />
            </span>
            <span
              onClick={() => {
                serRegister(true);
                setLogin(false);
              }}
              className="text-lg relative flex justify-center tems-center"
            >
              Register
              <hr
                className={`absolute top-7 ${
                  register ? " border-red-500" : " border-b-gray-200"
                } w-[50vw] my-2 transition-all `}
              />
            </span>
          </div>
          {login ? <Login /> : register && <Register />}
        </div>
      </div>
      <Menubar />
    </main>
  );
};

export default Auth;

const Login = () => {
  const [login, result] = useLoginMutation();
  const navigate = useNavigate();
  const handleLogin = (e) => {
    e.preventDefault();
    login({ username: e.target[0].value, password: e.target[1].value });
  };
  if (result.isSuccess) {
    navigate("/account");
  }
  return (
    <>
      <main className="my-14">
        <form onSubmit={handleLogin}>
          <label htmlFor="username" className="my-5 text-gray-400">
            Username
          </label>
          <input
            type="text"
            id="username"
            className="outline-none border-b-2 mb-12 w-[90%] my-3 focus:border-red-400 transition-all "
          />
          <label htmlFor="password" className="mt-5 text-gray-400">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="outline-none border-b-2 w-[90%] my-3 focus:border-red-400 transition-all "
          />
          <div className="options text-center my-4">
            <button
              type="submit"
              disabled={result.isLoading}
              className="mx-auto w-[90%] disabled:bg-red-300 py-4 rounded-full bg-red-600 text-white"
            >
              Login Now
            </button>
            <Link to="/forgotpassword">
              <p className="text-base mt-6 text-red-600 underline">
                Forgot Password
              </p>
            </Link>
          </div>
        </form>
      </main>
    </>
  );
};

const Register = () => {
  const [register, result] = useRegisterMutation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const handleRegister = (e) => {
    e.preventDefault();
    register({
      username: e.target[0].value,
      email: e.target[1].value,
      password: e.target[2].value,
      phone: e.target[3].value,
      city: e.target[4].value,
      state: e.target[5].value,
      street: e.target[6].value,
      pincode: e.target[7].value,
      code: searchParams.get("code"),
    });
  };
  if (result.isSuccess) {
    navigate("/account");
  }
  return (
    <>
      <main className="my-10">
        <form className="flex flex-col" onSubmit={handleRegister}>
          <div className="flex flex-col">
            <label htmlFor="username" className="mt-5 text-gray-400">
              Username
            </label>
            <input
              type="text"
              id="username"
              required
              className="outline-none border-b-2 w-[90%] my-3 focus:border-red-400 transition-all "
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="email" className="mt-5 text-gray-400">
              Email
            </label>
            <input
              type="email"
              id="email"
              required
              className="outline-none border-b-2 w-[90%] my-3 focus:border-red-400 transition-all "
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="password" className="mt-5 text-gray-400">
              Password
            </label>
            <input
              type="password"
              id="password"
              required
              className="outline-none border-b-2 w-[90%] my-3 focus:border-red-400 transition-all "
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="phone" className="mt-5 text-gray-400">
              Phone
            </label>
            <input
              type="number"
              id="phone"
              required
              className="outline-none border-b-2 w-[90%] my-3 focus:border-red-400 transition-all "
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="text" className="mt-5 text-gray-400">
              City
            </label>
            <input
              type="text"
              id="text"
              required
              className="outline-none border-b-2 w-[90%] my-3 focus:border-red-400 transition-all "
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="state" className="mt-5 text-gray-400">
              State
            </label>
            <input
              type="text"
              id="state"
              required
              className="outline-none border-b-2 w-[90%] my-3 focus:border-red-400 transition-all "
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="street" className="mt-5 text-gray-400">
              Street
            </label>
            <input
              type="text"
              id="street"
              required
              className="outline-none border-b-2 w-[90%] my-3 focus:border-red-400 transition-all "
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="zip" className="mt-5 text-gray-400">
              Zip Code
            </label>
            <input
              type="text"
              id="zip"
              maxLength={5}
              required
              className="outline-none border-b-2 w-[90%] my-3 focus:border-red-400 transition-all "
            />
          </div>
          <div className="options text-center my-4 mb-10">
            <button
              type="submit"
              disabled={result.isLoading}
              className="mx-auto w-[90%] disabled:bg-red-300 py-4 rounded-full bg-red-600 text-white"
            >
              Register Now
            </button>
          </div>
        </form>
      </main>
    </>
  );
};
