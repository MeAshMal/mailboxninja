import React, { useEffect, useState } from "react";
import Menubar from "./components/Menubar";
import { useLoadUserQuery } from "../../redux/services/auth";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetProductQuery,
  useUpdateProductMutation,
} from "../../redux/services/product";
import axios from "axios";

const UpdateProduct = () => {
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [file, setFile] = useState("");
  const [features, setFeatures] = useState("");
  const [category, setCategory] = useState("mailbox");
  const [oldPrice, setOldPrice] = useState("");
  const [modal, setModal] = useState(false);
  const navigate = useNavigate();

  const authResult = useLoadUserQuery();
  useEffect(() => {
    if (authResult.data) {
      if (authResult.data?.user.role !== "admin") {
        navigate("/");
      }
    }
  }, [authResult, navigate]);

  const params = useParams();
  const result = useGetProductQuery({ id: params.id });
  const [productUpdate, productUpdateResult] = useUpdateProductMutation();
  useEffect(() => {
    if (result) {
      const prod = result.data?.product;
      setTitle(prod?.title);
      setDetails(prod?.details);
      setPrice(prod?.price);
      setStock(prod?.stock);
      setFeatures(prod?.features);
      setCategory(prod?.category);
      setOldPrice(0);
      setFile(prod?.file.url);
    }
  }, [result]);
  const updateProduct = async (e) => {
    e.preventDefault();
    await productUpdate({
      id: params.id,
      title,
      price,
      details,
      features,
      stock,
      category,
      oldPrice,
    });
    navigate("/admin/product/" + params.id);
  };
  const showModal = () => {
    setModal(!modal);
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
        <p className="font-bold text-lg text-gray-600">UpdateProduct</p>
      </header>
      <main className="flex min-h-screen justify-between items-center pb-[10rem] flex-col gap-10">
        <div className="w-[50vw]">
          {result.data?.product.file.isVideo ? (
            <video src={file} autoPlay muted></video>
          ) : (
            <img src={file} alt="" />
          )}
        </div>
        <h1 className=" text-xl font-bold ">Update Product</h1>
        <form
          className="w-[90vw]"
          onSubmit={updateProduct}
          encType="multipart/form-data"
        >
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="text"
              name="title"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-red-500 focus:outline-none focus:ring-0 focus:border-red-600 peer"
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
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="number"
              name="price"
              id="price"
              value={oldPrice}
              onChange={(e) => setOldPrice(e.target.value)}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-red-500 focus:outline-none focus:ring-0 focus:border-red-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="price"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-red-600 peer-focus:dark:text-red-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Old Price($)
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
          </div>
          <div className="flex flex-col gap-3 items-center">
            <button
              onClick={showModal}
              type={"button"}
              className=" mx-2 text-white disabled:bg-red-400 bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
            >
              Add cap style
            </button>
            <button
              type="submit"
              disabled={
                !title ||
                !details ||
                !stock ||
                !category ||
                !price ||
                !file ||
                productUpdateResult.isLoading
              }
              className="text-white disabled:bg-red-400 bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
            >
              Submit
            </button>
          </div>
        </form>

        {modal && <Modal showModal={showModal} id={params.id} />}

        <Menubar />
      </main>
    </>
  );
};

export default UpdateProduct;

const Modal = ({ showModal, id }) => {
  const [name, setName] = useState("");
  const [icon, setIcon] = useState("");

  async function addCapStyle(formData) {
    try {
      await axios.put(
        `${process.env.REACT_APP_SERVER_URL}/upload/cap/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
    } catch (error) {
      console.error(error);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.append("name", name);
    myForm.append("file", icon);
    addCapStyle(myForm);
  };
  const handleImageChange = (e) => {
    setIcon(e.target.files[0]);
  };
  return (
    <div
      class="min-w-screen h-screen animated fadeIn faster  fixed  left-0 top-0 flex justify-center items-center inset-0 z-50 outline-none focus:outline-none bg-no-repeat bg-center bg-cover"
      style={{
        background: "transparent",
      }}
      id="modal-id"
    >
      <div class="absolute bg-black opacity-80 inset-0 z-0"></div>
      <div class="w-full  max-w-lg p-5 relative mx-auto my-auto rounded-xl shadow-lg  bg-white ">
        <form onSubmit={handleSubmit}>
          <div class="">
            <div class="text-center p-5 flex-auto justify-center">
              <div className="relative z-0 w-full mb-6 group">
                <input
                  type="text"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  id="name"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-red-500 focus:outline-none focus:ring-0 focus:border-red-600 peer"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="name"
                  className=" left-0 peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-red-600 peer-focus:dark:text-red-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  name
                </label>
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
            </div>
            <div class="p-3  mt-2 text-center space-x-4 md:block">
              <button
                type="button"
                onClick={showModal}
                class="mb-2 md:mb-0 bg-white px-5 py-2 text-sm shadow-sm font-medium tracking-wider border text-gray-600 rounded-full hover:shadow-lg hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                class="mb-2 md:mb-0 bg-red-500 border border-red-500 px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-full hover:shadow-lg hover:bg-red-600"
              >
                Upload
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
