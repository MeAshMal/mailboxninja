import React, { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import Header from "../components/Header";
import Menubar from "../components/Menubar";
import { useGetProductsQuery } from "../redux/services/product";

const Products = () => {
  const [category, setCategory] = useState(
    window.location.href?.split("y=")[1] || ""
  );
  // const category = window.location.href?.split("y=")[1] || "";
  const searchParam = window.location.href?.split("h=")[1]?.split("&")[0] || "";
  const [search, setSearch] = useState(searchParam);
  const result = useGetProductsQuery({
    category,
    search,
  });
  return result.isLoading ? (
    <div className="flex justify-center items-center w-[100vw] h-screen">
      <p>Loading...</p>
    </div>
  ) : (
    <>
      <Header />
      <div
        id="search"
        className="search flex relative items-center w-[90%] mx-auto pl-4 my-2 border-[1px] border-slate-300 px-2 py-2 rounded-full"
      >
        <input
          type="text"
          className=" focus:outline-none w-[90%]"
          placeholder="Search here"
          onChange={(e) => setSearch(e.target.value)}
          value={search}
        />
        <AiOutlineSearch className="w-[5vw] h-[10vh] absolute right-2 fill-[#a3a3a3]" />
      </div>
      <div
        id="categories"
        className="categories w-[90%] flex flex-col justify-center items-center "
      >
        <h1 className="my-3">Choose a Category</h1>
        <div className="boxes gap-y-2 overflow-x-auto w-[90vw] ml-[2.5rem] flex items-center gap-3">
          <Link
            to={"/products?category=mailbox"}
            onClick={(e) => setCategory("mailbox")}
          >
            <div className="box gap-y-2 flex flex-col justify-center items-center">
              <div className="flex flex-col w-[71px] h-auto justify-center items-center bg-gray-300 px-4 py-4 rounded-lg">
                <img
                  src={require("../assets/categories/category1.png")}
                  alt=""
                  className="w-[10vw]"
                />
              </div>
              <p className="text-[12px] text-center ">Mailbox</p>
            </div>
          </Link>
          <Link
            to={"/products?category=panel-frame"}
            onClick={(e) => setCategory("panel-frame")}
          >
            <div className="box gap-y-2 flex flex-col justify-center items-center">
              <div className="flex flex-col w-[71px] h-auto justify-center items-center bg-gray-300 px-4 py-3 rounded-lg">
                <img
                  src={require("../assets/categories/category2.png")}
                  alt=""
                  className="w-[20vw]"
                />
              </div>
              <p className="text-[12px] text-center">Panels & Frames</p>
            </div>
          </Link>
          <Link
            to={"/products?category=real-estate-post"}
            onClick={(e) => setCategory("real-estate-post")}
          >
            <div className="box gap-y-2 flex flex-col justify-center items-center">
              <div className="flex flex-col w-[71px] h-auto justify-center items-center bg-gray-300 px-4 py-3 rounded-lg">
                <img
                  src={require("../assets/categories/category3.png")}
                  alt=""
                  className="w-[90%]"
                />
              </div>
              <p className="text-[12px] text-center">Real Estate Posts</p>
            </div>
          </Link>
          <Link
            to={"/products?category=sign-frame"}
            onClick={(e) => setCategory("sign-frame")}
          >
            <div className="box gap-y-2 flex flex-col justify-center items-center">
              <div className="flex flex-col w-[71px] h-auto justify-center items-center bg-gray-300 px-4 py-5 rounded-lg">
                <img
                  src={require("../assets/categories/category4.png")}
                  alt=""
                  className="w-[90%]"
                />
              </div>
              <p className="text-[12px] text-center">Sign Frames</p>
            </div>
          </Link>
          <Link
            to={"/products?category=ornamental-collection"}
            onClick={(e) => setCategory("ornamental-collection")}
          >
            <div className="box gap-y-2 flex flex-col justify-center items-center">
              <div className="flex flex-col w-[71px] h-auto justify-center items-center bg-gray-300 px-4 py-5 rounded-lg">
                <img
                  src={require("../assets/categories/category5.png")}
                  alt=""
                  className="w-[90%]"
                />
              </div>
              <p className="text-[12px] text-center">Ornamental Collection</p>
            </div>
          </Link>
          <Link
            to={"/products?category=accessory"}
            onClick={(e) => setCategory("accessory")}
          >
            <div className="box gap-y-2 flex flex-col justify-center items-center">
              <div className="flex flex-col w-[71px] h-auto justify-center items-center bg-gray-300 px-4 py-5 rounded-lg">
                <img
                  src={require("../assets/categories/category6.png")}
                  alt=""
                  className="w-[70%]"
                />
              </div>
              <p className="text-[12px] text-center">Accessories</p>
            </div>
          </Link>
        </div>
      </div>
      <div id="best-products" className="bg-gray-200 py-3 relative pb-[10rem]">
        <h1 className="text-xl w-[90%] mx-auto font-bold text-gray-600 my-4">
          Our Best Offers
        </h1>
        <Link to="/products">
          <p className="absolute right-3 top-7 font-bold text-gray-600">More</p>
        </Link>
        <div className="w-[95%] mx-auto grid grid-cols-3 gap-2 flex-wrap">
          {result.data?.products.length ? (
            result.data?.products.map((product) => (
              <ProductCard
                key={product._id}
                image={product.file.url}
                video={product.file.isVideo}
                id={product._id}
                title={product.title}
                price={product.price}
                oldprice={product.oldPrice !== 0 && product.oldPrice}
                category={product.category}
                stock={product.stock}
              />
            ))
          ) : (
            <div className="flex justify-center items-center w-screen">
              <p>No Product found</p>
            </div>
          )}
        </div>
      </div>
      <Menubar />
    </>
  );
};

export default Products;
