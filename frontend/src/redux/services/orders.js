import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const orderApi = createApi({
  reducerPath: "orderApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_SERVER_URL }),
  tagTypes: ["Orders"],
  endpoints: (builder) => ({
    newOrder: builder.mutation({
      query: ({ orderItems, totalPrice, url }) => ({
        url,
        method: "POST",
        credentials: "include",
        body: { orderItems, totalPrice },
      }),
    }),
    getOrder: builder.query({
      query: ({ id }) => ({
        url: "/order/" + id,
        method: "GET",
        credentials: "include",
      }),
    }),
    getMyOrders: builder.query({
      query: () => ({
        url: "myorders",
        method: "GET",
        credentials: "include",
      }),
    }),
    getAllOrders: builder.query({
      query: () => ({
        url: "orders",
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["Orders"],
    }),
    processOrder: builder.mutation({
      query: ({ id }) => ({
        url: "/process/order/" + id,
        method: "PUT",
        credentials: "include",
      }),
      invalidatesTags: ["Orders"],
    }),
  }),
});

export const {
  useNewOrderMutation,
  useGetOrderQuery,
  useGetMyOrdersQuery,
  useGetAllOrdersQuery,
  useProcessOrderMutation,
} = orderApi;
