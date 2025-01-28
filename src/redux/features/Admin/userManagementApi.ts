import { baseApi } from "@/redux/api/baseApi";

const userManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMe: builder.query({
      query: ({ email, role }) => ({
        url: `/auth/me`,
        method: "GET",
        params: { email, role },
      }),
    }),

    getUser: builder.query({
      query: () => ({
        url: "/auth/user",
        method: "GET",
      }),
    }),
    changePassword: builder.mutation({
      query: (data) => ({
        url: "/auth/change-password",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useGetMeQuery, useGetUserQuery, useChangePasswordMutation } = userManagementApi;
