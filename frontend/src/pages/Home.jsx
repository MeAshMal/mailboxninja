import React, { useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import ProductCard from "../components/ProductCard";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Menubar from "../components/Menubar";
import { useGetFeaturedProductsQuery } from "../redux/services/product";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Home = () => {
  const [features, setFeatures] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const navigateToProducts = (e) => {
    e.preventDefault();
    navigate(`/products?search=${search}&category=`);
  };

  const getFeatures = async () => {
    try {
      const {
        data: { features },
      } = await axios.get(`${process.env.REACT_APP_SERVER_URL}/features`);
      setFeatures(features);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getFeatures();
  }, []);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const result = useGetFeaturedProductsQuery();
  return (
    <>
      <main className="mb-20">
        <Header />
        <form
          onSubmit={navigateToProducts}
          id="search"
          className="search flex relative items-center w-[90%] mx-auto pl-4 my-2 border-[1px] border-slate-300 px-2 py-2 rounded-full"
        >
          <input
            type="text"
            className=" focus:outline-none w-[90%]"
            placeholder="Search here"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button type="submit" className="absolute right-2">
            <AiOutlineSearch
              // onClick={navigateToProducts}
              className="w-[5vw] h-[10vh]  fill-[#a3a3a3]"
            />
          </button>
        </form>
        <div
          id="features"
          className="features-carousel gap-x-4 mx-auto my-2  py-4 rounded-xl"
        >
          <div className="w-full px-4">
            <Slider {...settings}>
              {features?.map((i, idx) => (
                <div
                  key={idx}
                  className={`feature !flex gap-x-4 h-fit px-10 items-center justify-center w-[90%] mx-auto my-2 border-[1px] py-4 rounded-xl bg-${
                    idx === 0
                      ? "orange-200"
                      : idx === 1
                      ? "gray-300"
                      : idx === 2
                      ? "red-200"
                      : "green-300"
                  }`}
                >
                  <div className="text flex flex-col gap-y-3">
                    <p className="w-[40vw]">{i.heading}</p>
                    <small className="w-[40vw]">{i.content}</small>
                  </div>
                  <img src={i.image.url} alt="" className="w-[35vw] h-[90%]" />
                </div>
              ))}

              {/* Add more carousel items here */}
            </Slider>
          </div>

          {/* <div className="feature gap-x-4 flex px-10 items-center justify-center w-[90%] mx-auto my-2 border-[1px] bg-orange-200  py-4 rounded-xl">
            <div className="text flex flex-col gap-y-3">
              <p className="w-[40vw]">
                Premium Mailbox gap-y-2 Installation Services at your doorstep
              </p>
              <small className="w-[40vw]">
                Enjoy great prices with an unmatched Ninja installation service
                right from the comfort of your home
              </small>
            </div>
            <img
              src={require("../assets/features/feature1.png")}
              alt=""
              className="w-[35vw]"
            />
          </div> */}
        </div>
        <div
          id="categories"
          className="categories w-[90%] flex flex-col justify-center items-center "
        >
          <h1 className="my-3">Choose a Category</h1>
          <div className="boxes gap-y-2 overflow-x-auto w-[90vw] ml-[2.5rem] flex items-centr gap-3">
            <Link to={"/products?category=mailbox"}>
              <div className="box gap-y-2 flex flex-col justify-center items-center">
                <div className="flex flex-col w-[71px] justify-center items-center bg-gray-300 h-[5rem] px-4 py-4 rounded-lg">
                  <img
                    src={require("../assets/categories/category1.png")}
                    alt=""
                    className="w-[10vw]"
                  />
                </div>
                <p className="text-[11px] text-center ">Mailbox</p>
              </div>
            </Link>
            <Link to={"/products?category=panel-frame"}>
              <div className="box gap-y-2 flex flex-col justify-center items-center">
                <div className="flex flex-col w-[71px] justify-center items-center bg-gray-300 h-[5rem] px-4 py-3 rounded-lg">
                  <img
                    src={require("../assets/categories/category2.png")}
                    alt=""
                    className="w-[20vw]"
                  />
                </div>
                <p className="text-[11px] text-center">Panels & Frames</p>
              </div>
            </Link>
            <Link to={"/products?category=real-estate-post"}>
              <div className="box gap-y-2 flex flex-col justify-center items-center">
                <div className="flex flex-col w-[71px] justify-center items-center bg-gray-300 h-[5rem] px-4 py-3 rounded-lg">
                  <img
                    src={require("../assets/categories/category3.png")}
                    alt=""
                    className="w-[90%]"
                  />
                </div>
                <p className="text-[11px] text-center">Real Estate Posts</p>
              </div>
            </Link>
            <Link to={"/products?category=sign-frame"}>
              <div className="box gap-y-2 flex flex-col justify-center items-center">
                <div className="flex flex-col w-[71px] justify-center items-center bg-gray-300 h-[5rem] px-4 py-5 rounded-lg">
                  <img
                    src={require("../assets/categories/category4.png")}
                    alt=""
                    className="w-[90%]"
                  />
                </div>
                <p className="text-[11px] text-center">Sign Frames</p>
              </div>
            </Link>
            <Link to={"/products?category=ornamental-collection"}>
              <div className="box gap-y-2 flex flex-col justify-center items-center">
                <div className="flex flex-col w-[71px] justify-center items-center bg-gray-300 h-[5rem] px-4 py-5 rounded-lg">
                  <img
                    src={require("../assets/categories/category5.png")}
                    alt=""
                    className="w-[90%]"
                  />
                </div>
                <p className="text-[11px] text-center">Ornamental Collection</p>
              </div>
            </Link>
            <Link to={"/products?category=accessory"}>
              <div className="box gap-y-2 flex flex-col justify-center items-center">
                <div className="flex flex-col w-[71px] justify-center items-center bg-gray-300 h-[5rem] px-4 py-5 rounded-lg">
                  <img
                    src={require("../assets/categories/category6.png")}
                    alt=""
                    className="w-[70%]"
                  />
                </div>
                <p className="text-[11px] text-center">Accessories</p>
              </div>
            </Link>
          </div>
        </div>
        <div
          id="steps"
          className="steps overflow-auto pl-[2rem] w-[90%] mx-auto bg-red-600 text-white flex justify-center items-center gap-x-3 p-4 rounded-lg my-4"
        >
          <div className="step flex-col gap-3  max-w-full flex items-center gap-x-2">
            <div className="circle rounded-full text-sm bg-white text-red-500 flex justify-center items-center h-7 w-7 text-center">
              1
            </div>
            <p className=" text-[11px] text-center">
              Choose any item from our store
            </p>
          </div>
          <div className="step flex-col gap-3  max-w-full flex items-center gap-x-2">
            <div className="circle rounded-full text-sm bg-white text-red-500 flex justify-center items-center h-7 w-7 text-center">
              2
            </div>
            <p className="text-[11px] text-center">
              Pay & select installation date & time
            </p>
          </div>
          <div className="step flex-col gap-3   max-w-full flex items-center gap-x-2">
            <div className="circle rounded-full text-sm bg-white text-red-500 flex justify-center items-center h-7 w-7 text-center">
              3
            </div>
            <p className=" text-[11px] text-center">
              Our Ninja delivers & installs your item
            </p>
          </div>
        </div>
        <div id="best-products" className="bg-gray-200 py-3 relative">
          <h1 className="text-xl w-[90%] mx-auto font-bold text-gray-600 my-4">
            Our Best Offers
          </h1>
          <Link to="/products">
            <p className="absolute right-3 top-7 font-bold text-gray-600">
              More
            </p>
          </Link>
          <div className="w-[90%] mx-auto flex gap-4 overflow-auto pb-[4rem]">
            {result.data?.products.map((item) => (
              <ProductCard
                key={item._id}
                image={item.file.url}
                video={item.file.isVideo}
                stock={item.stock}
                id={item._id}
                title={item.title}
                price={item.price}
                oldprice={item.oldPrice}
                category={item.category}
              />
            ))}
          </div>
        </div>
      </main>
      <Menubar />
    </>
  );
};

export default Home;
