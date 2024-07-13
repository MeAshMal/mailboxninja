import React, { Fragment, useEffect, useState } from "react";
import Menubar from "../components/Menubar";
import { useNavigate } from "react-router-dom";
import {
  useAddAddressMutation,
  useLoadUserQuery,
} from "../redux/services/auth";

const Address = () => {
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const previousRoute = () => {
    navigate(-1);
  };
  const result = useLoadUserQuery();
  useEffect(() => {
    if (result) {
      setUser(result.data?.user);
    }
  }, [result]);
  const [addAddress, addAddressResult] = useAddAddressMutation();
  const handleSubmit = (e) => {
    e.preventDefault();
    addAddress({
      state: e.target[0].value,
      city: e.target[1].value,
      street: e.target[2].value,
      pincode: e.target[3].value,
    });
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
        <p>Address</p>
      </header>
      <div className="min-h-screen bg-gray-200 mx-auto flex flex-col items-center justify-between pb-24 py-5 gap-3">
        <h1 className="my-7 text-2xl font-bold text-red-600">
          View all your addresses
        </h1>
        <div className="flex flex-col gap-4 justify-center items-center">
          {user?.address?.map((item, idx) => (
            <Fragment key={idx}>
              <hr
                hidden={idx === 0}
                className="border-gray-400 w-[90%] mx-auto my-4"
              />
              <div className="flex gap-4 justify-center items-center">
                <h1 className="text-xl font-bold self-start">{idx + 1}.</h1>
                <div className="flex flex-col gap-5 justify-center items-center">
                  <div className="info flex text-xl">
                    <h1>State : &nbsp;</h1>
                    <b>{item.state}</b>
                  </div>
                  <div className="info flex text-xl">
                    <h1>City : &nbsp;</h1>
                    <b>{item.city}</b>
                  </div>
                  <div className="info flex text-xl">
                    <h1>street : &nbsp;</h1>
                    <b>{item.street}</b>
                  </div>
                  <div className="info flex text-xl">
                    <h1>Zip code : &nbsp;</h1>
                    <b>{item.pincode}</b>
                  </div>
                </div>
              </div>
            </Fragment>
          ))}
        </div>
        <hr className="border-gray-400 w-[90%] mx-auto my-4" />
        <div className="flex flex-col gap-3 w-[75%] ">
          <h1 className="text-xl font-bold">Add an address</h1>
          <form className="my-4 w-full" onSubmit={handleSubmit}>
            <div className="relative z-0 w-full mb-6 group">
              <input
                type="text"
                name="state"
                id="city"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-red-500 focus:outline-none focus:ring-0 focus:border-red-600 peer"
                placeholder=" "
                required
              />
              <label
                htmlFor="state"
                className=" left-0 peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-red-600 peer-focus:dark:text-red-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                State
              </label>
            </div>
            <div className="relative z-0 w-full mb-6 group">
              <input
                type="text"
                name="city"
                id="city"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-red-500 focus:outline-none focus:ring-0 focus:border-red-600 peer"
                placeholder=" "
                required
              />
              <label
                htmlFor="city"
                className=" left-0 peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-red-600 peer-focus:dark:text-red-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                City
              </label>
            </div>
            <div className="relative z-0 w-full mb-6 group">
              <input
                type="text"
                name="street"
                id="street"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-red-500 focus:outline-none focus:ring-0 focus:border-red-600 peer"
                placeholder=" "
                required
              />
              <label
                htmlFor="street"
                className=" left-0 peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-red-600 peer-focus:dark:text-red-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Street
              </label>
            </div>
            <div className="relative z-0 w-full mb-6 group">
              <input
                type="text"
                name="pincode"
                id="pincode"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-red-500 focus:outline-none focus:ring-0 focus:border-red-600 peer"
                placeholder=" "
                required
              />
              <label
                htmlFor="pincode"
                className=" left-0 peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-red-600 peer-focus:dark:text-red-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Zip Code
              </label>
            </div>
            <button className="bg-red-600 text-white px-5 py-2 rounded-lg">
              Add
            </button>
          </form>
        </div>
      </div>

      <Menubar />
    </main>
  );
};

export default Address;
