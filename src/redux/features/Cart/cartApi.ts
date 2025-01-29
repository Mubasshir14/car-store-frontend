import { baseApi } from "@/redux/api/baseApi";

const cartApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addCart: builder.mutation({
      query: (data) => ({
        url: "/cart",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["cart"],
    }),
    getCart: builder.query({
      query: () => ({
        url: "/cart",
        method: "GET",
      }),
      providesTags: ["cart"],
    }),
    deleteCart: builder.mutation({
      query: (id) => ({
        url: `/cart/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["cart"],
    }),
    deleteAllCart: builder.mutation({
      query: () => ({
        url: `/cart`,
        method: "DELETE",
      }),
      invalidatesTags: ["cart"],
    }),
    updateCart: builder.mutation({
      query: ({ id, data }) => ({
        url: `/cart/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["cart"],
    }),
  }),
});

export const {
  useAddCartMutation,
  useGetCartQuery,
  useDeleteCartMutation,
  useDeleteAllCartMutation,
  useUpdateCartMutation,
} = cartApi;
