import React, { useEffect } from "react";
import Menubar from "./components/Menubar";
import {
  useGetAllUsersQuery,
  useLoadUserQuery,
  useUpdateRoleMutation,
} from "../../redux/services/auth";
import { useNavigate, useParams } from "react-router-dom";
import {} from "../../redux/services/auth";

const Users = () => {
  const navigate = useNavigate();

  const authResult = useLoadUserQuery();
  useEffect(() => {
    if (authResult.data) {
      if (authResult.data?.user.role !== "admin") {
        navigate("/");
      }
    }
  }, [authResult, navigate]);

  const result = useGetAllUsersQuery();

  const [update, { isLoading }] = useUpdateRoleMutation();

  const updateRole = (id) => {
    update({ id });
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
        <p className="font-bold text-lg text-gray-600">Users</p>
      </header>
      <main className="flex justify-center items-center pb-[5rem] bg-gray-200 ">
        <div className="relative overflow-x-auto flex flex-col">
          <h1 className="font-bold text-xl text-gray-600 self-center">
            View all Users
          </h1>
          <table className="flex flex-row flex-no-wrap bg-white flex-wrap sm:bg-white rounded-lg overflow-hidden sm:shadow-lg">
            <thead className="text-white flex flex-col gap-[20px]">
              {result.data?.users.map((user) => (
                <tr
                  key={user?._id}
                  className="bg-red-600 flex flex-col flex-no wrap sm:table-row rounded-l-lg sm:rounded-none mb-2 sm:mb-0 md:w-[90%] gap-[7px]"
                >
                  <th className="p-3 text-left">Name</th>
                  <th className="p-3 text-left">User Id</th>
                  <th className="p-3 text-left">Email</th>
                  <th className="p-3 text-left">Phone</th>
                  <th className="p-3 text-left">City</th>
                  <th className="p-3 text-left">Role</th>
                  <th className="p-3 text-left">Action</th>
                </tr>
              ))}
            </thead>
            <tbody className="flex flex-col sm:flex-none">
              {result.data?.users?.length > 0 ? (
                result.data?.users?.map((user, idx) => {
                  return (
                    <tr
                      key={user?._id}
                      className="flex flex-col flex-no wrap gap-[7px] mb-[33px] sm:table-row sm:mb-0"
                    >
                      <td className="hover:bg-gray-100 p-3">{user?.name}</td>
                      <td className="hover:bg-gray-100 p-3 truncate">
                        {user?._id}
                      </td>
                      <td className="hover:bg-gray-100 p-3 truncate">
                        {user?.email}
                      </td>
                      <td className="hover:bg-gray-100 p-3 truncate">
                        ${user?.phone}
                      </td>
                      <td className="hover:bg-gray-100 p-3 truncate">
                        {user?.address[0]?.city}
                      </td>
                      <td className="hover:bg-gray-100 p-3 truncate">
                        {user?.role}
                      </td>
                      <td className="hover:bg-gray-100 p-3 truncate">
                        <button
                          onClick={() => updateRole(user._id)}
                          disabled={
                            isLoading ||
                            authResult.data?.user._id.toString() ===
                              user._id.toString()
                          }
                          className="rounded-lg py-1 px-4 bg-red-500 text-white disabled:bg-red-400"
                        >
                          Update Role
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <div className=" flex items-center justify-center ">
                  <p>No user found</p>
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

export default Users;
