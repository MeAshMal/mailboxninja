import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import { server } from "../store";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_SERVER_URL }),
  tagTypes: ["Auth"],
  endpoints: (builder) => ({
    login: builder.mutation({
      query: ({ username, password }) => ({
        url: "/login",
        method: "POST",
        body: { username, password },
        credentials: "include",
      }),
      invalidatesTags: ["Auth"],
    }),
    register: builder.mutation({
      query: ({
        email,
        password,
        username,
        avatar,
        phone,
        city,
        state,
        street,
        pincode,
        code,
      }) => ({
        url: "/register",
        method: "POST",
        body: {
          email,
          password,
          name: username,
          avatar,
          phone,
          city,
          state,
          street,
          pincode,
          code,
        },
        credentials: "include",
      }),
      invalidatesTags: ["Auth"],
    }),
    loadUser: builder.query({
      query: () => ({
        url: "/me",
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["Auth"],
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/logout",
        method: "GET",
        credentials: "include",
      }),
      invalidatesTags: ["Auth"],
    }),
    getAllUsers: builder.query({
      query: () => ({
        url: "/users",
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["Auth"],
    }),
    addAddress: builder.mutation({
      query: ({ state, city, street, pincode }) => ({
        url: "/address",
        method: "POST",
        credentials: "include",
        body: { state, city, street, pincode },
      }),
      invalidatesTags: ["Auth"],
    }),
    changePassword: builder.mutation({
      query: ({ oldPassword, newPassword }) => ({
        url: "/changepassword",
        method: "PUT",
        credentials: "include",
        body: { oldPassword, newPassword },
      }),
      invalidatesTags: ["Auth"],
    }),
    updateRole: builder.mutation({
      query: ({ id }) => ({
        url: "/updaterole/" + id,
        method: "PUT",
        credentials: "include",
      }),
      invalidatesTags: ["Auth"],
    }),
    forgotPassword: builder.mutation({
      query: ({ email }) => ({
        url: "/forgotpassword",
        method: "POST",
        credentials: "include",
        body: { email },
      }),
    }),
    resetPassword: builder.mutation({
      query: ({ token, password }) => ({
        url: `/password/reset/${token}`,
        method: "PUT",
        credentials: "include",
        body: { password },
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useLoadUserQuery,
  useLogoutMutation,
  useRegisterMutation,
  useGetAllUsersQuery,
  useAddAddressMutation,
  useChangePasswordMutation,
  useUpdateRoleMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
} = authApi;
