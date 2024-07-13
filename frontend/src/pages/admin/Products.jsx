import React, { useEffect, useState } from "react";
import Menubar from "./components/Menubar";
import { useLoadUserQuery } from "../../redux/services/auth";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useGetProductsQuery, productsApi } from "../../redux/services/product";

const Products = () => {
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [file, setFile] = useState("");
  const [features, setFeatures] = useState("");
  const [category, setCategory] = useState("mailbox");
  const [isVideo, setIsVideo] = useState(false);
  const [loading, setLoading] = useState(false);
  const resultAuth = useLoadUserQuery();
  const navigate = useNavigate();
  const [trigger, result] = productsApi.endpoints.getProducts.useLazyQuery({
    category: "",
    search: "",
  });
  const createProduct = async (formData) => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/create/product`,
        formData,
        {
          headers: {
            "content-type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      setIsVideo(data?.video);
      trigger({
        category: "",
        search: "",
      });
      setLoading(false);
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  const authResult = useLoadUserQuery();
  useEffect(() => {
    if (authResult.data) {
      if (authResult.data?.user.role !== "admin") {
        navigate("/");
      }
    }
  }, [authResult, navigate]);

  useEffect(() => {
    trigger({ category: "", search: "" });
  }, [trigger]);

  useEffect(() => {
    if (resultAuth.data) {
      if (resultAuth.data?.user.role !== "admin") {
        navigate("/");
      }
    }
  }, [resultAuth, navigate]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFile(file);
  };

  const addProduct = async (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.append("title", title);
    myForm.append("details", details);
    myForm.append("stock", stock);
    myForm.append("category", category);
    myForm.append("price", price);
    myForm.append("file", file);
    myForm.append("features", features);
    createProduct(myForm);
  };
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
        <p className="font-bold text-lg text-gray-600">Products</p>
      </header>
      <main className="flex min-h-screen justify-between items-center pb-[10rem] flex-col gap-10">
        <h1 className=" text-xl font-bold ">Add a product</h1>
        <form
          className="w-[90vw]"
          onSubmit={addProduct}
          encType="multipart/form-data"
        >
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="text"
              name="title"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="block text-black py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-red-500 focus:outline-none focus:ring-0 focus:border-red-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="title"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-red-600 peer-focus:dark:text-red-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Product Title
            </label>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <label
              htmlFor="message"
              className="block mb-2 text-sm font-medium text-gray-500 dark:text-white"
            >
              Description
            </label>
            <textarea
              id="message"
              rows="4"
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-red-600 focus:border-red-600 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500 focus:outline-none"
            ></textarea>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="number"
              name="price"
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-red-500 focus:outline-none focus:ring-0 focus:border-red-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="price"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-red-600 peer-focus:dark:text-red-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Price($)
            </label>
          </div>
          <div className="grid md:grid-cols-2 md:gap-6">
            <div className="relative z-0 w-full mb-6 group">
              <label
                htmlFor="countries"
                className="block mb-2 text-sm font-medium text-gray-500 dark:text-white"
              >
                Select an Category
              </label>
              <select
                id="countries"
                value={category}
                defaultValue={category}
                onChange={(e) => setCategory(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500 focus:outline-none"
              >
                <option value="mailbox" defaultValue={"mailbox"}>
                  Mailbox
                </option>
                <option value="panel-frame">Panels & Frames</option>
                <option value="real-estate-post">Real Estate Posts</option>
                <option value="sign-frame">Sign Frames</option>
                <option value="ornamental-collection">
                  Ornamental Collection
                </option>
                <option value="accessory">Accessories</option>
              </select>
            </div>
            <div className="relative z-0 w-full mb-6 group">
              <input
                type="number"
                name="stock"
                id="stock"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-red-500 focus:outline-none focus:ring-0 focus:border-red-600 peer"
                placeholder=" "
                required
              />
              <label
                htmlFor="stock"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-red-600 peer-focus:dark:text-red-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Stock
              </label>
            </div>
          </div>
          <div className="grid md:grid-cols-2 md:gap-6">
            <div className="relative z-0 w-full mb-6 group">
              <label
                htmlFor="message"
                className="block mb-2 text-sm font-medium text-gray-500 dark:text-white"
              >
                Features
              </label>
              <textarea
                id="message"
                rows="4"
                value={features}
                onChange={(e) => setFeatures(e.target.value)}
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
                accept="image/*, video/mp4"
                onChange={handleImageChange}
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={
              !title ||
              !details ||
              !stock ||
              !category ||
              !price ||
              !file ||
              loading
            }
            className="text-white disabled:bg-red-400 bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
          >
            Submit
          </button>
        </form>
        <h1 className=" text-xl font-bold ">All products</h1>
        {result?.isLoading || loading ? (
          <div className="flex justify-center items-center">
            <p>Loading...</p>
          </div>
        ) : (
          <div>
            <div className="w-[95%] mx-auto grid grid-cols-2 gap-2 flex-wrap">
              {result?.data?.products.map((item) => (
                <div
                  key={item._id}
                  className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 h-fit"
                >
                  <Link to={`/admin/product/${item._id}`}>
                    {item.file.isVideo ? (
                      <video src={item.file.url} autoPlay muted></video>
                    ) : (
                      <img
                        className="rounded-t-lg"
                        src={item.file.url}
                        alt=""
                      />
                    )}
                  </Link>
                  <div className="p-5">
                    <Link to={`/admin/product/${item._id}`}>
                      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        {item.title}
                      </h5>
                    </Link>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                      {item.details?.length > 80
                        ? item.details.substr(0, 80) + "..."
                        : item.details}
                    </p>
                    <Link
                      to={`/admin/product/${item._id}`}
                      className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none"
                    >
                      Read more
                      <svg
                        className="w-3.5 h-3.5 ml-2"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 14 10"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M1 5h12m0 0L9 1m4 4L9 9"
                        />
                      </svg>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
            {/* </tbody>
          </table> */}
          </div>
        )}

        <Menubar />
      </main>
    </>
  );
};

export default Products;
