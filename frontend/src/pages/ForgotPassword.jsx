import React, { useState } from "react";
import MenuBar from "../components/Menubar";
import { useNavigate } from "react-router-dom";
import { useForgotPasswordMutation } from "../redux/services/auth";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const previousRoute = () => {
    navigate(-1);
  };
  const [forgotPassword, result] = useForgotPasswordMutation();
  var handleSubmit = (e) => {
    e.preventDefault();
    forgotPassword({ email });
  };
  return (
    <main className="min-h-screen">
      <header className="h-[10vh] text-white bg-neutral-500 flex items-center">
        <span className="mx-7 text-2xl" onClick={previousRoute}>
          <svg
            onClick={previousRoute}
            id="Layer_1"
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 31.09 54.68"
            className="w-2 "
          >
            <defs>
              <style></style>
            </defs>
            <path
              style={{ fill: "#ffffff" }}
              className="cls-1"
              d="M335.08,357.68,313,335.61,334.6,314a2.78,2.78,0,0,0,0-3.92l-.79-.79a2.78,2.78,0,0,0-3.91,0l-24.3,24.3a2.79,2.79,0,0,0,0,3.92l24.78,24.85a2.78,2.78,0,0,0,3.91,0l.79-.79A2.78,2.78,0,0,0,335.08,357.68Z"
              transform="translate(-304.8 -308.51)"
            />
          </svg>
        </span>
        <p>Forgot Password</p>
      </header>
      <div className="container mx-auto flex justify-center items-center h-[80vh]">
        <div className="bg-gray-100 text-black flex flex-col text-2xl justify-center gap-3 items-center h-[50vh] w-full">
          {/* <h1 className="text-xl font-bold">Enter your email</h1> */}
          <form onSubmit={handleSubmit} className="w-3/4">
            <div className="relative z-0 w-full mb-6 group">
              <input
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block text-black py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-red-500 focus:outline-none focus:ring-0 focus:border-red-600 peer"
                placeholder=" "
                required
              />
              <label
                htmlFor="email"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-red-600 peer-focus:dark:text-red-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Email
              </label>
            </div>
            {result.isSuccess ? (
              <div className="text-green-500 text-xs -mt-3 mb-4">
                {result.data?.message}
              </div>
            ) : (
              <div className="text-red-500 text-xs -mt-3 mb-4">
                {result.error?.data?.message}
              </div>
            )}
            <button
              type="submit"
              disabled={result.isLoading}
              className="text-white disabled:bg-red-400 bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
            >
              Send Email
            </button>
          </form>
        </div>
      </div>
      <MenuBar />
    </main>
  );
};

export default ForgotPassword;
