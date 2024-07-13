import React, { useEffect } from "react";
import Menubar from "./components/Menubar";
import { useLoadUserQuery } from "../../redux/services/auth";
import { Link, useFetcher, useNavigate, useParams } from "react-router-dom";
import {
  useDeleteProductMutation,
  useGetProductQuery,
} from "../../redux/services/product";

const Product = () => {
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

  const [productDelete, productDeleteResult] = useDeleteProductMutation();

  const deleteProduct = async (id) => {
    await productDelete({ id });
    navigate("/admin/products");
  };

  useEffect(() => {
    if (productDeleteResult.isSuccess) {
      navigate("/admin/products");
    }
  }, [productDeleteResult]);

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
        <p className="font-bold text-lg text-gray-600">Product</p>
      </header>
      <main className="h-screen bg-gray-200 py-3">
        <div class="relative  flex w-full  overflow-hidden rounded-lg border-gray-100 bg-white justify-center items-center">
          <div class="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl">
            {result.data?.product.file.isVideo ? (
              <video
                src={result.data?.product.file.url}
                autoPlay
                controls={false}
                muted
              ></video>
            ) : (
              <img
                class="object-cover"
                src={result.data?.product.file.url}
                alt="product"
              />
            )}
          </div>
          <div class="mt-4 px-5 pb-5">
            <div>
              <h5 class="text-xl tracking-tight text-slate-900">
                {result.data?.product.title}
              </h5>
            </div>
            <div class="mt-2 mb-5 flex items-center justify-between">
              <p>
                <span class="text-3xl font-bold text-slate-900">
                  ${result.data?.product.price}
                </span>
                {result.data?.product.oldPrice && (
                  <span class="text-sm text-slate-900 line-through">
                    ${result.data?.product.oldPrice}
                  </span>
                )}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => deleteProduct(result.data?.product._id)}
                class="flex items-center justify-center rounded-md bg-red-600 px-5 py-2.5 text-center text-sm font-medium text-white focus:outline-none "
              >
                Delete
              </button>
              <Link
                to={"/admin/updateproduct/" + result.data?.product._id}
                class="flex items-center justify-center rounded-md bg-gray-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none"
              >
                Edit
              </Link>
            </div>
          </div>
        </div>

        <Menubar />
      </main>
    </>
  );
};

export default Product;
