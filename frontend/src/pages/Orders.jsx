import React from "react";
import MenuBar from "../components/Menubar";
import { Link, useNavigate } from "react-router-dom";
import { useGetMyOrdersQuery } from "../redux/services/orders";

const Orders = () => {
  const navigate = useNavigate();
  const previousRoute = () => {
    navigate(-1);
  };
  const result = useGetMyOrdersQuery();
  return result.isLoading ? (
    <div className="flex justify-center items-center">
      <p>Loading...</p>
    </div>
  ) : (
    <main className="pb-[2rem]">
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
        <p>Orders</p>
      </header>
      <div className="relative overflow-x-auto flex flex-col my-4 gap-4">
        <h1 className="font-bold text-xl text-gray-600 self-center">
          View all Orders
        </h1>
        <table className="flex w-[90%] mx-auto mt-4 flex-row flex-no-wrap bg-white sm:bg-white rounded-lg overflow-hidden sm:shadow-lg my-5">
          <thead className="text-white">
            {result.data?.orders.map((order) => (
              <tr
                key={order?._id}
                className="bg-red-600 flex flex-col flex-no wrap sm:table-row rounded-l-lg sm:rounded-none mb-2 sm:mb-0 md:w-[90%]"
              >
                <th className="p-3 text-left text-xs sm:text-sm px-1 py-4">
                  Status
                </th>
                <th className="p-3 text-left text-xs sm:text-sm px-1 py-4">
                  Order Id
                </th>
                <th className="p-3 text-left text-xs sm:text-sm px-1 py-4">
                  Total Price
                </th>
                <th className="p-3 text-left text-xs sm:text-sm px-1 py-4">
                  Order Items
                </th>
                <th className="p-3 text-left text-xs sm:text-sm px-1 py-4">
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
                  <td className="border-grey-light border hover:bg-gray-100 p-3 truncate text-xs sm:text-sm px-1 py-4">
                    {order?.status}
                  </td>
                  <td className="border-grey-light border hover:bg-gray-100 p-3 truncate text-xs sm:text-sm px-1 py-4">
                    {order?._id}
                  </td>
                  <td className="border-grey-light border hover:bg-gray-100 p-3 truncate text-xs sm:text-sm px-1 py-4">
                    ${order?.totalPrice}
                  </td>
                  <td className="border-grey-light border hover:bg-gray-100 p-3 truncate text-xs sm:text-sm px-1 py-4">
                    {order?.orderItems.length}
                  </td>
                  <td className="border-grey-light border hover:bg-gray-100 p-3 truncate text-xs sm:text-sm px-1 py-4">
                    <Link to={"/trackorder/" + order._id}>Track Order</Link>
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
      <MenuBar />
    </main>
  );
};

export default Orders;
