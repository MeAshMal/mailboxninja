import React, { useEffect, useState } from "react";
import Menubar from "./components/Menubar";
import { useLoadUserQuery } from "../../redux/services/auth";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  useAllFeaturesQuery,
  useDeleteFeatureMutation,
  productsApi,
} from "../../redux/services/product";
import { AiFillDelete } from "react-icons/ai";

const UpdateProduct = () => {
  const [heading, setHeading] = useState("");
  const [content, setContent] = useState("");
  const [icon, setIcon] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const authResult = useLoadUserQuery();
  useEffect(() => {
    if (authResult.data) {
      if (authResult.data?.user.role !== "admin") {
        navigate("/");
      }
    }
  }, [authResult, navigate]);
  const handleImageChange = (e) => {
    setIcon(e.target.files[0]);
  };
  const newFeature = async (formData) => {
    try {
      setLoading(true);
      await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/feature`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };
  const [featureDelete, { isLoading }] = useDeleteFeatureMutation();
  const deleteFeature = (id) => {
    featureDelete({ id });
  };
  const [trigger, result] = productsApi.endpoints.allFeatures.useLazyQuery();
  const addFeature = async (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.append("heading", heading);
    myForm.append("color", "");
    myForm.append("content", content);
    myForm.append("file", icon);
    await newFeature(myForm);
    trigger();
  };
  useEffect(() => {
    trigger();
  }, [trigger]);
  return (
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
        <p className="font-bold text-lg text-gray-600">Features</p>
      </header>
      <main className="flex min-h-screen justify-center items-center pb-[10rem] flex-col gap-10">
        <h1 className=" text-xl font-bold ">Add a feature</h1>
        <form
          className="w-[90vw]"
          onSubmit={addFeature}
          encType="multipart/form-data"
        >
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="text"
              name="heading"
              id="heading"
              value={heading}
              onChange={(e) => setHeading(e.target.value)}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-red-500 focus:outline-none focus:ring-0 focus:border-red-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="heading"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-red-600 peer-focus:dark:text-red-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Heading
            </label>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <label
              htmlFor="content"
              className="block mb-2 text-sm font-medium text-gray-500 dark:text-white"
            >
              Content
            </label>
            <textarea
              id="content"
              rows="4"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-red-600 focus:border-red-600 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500 focus:outline-none"
            ></textarea>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <label
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              htmlFor="file_input"
            >
              Upload file
            </label>
            <input
              className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
              id="file_input"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>
          <div className="flex flex-col gap-3 items-center">
            <button
              type="submit"
              disabled={loading}
              className="text-white disabled:bg-red-400 bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
            >
              Submit
            </button>
          </div>
        </form>
        <div className="container mx-auto">
          {result.data?.features.map((item) => (
            <div
              key={item._id}
              className="feature h-fit border-2 px-3 flex gap-3"
            >
              <img src={item.image.url} alt="" className="h-[100%] w-[30%]" />
              <div className="flex gap-2 justify-between items-center">
                <div className="flex-col flex w-[80%]">
                  <h1 className="text-lg font-bold ">{item.heading}</h1>
                  <p>{item.content}</p>
                </div>
                <button>
                  <AiFillDelete
                    className={`text-xl ${isLoading && "fill-gray-500"} `}
                    onClick={() => deleteFeature(item._id)}
                  />
                </button>
              </div>
            </div>
          ))}
        </div>
        <Menubar />
      </main>
    </>
  );
};

export default UpdateProduct;
