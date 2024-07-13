import React, { useEffect, useState } from "react";
import Menubar from "../components/Menubar";
import { BsCart3 } from "react-icons/bs";
import { useNavigate, useParams } from "react-router-dom";
import { useGetOrderQuery } from "../redux/services/orders";

const Orders = () => {
  const [order, setOrder] = useState({});
  const navigate = useNavigate();

  const previousRoute = () => {
    navigate(-1);
  };
  const params = useParams();
  const result = useGetOrderQuery({ id: params.id });
  useEffect(() => {
    if (result) {
      setOrder(result.data?.order);
    }
  }, [result]);
  return result.isLoading ? (
    <div className="flex justify-center items-center">
      <p>Loading...</p>
    </div>
  ) : (
    <main className="bg-[#DADADA] min-h-screen pb-12">
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
        <p className="font-bold text-lg text-gray-600">Transaction</p>
      </header>
      <div className="up flex items-center justify-center gap-[9vw] bg-[#DADADA] py-5 pb-7">
        <div className="icon bg-red-600 p-3 rounded-full">
          <BsCart3 className="text-white text-xl" />
        </div>
        <div className="icon bg-transparent border-gray-600 border p-3 rounded-full">
          <img
            src={require("../assets/reaload-icon.png")}
            alt="reload"
            className=" w-5 "
          />
        </div>
        <div className="icon bg-red-600 p-3 rounded-full">
          <img src={require("../assets/cube.png")} alt="cube" className="w-5" />
        </div>
        <div className="icon bg-red-600 rounded-full w-10 h-10 flex justify-center items-center">
          <img src={require("../assets/done.png")} alt="" className="w-4" />
        </div>
      </div>
      <div className="down bg-white rounded-t-3xl h-fit pb-[4rem] mt-5 flex flex-col gap-4 py-6 px-6 mx-auto">
        <p className=" text-[10px] text-gray-600 ">{order?._id}</p>
        <h1 className="text-lg text-gray-600 font-bold ">Order Summary</h1>
        <div className="order-items flex flex-col gap-3">
          {order?.orderItems?.map((item) => (
            <OrderItem
              price={item.price}
              video={item.isVideo}
              name={item.title}
              quantity={item.qty}
              file={item.file.url}
            />
          ))}
        </div>
        <hr className="mx-5" />
        <div className="payment-info">
          <h1 className="text-lg my-2 text-gray-600 font-bold ">
            Payment Info
          </h1>
          <div className=" text-xs text-gray-600 ">
            Click here to view of update your <p>payment method</p>
          </div>
        </div>
        <hr className="mx-5" />
        <div className="payment-info">
          <h1 className="text-lg my-2 text-gray-600 font-bold ">
            Shipping Info
          </h1>
          <div className=" text-xs text-gray-600 ">
            {order?.status === "Processing" ? (
              <p>
                Your order is being processed and shall be{" "}
                <p> delivered and installed by our Ninja</p>
              </p>
            ) : order?.status === "Shipped" ? (
              "Your order has been installed"
            ) : (
              "Your order has been installed"
            )}
          </div>
        </div>
      </div>
      <Menubar />
    </main>
  );
};

export default Orders;

const OrderItem = ({ quantity, name, price, file, video }) => {
  return (
    <div className="flex gap-x-4 rounded-xl bg-white ">
      <div className="flex gap-1">
        {video ? (
          <video
            src={file}
            className="w-[40%] rounded-xl"
            autoPlay
            muted
          ></video>
        ) : (
          <img src={file} alt="" className="w-[40%] rounded-xl" />
        )}
        <div className="flex flex-col gap-3">
          <p className="text-md text-gray-600 font-semibold">{name}</p>
          <p className="price text-lg font-extrabold">${price}</p>
        </div>
        <div className="flex items-center justify-center  w-[30vw]">
          <div className="border-2 border-gray-200 flex items-center justify-between gap-3">
            <button
              className=" bg-gray-300 w-6 "
              onClick={() => (quantity += 1)}
            >
              +
            </button>
            <button>{quantity}</button>

            <button
              className=" bg-gray-300 w-6 "
              onClick={() => (quantity = -1)}
            >
              -
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
