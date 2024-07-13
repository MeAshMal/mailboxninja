import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_SERVER_URL,
  }),
  tagTypes: ["Products", "Features"],
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: ({ category = "", search = "" }) => ({
        url: `/products?category=${category}&search=${search}`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["Products"],
    }),
    getProduct: builder.query({
      query: ({ id }) => ({
        url: `/product/${id}`,
        method: "GET",
        credentials: "include",
      }),
    }),
    getFeaturedProducts: builder.query({
      query: () => ({
        url: "/featuredProducts",
        method: "GET",
        credentials: "include",
      }),
    }),
    createProduct: builder.mutation({
      query: ({ formData }) => ({
        url: "/create/product",
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        body: { formData },
      }),
      invalidatesTags: ["Products"],
    }),
    deleteProduct: builder.mutation({
      query: ({ id }) => ({
        url: "/product/" + id,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["Products"],
    }),
    updateProduct: builder.mutation({
      query: ({
        id,
        title,
        price,
        details,
        features,
        stock,
        category,
        oldPrice,
      }) => ({
        url: "/product/" + id,
        method: "PUT",
        credentials: "include",
        body: { title, price, details, features, stock, category, oldPrice },
      }),
      invalidatesTags: ["Products"],
    }),
    allFeatures: builder.query({
      query: () => ({
        url: "/features",
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["Features"],
    }),
    deleteFeature: builder.mutation({
      query: ({ id }) => ({
        url: "/feature/" + id,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["Features"],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductQuery,
  useGetFeaturedProductsQuery,
  useCreateProductMutation,
  useDeleteProductMutation,
  useUpdateProductMutation,
  useAllFeaturesQuery,
  useDeleteFeatureMutation,
} = productsApi;
