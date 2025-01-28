import { baseApi } from "@/redux/api/baseApi";

const productManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: (params) => {
        const queryParams = new URLSearchParams();

        if (params) {
          Object.entries(params).forEach(([key, value]) => {
            if (value) {
              queryParams.append(key, value.toString());
            }
          });
        }

        return {
          url: "/car",
          method: "GET",
          params: queryParams,
        };
      },
      providesTags: ["cars"],
    }),
    addProduct: builder.mutation({
      query: (data) => ({
        url: "/car",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["cars"],
    }),
    getAProduct: builder.query({
      query: (id) => ({
        url: `/car/${id}`,
        method: "GET",
      }),
    }),
    updateProduct: builder.mutation({
      query: ({ id, data }) => ({
        url: `/car/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["cars"],
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/car/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["cars"],
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useAddProductMutation,
  useGetAProductQuery,
  useDeleteProductMutation,
  useUpdateProductMutation,
} = productManagementApi;
