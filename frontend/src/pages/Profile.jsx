import React, { useEffect, Fragment } from "react";
import Menubar from "../components/Menubar";
import { Link, useNavigate } from "react-router-dom";
import { useLoadUserQuery, useLogoutMutation } from "../redux/services/auth";

const Profile = () => {
  const navigate = useNavigate();

  const previousRoute = () => {
    navigate(-1);
  };
  const result = useLoadUserQuery();
  useEffect(() => {
    if (!result.isSuccess) {
      navigate("/auth");
    }
  }, [result, navigate]);

  const [logout, logoutResult] = useLogoutMutation();
  useLoadUserQuery();
  const handleLogout = () => {
    logout();
  };
  useEffect(() => {
    if (logoutResult.data?.success) {
      navigate("/auth");
    }
  }, [logoutResult, navigate]);

  return (
    <main className="bg-[#DADADA] min-h-screen pb-[2rem] ">
      <header className="flex items-center h-[8vh] bg-[#DADADA] p-10 gap-4 justify-between">
        <div className="flex items-center gap-4">
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
          <p className="font-bold text-lg text-gray-600">Account</p>
        </div>

        <button
          onClick={handleLogout}
          className="font-bold text-xs text-white px-4 py-2 bg-red-500 rounded-xl"
        >
          Logout
        </button>
      </header>
      <div className="up flex flex-col items-center justify-center bg-[#DADADA] py-5 pb-7">
        <div className="icon bg-red-600 w-12 h-12 rounded-full"></div>
        <h1 className="text-lg text-gray-600 font-bold ">
          {result.data?.user.name}
        </h1>
        <small className="text-[10px] text-gray-600 font-bold">
          {result.data?.user.email}
        </small>
      </div>
      <div className="down bg-white rounded-t-3xl h-fit pb-[6rem] mt-5 flex flex-col gap-4 py-6 px-6 mx-auto">
        <div className="payment-info flex items-center justify-between pr-[8vw]">
          <Link to="/information">
            <h1 className="text-lg my-2 text-gray-600 font-bold ">
              Personal Information
            </h1>
            <p className=" text-xs text-gray-600 ">
              Information about your, your saved cards, membership class and
              Ninja credits
            </p>
          </Link>
          <div>
            <svg
              id="Layer_1"
              data-name="Layer 1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 31.09 54.68"
              className="w-2 rotate-180"
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
          </div>
        </div>
        <hr className="mx-5" />
        <div className="payment-info flex items-center justify-between pr-[8vw] gap-2">
          <Link to="/address">
            <h1 className="text-lg my-2 text-gray-600 font-bold ">Address</h1>
            <p className=" text-xs text-gray-600 ">
              information about your saved addresses & your preferred
              installation address
            </p>
          </Link>
          <div>
            <svg
              id="Layer_1"
              data-name="Layer 1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 31.09 54.68"
              className="w-2 rotate-180"
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
          </div>
        </div>
        <hr className="mx-5" />
        <div className="payment-info flex items-center justify-between pr-[8vw] gap-2">
          <Link to="/changepassword">
            <h1 className="text-lg my-2 text-gray-600 font-bold ">
              Change Password
            </h1>
            <p className=" text-xs text-gray-600 ">
              Here you can change your password and verify your cellphone number
            </p>
          </Link>
          <div>
            <svg
              id="Layer_1"
              data-name="Layer 1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 31.09 54.68"
              className="w-2 rotate-180"
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
          </div>
        </div>
        <hr className="mx-5" />
        <div className="payment-info flex items-center justify-between pr-[8vw] gap-2">
          <Link to={"/orders"}>
            <h1 className="text-lg my-2 text-gray-600 font-bold ">
              Order History
            </h1>
            <p className=" text-xs text-gray-600 ">
              You can view your order history here
            </p>
          </Link>
          <div>
            <svg
              id="Layer_1"
              data-name="Layer 1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 31.09 54.68"
              className="w-2 rotate-180"
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
          </div>
        </div>
        <hr className="mx-5" />
        {result.data?.user.role === "admin" && (
          <Fragment>
            <Link
              to="/admin/"
              className="payment-info flex items-center justify-between pr-[8vw] gap-2"
            >
              <div>
                <h1 className="text-lg my-2 text-gray-600 font-bold ">
                  Admin Dashboard
                </h1>
                <p className=" text-xs text-gray-600 ">
                  You can view your admin dashboard
                </p>
              </div>
              <div>
                <svg
                  id="Layer_1"
                  data-name="Layer 1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 31.09 54.68"
                  className="w-2 rotate-180"
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
              </div>
            </Link>
            <hr className="mx-5" />
          </Fragment>
        )}
        <div className="payment-info flex items-center justify-between pr-[8vw] gap-2">
          <div>
            <h1 className="text-lg my-2 text-gray-600 font-bold ">Help</h1>
            <p className=" text-xs text-gray-600 ">
              You can seek help via Live Chat, iMessage, or speak directly to
              one of our Ninja
            </p>
          </div>
          <div>
            <svg
              id="Layer_1"
              data-name="Layer 1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 31.09 54.68"
              className="w-2 rotate-180"
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
          </div>
        </div>
        <hr className="mx-5" />
        <div className="payment-info flex items-center justify-between pr-[8vw] gap-2">
          <Link to={"/referral"}>
            <h1 className="text-lg my-2 text-gray-600 font-bold ">
              Referral Link
            </h1>
            <p className=" text-xs text-gray-600 ">
              Get your referral link and share it to get awesome rewards
            </p>
          </Link>
          <div>
            <svg
              id="Layer_1"
              data-name="Layer 1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 31.09 54.68"
              className="w-2 rotate-180"
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
          </div>
        </div>
        <hr className="mx-5" />
      </div>
      <Menubar />
    </main>
  );
};

export default Profile;
