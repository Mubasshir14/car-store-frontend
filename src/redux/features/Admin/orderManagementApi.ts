import { baseApi } from "@/redux/api/baseApi";
import { TQueryParam, TResponseRedux } from "@/types/global";
import { TOrder } from "@/types/TOrder";

const orderManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllOrders: builder.query({
      query: (args) => {
        console.log(args);
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }

        return {
          url: "/order",
          method: "GET",
          params: params,
        };
      },
      transformResponse: (response: TResponseRedux<TOrder[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),
    addOrder: builder.mutation({
      query: (data) => ({
        url: "/order",
        method: "POST",
        body: data,
      }),
    }),
    getRevenue: builder.query({
      query: () => ({
        url: "/order/revenue",
        method: "GET",
      }),
    }),
    verifyOrder: builder.mutation({
      query: (order_id) => ({
        url: `/order/verify`,
        method: "GET",
        params: { order_id },
      }),
      invalidatesTags: ["order"],
    }),

    getOrder: builder.query({
      query: () => ({
        url: "/order/my-order",
        method: "GET",
      }),
      providesTags: ["order"],
    }),
    getSingleOrder: builder.query({
      query: (id) => ({
        url: `/order/${id}`,
        method: "GET",
      }),
      providesTags: ["order"],
    }),
    getAdminSingleOrder: builder.query({
      query: (id) => ({
        url: `/order/admin/${id}`,
        method: "GET",
      }),
      providesTags: ["order"],
    }),
    updateOrderStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `/order/${id}/status`,
        method: "PATCH",
        body: { orderStatus: status },
      }),
      invalidatesTags: ["order"],
    }),
  }),
});

export const {
  useAddOrderMutation,
  useGetAllOrdersQuery,
  useGetRevenueQuery,
  useGetOrderQuery,
  useVerifyOrderMutation,
  useGetSingleOrderQuery,
  useGetAdminSingleOrderQuery,
  useUpdateOrderStatusMutation,
} = orderManagementApi;
