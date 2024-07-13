import React, { useEffect } from "react";
import Menubar from "./components/Menubar";
import { useLoadUserQuery } from "../../redux/services/auth";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const result = useLoadUserQuery();
  const navigate = useNavigate();
  useEffect(() => {
    if (result.data) {
      if (result.data?.user.role !== "admin") {
        navigate("/");
      }
    }
  }, [result, navigate]);
  return (
    <main className="bg-[#DADADA] min-h-screen">
      <header className="flex items-center h-[8vh] bg-white p-10 gap-4">
        <svg
          onClick={() => navigate("/")}
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
        <p className="font-bold text-lg text-gray-600">Admin Panel</p>
      </header>
      <div className="up flex items-center justify-center gap-[9vw] bg-[#DADADA] ">
        <img src="/admin.jpg" alt="" className="w-screen h-[75vw] " />
      </div>
      <div className="down bg-white  h-fit pb-[8rem] flex flex-col gap-4 pt-4 px-6 mx-auto">
        <Link to={"/admin/products"} className="payment-info">
          <h1 className="text-lg my-2 text-gray-600 font-bold ">Products</h1>
          <div className=" text-xs text-gray-600 ">
            Click here to view, update and delete your <b>products</b>
          </div>
        </Link>
        <hr className="mx-5" />
        <Link to="/admin/orders" className="payment-info">
          <h1 className="text-lg my-2 text-gray-600 font-bold ">Orders</h1>
          <div className=" text-xs text-gray-600 ">
            Click here to view all your pending and completed <b>orders</b>
          </div>
        </Link>
        <hr className="mx-5" />
        <Link to="/admin/users" className="payment-info">
          <h1 className="text-lg my-2 text-gray-600 font-bold ">Users</h1>
          <div className=" text-xs text-gray-600 ">
            Click here to view and delete any <b>user</b> of your website
          </div>
        </Link>
        <hr className="mx-5" />
        <Link to="/admin/features" className="payment-info">
          <h1 className="text-lg my-2 text-gray-600 font-bold ">Features</h1>
          <div className=" text-xs text-gray-600 ">
            Add more features to be displayed on the home page
          </div>
        </Link>
      </div>
      <Menubar />
    </main>
  );
};

export default Home;
