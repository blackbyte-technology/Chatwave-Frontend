import { GetCurrenciesParams, GetCurrenciesResponse } from "@/src/types/currency";
import { baseApi } from "./baseApi";

export const currencyApi = baseApi.enhanceEndpoints({ addTagTypes: ["Currency"] }).injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getAllCurrencies: builder.query<GetCurrenciesResponse, GetCurrenciesParams>({
      query: (params) => {
        const queryParams = new URLSearchParams();
        if (params.is_active !== undefined) queryParams.append("is_active", params.is_active.toString());
        if (params.page) queryParams.append("page", params.page.toString());
        if (params.limit) queryParams.append("limit", params.limit.toString());
        if (params.search) queryParams.append("search", params.search);
        if (params.sort_by) queryParams.append("sort_by", params.sort_by);
        if (params.sort_order) queryParams.append("sort_order", params.sort_order);
        return `/currencies?${queryParams.toString()}`;
      },
      providesTags: [{ type: "Currency", id: "LIST" }],
    }),
    getExchangeRate: builder.query<{ success: boolean; data: { from: string; to: string; rate: number } }, { from: string; to: string }>({
      query: ({ from, to }) => `/currencies/get-exchange-rate?from=${from}&to=${to}`,
    }),
  }),
});

export const { useGetAllCurrenciesQuery, useGetExchangeRateQuery, useLazyGetExchangeRateQuery } = currencyApi;
