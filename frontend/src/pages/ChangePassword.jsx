import React, { useState } from "react";
import Menubar from "../components/Menubar";
import { useNavigate } from "react-router-dom";
import { useChangePasswordMutation } from "../redux/services/auth";

const ChangePassword = () => {
  const [disabled, setDisabled] = useState(true);
  const [newPassword, setNewPassword] = useState("");
  const [cNewPassword, setCNewPassword] = useState("");
  const navigate = useNavigate();
  const previousRoute = () => {
    navigate(-1);
  };
  const [changePassword] = useChangePasswordMutation();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (e.target[1].value === e.target[2].value) {
      changePassword({
        oldPassword: e.target[0].value,
        newPassword: e.target[1].value,
      });
    }
    e.target[0].value = "";
    setNewPassword("");
    setCNewPassword("");
  };
  return (
    <main>
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
        <p>Change Password</p>
      </header>
      <div className="flex flex-col gap-3 items-center justify-center w-[75%] mx-auto my-4">
        <h1 className="text-xl font-bold">Change Your Password</h1>
        <form className="my-4 w-full" onSubmit={handleSubmit}>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="password"
              name="opassword"
              id="opassword"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-red-500 focus:outline-none focus:ring-0 focus:border-red-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="opassword"
              className=" left-0 peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-red-600 peer-focus:dark:text-red-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Old Password
            </label>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="password"
              name="newpassword"
              id="newpassword"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-red-500 focus:outline-none focus:ring-0 focus:border-red-600 peer"
              onChange={(e) => setNewPassword(e.target.value)}
              value={newPassword}
              placeholder=" "
              required
            />
            <label
              htmlFor="newpassword"
              className=" left-0 peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-red-600 peer-focus:dark:text-red-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              New Password
            </label>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="password"
              name="cnewpassword"
              value={cNewPassword}
              onChange={(e) => setCNewPassword(e.target.value)}
              id="cnewpassword"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-red-500 focus:outline-none focus:ring-0 focus:border-red-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="cnewpassword"
              className=" left-0 peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-red-600 peer-focus:dark:text-red-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Confirm New Password
            </label>
          </div>
          <button
            disabled={
              newPassword !== cNewPassword || !newPassword || !cNewPassword
            }
            className="disabled:bg-red-400 bg-red-600 text-white px-5 py-2 rounded-lg"
          >
            Confirm
          </button>
        </form>
      </div>
      <Menubar />
    </main>
  );
};

export default ChangePassword;
