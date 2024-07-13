import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

const ProductCard = ({ id, image, title, price, oldprice, stock, video }) => {
  const dispatch = useDispatch();
  const addToCart = (product, qty) => {
    dispatch({ type: "ADD_TO_CART", payload: product });
  };
  return (
    <div className="card flex flex-col justify-between shadow-lg min-w-[35%] border-2  rounded-xl gap-y-4 bg-white">
      <Link to={`/product/${id}`} className="px-1 flex flex-col">
        {video ? (
          <video src={image} autoPlay muted></video>
        ) : (
          <img src={image} alt="" className="rounded-xl h-full" />
        )}
      </Link>
      <div className="px-1 flex flex-col justify-between">
        <Link to={`/product/${id}`} className="px-1 flex flex-col">
          <small className="text-slate-400">{title}</small>
          <small className="text-red-600 text-[10px]  font-extrabold">
            {oldprice}
          </small>
          <p className=" font-extrabold">${price}</p>
        </Link>
        <button
          onClick={() => {
            addToCart({
              _id: id,
              title,
              price,
              image,
              qty: 1,
              stock,
              video,
              capStyle: "",
            });
          }}
          className="py-[2px] px-[3px] my-2 border-2 border-gray-300 rounded-lg"
        >
          Add to cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
