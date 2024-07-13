import React, { useEffect, useState } from "react";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useNewOrderMutation } from "../redux/services/orders";
import { useLoadUserQuery } from "../redux/services/auth";

const Cart = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  const {
    cart: { products, totalPrice },
  } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const previousRoute = () => {
    navigate("/");
  };
  dispatch({ type: "CALCULATE_SUBTOTAL" });
  const [newOrder, result] = useNewOrderMutation();
  const handleCheckout = () => {
    newOrder({
      orderItems: products,
      totalPrice,
      url: "/payment/create",
    });
  };
  const auth = useLoadUserQuery();

  useEffect(() => {
    if (!auth.isSuccess) {
      navigate("/account");
    } else {
      setIsAuthenticated(true);
    }
    if (result.data) {
      window.location.href = result?.data?.url;
    }
  }, [auth, navigate, result]);

  return (
    <main className="bg-neutral-300 min-h-[70vh] pb-40">
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
        <p>
          Cart ({products?.length} item{products?.length !== 1 && "s"})
        </p>
      </header>
      <div className="cartItems my-16">
        {products.length ? (
          products.map((item) => (
            <CartItem
              title={item.title}
              image={item.image}
              price={item.price}
              video={item.video}
              key={item._id}
              quantity={item.qty}
              id={item._id}
              capStyle={item.capStyle}
            />
          ))
        ) : (
          <div className="flex justify-center items-center">
            <p>Your cart is empty</p>
          </div>
        )}
      </div>
      <footer className="fixed h-[25vh] bg-red-200 w-full bottom-0">
        <div className=" h-[50%] flex items-center gap-3 w-[90%] ">
          <svg
            id="Layer_1"
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 146.69 146.69"
            className="w-10 "
          >
            <defs>
              <style></style>
            </defs>
            <path
              className="cls-1"
              style={{ fill: "#e30613" }}
              d="M457.61,2417.22h0a10.81,10.81,0,0,0,0-15.27l-.35-.35a10.8,10.8,0,0,1-2.37-11.72l.19-.45a10.8,10.8,0,0,0-5.91-14.08h0a10.8,10.8,0,0,1-6.71-10h0a10.8,10.8,0,0,0-10.8-10.79h-.49a10.82,10.82,0,0,1-10-6.61l-.19-.46a10.79,10.79,0,0,0-14.13-5.77h0a10.8,10.8,0,0,1-11.82-2.32h0a10.81,10.81,0,0,0-15.27,0l-.35.35a10.78,10.78,0,0,1-11.71,2.36l-.46-.18a10.8,10.8,0,0,0-14.08,5.91h0a10.78,10.78,0,0,1-10,6.72h0a10.8,10.8,0,0,0-10.8,10.79v.5a10.78,10.78,0,0,1-6.61,10l-.46.19a10.81,10.81,0,0,0-5.77,14.14h0a10.78,10.78,0,0,1-2.32,11.82h0a10.81,10.81,0,0,0,0,15.27l.36.35a10.8,10.8,0,0,1,2.36,11.71l-.19.46a10.79,10.79,0,0,0,5.92,14.07h0a10.8,10.8,0,0,1,6.71,10h0a10.8,10.8,0,0,0,10.8,10.79h.49a10.81,10.81,0,0,1,10,6.62l.19.45a10.79,10.79,0,0,0,14.13,5.77h0a10.8,10.8,0,0,1,11.82,2.32h0a10.79,10.79,0,0,0,15.27,0l.35-.35a10.8,10.8,0,0,1,11.71-2.36l.46.19a10.81,10.81,0,0,0,14.08-5.92h0a10.79,10.79,0,0,1,10-6.72h0a10.8,10.8,0,0,0,10.8-10.79v-.5a10.79,10.79,0,0,1,6.61-9.95l.46-.19a10.81,10.81,0,0,0,5.77-14.14h0A10.77,10.77,0,0,1,457.61,2417.22Z"
              transform="translate(-314.08 -2336.24)"
            />
            <path
              style={{ fill: "#f0f5fc" }}
              className="cls-2"
              d="M382.16,2395.28c0,7.88-4.56,13.34-12.45,13.34-7.45,0-12.39-4.56-12.39-13.32,0-7.41,4.38-13.21,12.47-13.21C377.05,2382.09,382.16,2386.6,382.16,2395.28Zm-17.1,0c0,4.56,1.68,7,4.75,7s4.79-2.2,4.79-7c0-5-1.94-6.89-4.81-6.89S365.06,2390.61,365.06,2395.28Zm4.55,33.67,28.28-46.08h7.35L376.91,2429Zm47.92-12.43c0,7.87-4.55,13.34-12.44,13.34-7.48,0-12.39-4.61-12.39-13.32,0-7.41,4.37-13.21,12.47-13.21C412.43,2403.33,417.53,2407.84,417.53,2416.52Zm-17.1,0c0,4.55,1.67,7,4.75,7s4.8-2.2,4.8-7c0-5-1.94-6.89-4.83-6.89S400.43,2411.88,400.43,2416.52Z"
              transform="translate(-314.08 -2336.24)"
            />
          </svg>
          <div>
            <p className="text-red-500 font-bold">Promo Code</p>
            <p className="text-[12px] text-gray-600">
              Use promo to get discounts
            </p>
          </div>
        </div>
        <hr className="border-2 border-gray-300 mx-9" />
        <div className="flex justify-between items-center w-[80%] mx-auto my-2">
          <div className="flex flex-col items-center">
            <small className="text-gray-600 text-[10px]">Subtotal</small>
            <p className="text-xl font-bold">${totalPrice}</p>
          </div>
          <button
            onClick={handleCheckout}
            disabled={!isAuthenticated}
            className="py-2 px-6 disabled:bg-red-400 bg-red-600 text-white rounded-full"
          >
            {!isAuthenticated ? "Login" : "Checkout"}
          </button>
        </div>
      </footer>
    </main>
  );
};

export default Cart;

const CartItem = ({ title, price, image, quantity, id, video, capStyle }) => {
  // const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  return (
    <div className="flex py-8 gap-x-4 px-4  rounded-xl bg-white my-5 mx-3 ">
      <div className="flex gap-1">
        {video ? (
          <video src={image} autoPlay muted className=" w-1/2 "></video>
        ) : (
          <img src={image} alt="" className="w-[40%] rounded-xl" />
        )}
        <p className="text-xl text-gray-600 font-semibold">{title}</p>
        <div className="flex flex-col gap-4 justify-between items-center">
          <p className="price text-2xl font-extrabold">${price}</p>
          <div className="flex items-center justify-center gap-1">
            <RiDeleteBin5Line
              onClick={() => {
                dispatch({
                  type: "REMOVE_FROM_CART",
                  payload: { _id: id },
                });
                dispatch({ type: "CALCULATE_SUBTOTAL" });
              }}
            />
            <div className="border-2 rounded-lg border-gray-200 flex items-center justify-between px-2 w-24">
              <button
                onClick={() => {
                  dispatch({
                    type: "ADD_TO_CART",
                    payload: {
                      _id: id,
                      title,
                      price,
                      image,
                      qty: quantity,
                      capStyle,
                    },
                  });
                  dispatch({ type: "CALCULATE_SUBTOTAL" });
                }}
              >
                +
              </button>
              <button>{quantity}</button>
              <button
                onClick={() => {
                  dispatch({
                    type: "DECREASE_QUANTITY",
                    payload: { _id: id },
                  });
                  dispatch({ type: "CALCULATE_SUBTOTAL" });
                }}
              >
                -
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
