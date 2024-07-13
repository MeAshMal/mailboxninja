import React, { useEffect } from "react";
import Menubar from "../components/Menubar";
import { useLoadUserQuery } from "../../../redux/services/auth";
import { Link, useNavigate } from "react-router-dom";
import {
  useGetAllOrdersQuery,
  useProcessOrderMutation,
} from "../../../redux/services/orders";
import "./orders.css";

const Orders = () => {
  const resultAuth = useLoadUserQuery();
  const navigate = useNavigate();
  useEffect(() => {
    if (resultAuth.data) {
      if (resultAuth.data?.user.role !== "admin") {
        navigate("/");
      }
    }
  }, [resultAuth, navigate]);
  const result = useGetAllOrdersQuery();

  const [orderProcess, orderProcessResult] = useProcessOrderMutation();

  const processOrder = (id) => {
    orderProcess({ id });
  };
  return result.isLoading ? (
    <div className="flex justify-center items-center">
      <p>Loading...</p>
    </div>
  ) : (
    <>
      <header className="flex items-center h-[8vh] bg-white p-10 gap-4">
        <svg
          onClick={() => navigate(-1)}
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
        <p className="font-bold text-lg text-gray-600">Orders</p>
      </header>
      <main className="flex min-h-screen justify-center items-center pb-[7rem]">
        <div className="relative overflow-x-auto">
          <h1 className="font-bold text-xl text-gray-600">View all orders</h1>
          <table className="flex flex-row flex-no-wrap sm:bg-white rounded-lg overflow-hidden sm:shadow-lg my-5">
            <thead className="text-white">
              {result.data?.orders.map((order) => (
                <tr
                  key={order?._id}
                  className="bg-red-600 flex flex-col flex-no wrap sm:table-row rounded-l-lg sm:rounded-none mb-2 sm:mb-0 md:w-[90%]"
                >
                  <th className="p-3 text-left">User</th>
                  <th className="p-3 text-left">Order Id</th>
                  <th className="p-3 text-left">Order Status</th>
                  <th className="p-3 text-left">Total Price</th>
                  <th className="p-3 text-left" width="110px">
                    Actions
                  </th>
                </tr>
              ))}
            </thead>
            <tbody className="flex-1 sm:flex-none">
              {result.data?.orders?.length > 0 ? (
                result.data?.orders?.map((order) => (
                  <tr
                    key={order?._id}
                    className="flex flex-col flex-no wrap sm:table-row mb-2 sm:mb-0"
                  >
                    <td className="border-grey-light border hover:bg-gray-100 p-3">
                      {order?.user ? order?.user.name : "Unknown User"}
                    </td>
                    <td className="border-grey-light border hover:bg-gray-100 p-3 truncate">
                      {order?._id}
                    </td>
                    <td className="border-grey-light border hover:bg-gray-100 p-3 truncate">
                      {order?.status}
                    </td>
                    <td className="border-grey-light border hover:bg-gray-100 p-3 truncate">
                      ${order?.totalPrice}
                    </td>
                    <td className="border-grey-light border hover:bg-gray-100 p-1 hover:font-medium cursor-pointer flex sm:flex-col justify-center items-center gap-3 text-[12px]">
                      <Link to={`/order/${order?._id}`}>
                        <button className="bg-red-600 text-white px-3 py-3 sm:py-2 rounded-lg">
                          Details
                        </button>
                      </Link>
                      {order?.status !== "Delivered" && (
                        <button
                          onClick={() => processOrder(order?._id)}
                          className="bg-red-600 text-white px-3 py-3 sm:py-2 rounded-lg "
                        >
                          Process Order
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <div className=" flex items-center justify-center ">
                  <p>No order found</p>
                </div>
              )}
            </tbody>
          </table>
        </div>

        <Menubar />
      </main>
    </>
  );
};

export default Orders;
