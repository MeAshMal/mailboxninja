import React, { useState } from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { BsCart3 } from "react-icons/bs";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useGetProductQuery } from "../redux/services/product";
import { useDispatch } from "react-redux";

const Product = () => {
  const [customize, setCustomize] = useState(true);
  const [description, setDescription] = useState(false);
  const [specifications, setSpecifications] = useState(false);
  const [capStyle, setCapStyle] = useState("");
  const [color, setColor] = useState("");

  const navigate = useNavigate();

  const previousRoute = () => {
    navigate(-1);
  };
  const params = useParams();
  const result = useGetProductQuery({ id: params.id });
  const dispatch = useDispatch();
  const addToCart = (product, qty) => {
    dispatch({ type: "ADD_TO_CART", payload: product });
  };

  return result.isLoading ? (
    <div className="flex justify-center items-center w-[100vw] h-screen">
      <p>Loading...</p>
    </div>
  ) : (
    <main className="flex flex-col relative gap-y-3 justify-center">
      <div
        onClick={previousRoute}
        className="back absolute top-12 left-6 bg-white rounded-full w-10 h-10 flex items-center justify-center text-4xl font-light"
      >
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
            style={{ fill: "black" }}
            className="cls-1"
            d="M335.08,357.68,313,335.61,334.6,314a2.78,2.78,0,0,0,0-3.92l-.79-.79a2.78,2.78,0,0,0-3.91,0l-24.3,24.3a2.79,2.79,0,0,0,0,3.92l24.78,24.85a2.78,2.78,0,0,0,3.91,0l.79-.79A2.78,2.78,0,0,0,335.08,357.68Z"
            transform="translate(-304.8 -308.51)"
          />
        </svg>
      </div>
      <Link
        to="/cart"
        className="back absolute top-12 right-6 bg-white rounded-full w-12 h-12 flex items-center justify-center text-lg font-light"
      >
        <BsCart3 />
      </Link>
      <div className="flex justify-center items-center">
        {result.data?.product.file.isVideo ? (
          <video
            className="-z-10"
            src={result.data?.product.file.url}
            autoPlay
            muted
          ></video>
        ) : (
          <img
            src={result.data?.product.file.url}
            alt="product"
            className="w-full h-full"
          />
        )}
      </div>
      <div className="flex flex-col gap-y-3 mx-7 mb-5">
        <h1 className=" text-2xl text-gray-600 font-bold w-[50%]">
          {result.data?.product.title}
        </h1>
        <div className="flex items-center justify-between">
          <small className="text-red-600 text-[12px] font-extrabold">
            ${result.data?.product.price}
          </small>
          <span>
            <AiOutlineHeart className="fill-red-500 text-3xl" />
          </span>
        </div>
        <p className="text-3xl font-bold ">${result.data?.product.price}</p>
        <div className="sections mt-5">
          <div className="texts flex gap-4">
            <span
              onClick={() => {
                setCustomize(true);
                setDescription(false);
                setSpecifications(false);
              }}
              className="text-sm relative"
            >
              Customize
              <hr
                className={`absolute ${
                  customize
                    ? "border-b-2 border-red-500"
                    : "border-b-2 border-b-gray-200"
                } w-[24vw] transition-all `}
              />
            </span>
            <span
              onClick={() => {
                setDescription(true);
                setCustomize(false);
                setSpecifications(false);
              }}
              className="text-sm relative"
            >
              Description
              <hr
                className={`absolute ${
                  description
                    ? "border-b-2 border-red-500"
                    : "border-b-2 border-b-gray-200"
                } w-[24vw] transition-all `}
              />
            </span>
            <span
              onClick={() => {
                setCustomize(false);
                setDescription(false);
                setSpecifications(true);
              }}
              className="text-sm relative"
            >
              Specifications
              <hr
                className={`absolute ${
                  specifications
                    ? "border-b-2 border-red-500"
                    : "border-b-2 border-b-gray-200"
                } w-[24vw] transition-all`}
              />
            </span>
          </div>
          {customize ? (
            <Customize
              product={result.data?.product}
              setCapStyle={setCapStyle}
              setColor={setColor}
              color={color}
            />
          ) : description ? (
            <Description description={result.data?.product.details} />
          ) : (
            <Specifications specs={result.data?.product.features} />
          )}
        </div>
        <button
          onClick={() =>
            addToCart({
              _id: result.data?.product._id,
              title: result.data?.product.title,
              price: result.data?.product.price,
              image: result.data?.product.file.url,
              qty: 1,
              stock: result.data?.product.stock,
              video: result.data?.product.file.isVideo,
              capStyle,
            })
          }
          className="rounded-full p-4 flex justify-center items-center gap-2 bg-red-600 text-white"
        >
          <BsCart3 />
          Add to Cart
        </button>
      </div>
    </main>
  );
};

export default Product;

const Customize = ({ product, setCapStyle, setColor, color }) => {
  return (
    <>
      <div className="my-4">
        <div className="flex items-center justify-between">
          <div className="text-[10px] relative">
            Choose the cap style{" "}
            <hr className="absolute w-[40vw] left-28 border-black" />
          </div>
          <img
            src={require("../assets/arrows.png")}
            alt="arrows"
            className="mr-3 h-[3vh] w-[3vw] "
          />
        </div>
        <div className="my-2">
          <div className="cap-styles flex gap-x-3">
            {product?.capStyles.map((style) => (
              <div
                key={style._id}
                onClick={() => setCapStyle(style.name)}
                className="cap border-2 rounden-lg text-center h-7 w-7"
              >
                <img src={style.icon.url} alt="ass" />
              </div>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="text-[10px] relative">
            Choose the color{" "}
            <hr className="absolute w-[40vw] left-28 border-black" />
          </div>
          <img
            src={require("../assets/arrows.png")}
            alt="arrows"
            className="mr-3 h-[3vh] w-[3vw] "
          />
        </div>
        <div className="my-2">
          <div className="cap-styles flex gap-x-3 items-center justify-center">
            <div
              onClick={() => setColor("black")}
              className={`cap border-2 rounden-lg text-center h-fit w-fit p-2 ${
                color === "black" && "border-black"
              } `}
            >
              Black
            </div>
            <div
              onClick={() => setColor("white")}
              className={`cap border-2 rounden-lg text-center h-fit w-fit p-2 ${
                color === "white" && "border-black"
              } `}
            >
              White
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const Description = ({ description }) => {
  return (
    <>
      <h1 className="text-xl font-bold my-3 text-gray-600">Description</h1>
      <p>{description}</p>
    </>
  );
};

const Specifications = ({ specs }) => {
  return (
    <>
      <h1 className="text-xl font-bold my-3 text-gray-600">Specifications</h1>
      <p>{specs}</p>
    </>
  );
};
