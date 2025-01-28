import { baseApi } from "@/redux/api/baseApi";

const reviewManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addReview: builder.mutation({
      query: (data) => ({
        url: "/review",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["review"],
    }),
    getReview: builder.query({
      query: () => ({
        url: "/review",
        method: "GET",
      }),
      providesTags: ["review"],
    }),
  }),
});

export const { useAddReviewMutation, useGetReviewQuery } =
  reviewManagementApi;
