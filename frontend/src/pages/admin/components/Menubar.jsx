import React from "react";
import { Link } from "react-router-dom";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { LiaClipboardListSolid } from "react-icons/lia";
import { BiHome } from "react-icons/bi";

const Menubar = () => {
  return (
    <menu className="fixed bottom-0 w-full  shadow-2xl shadow-black">
      <div className="links flex items-center justify-around w-full h-[10vh] bg-white rounded-b-lg text-slate-500 fill-slate-500">
        <Link to="/admin/">
          <div className="flex flex-col items-center ">
            <BiHome className="w-[7vw] h-[70%]" />
            <span>Home</span>
          </div>
        </Link>
        <Link to="/admin/products">
          <div className="flex flex-col items-center ">
            <MdOutlineProductionQuantityLimits className="w-[7vw] h-[70%]" />
            <span>Products</span>
          </div>
        </Link>
        <Link to="/admin/orders">
          <div className="flex flex-col items-center ">
            <LiaClipboardListSolid className="w-[7vw] h-[60%]" />
            <span>Orders</span>
          </div>
        </Link>
        <Link to="/account">
          <div className="flex flex-col items-center w-[5vw] fill-slate-500">
            <AccountIcon />
            <span>Account</span>
          </div>
        </Link>
      </div>
    </menu>
  );
};

export default Menubar;

const AccountIcon = () => (
  <svg
    id="Layer_1"
    data-name="Layer 1"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 59.78 78.14"
    className="fill-slate-500"
  >
    <defs>
      <style></style>
    </defs>
    <path
      className="cls-1"
      d="M1433.78,2769.12H1406a16,16,0,0,1-16-16v-14.29a6.9,6.9,0,0,1,6.5-6.88,115.4,115.4,0,0,1,46.79,0,6.9,6.9,0,0,1,6.49,6.88v14.29A16,16,0,0,1,1433.78,2769.12Zm-36.86-30.54a.23.23,0,0,0-.23.23v14.29a9.35,9.35,0,0,0,9.35,9.35h27.74a9.36,9.36,0,0,0,9.36-9.35v-14.29a.23.23,0,0,0-.23-.23l-.68-.07a108.59,108.59,0,0,0-44.63,0Z"
      transform="translate(-1390.02 -2690.97)"
    />
    <path
      className="cls-1"
      d="M1419.91,2727.22a16,16,0,0,1-16-15.95v-4.35a15.95,15.95,0,1,1,31.9,0v4.35A16,16,0,0,1,1419.91,2727.22Zm0-29.58a9.29,9.29,0,0,0-9.28,9.28v4.35a9.29,9.29,0,1,0,18.57,0v-4.35A9.3,9.3,0,0,0,1419.91,2697.64Z"
      transform="translate(-1390.02 -2690.97)"
    />
  </svg>
);
