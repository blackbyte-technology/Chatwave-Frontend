import { WidgetListResponse, WidgetResponse } from "@/src/types/widget";
import { baseApi } from "./baseApi";

export const widgetApi = baseApi.enhanceEndpoints({ addTagTypes: ["Widgets"] }).injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getAllWidgets: builder.query<WidgetListResponse, { page?: number; limit?: number; search?: string; sort_by?: string; sort_order?: string }>({
      query: (params) => ({
        url: "/widgets",
        method: "GET",
        params,
      }),
      providesTags: (result) =>
        result?.data?.widgets
          ? [...result.data.widgets.map(({ _id }) => ({ type: "Widgets" as const, id: _id })), { type: "Widgets", id: "LIST" }]
          : [{ type: "Widgets", id: "LIST" }],
    }),
    getWidgetById: builder.query<WidgetResponse, string>({
      query: (id) => ({
        url: `/widgets/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "Widgets", id }],
    }),
    getWidgetByPhoneNoId: builder.query<WidgetResponse, string>({
      query: (phoneNoId) => ({
        url: `/widgets/phone/${phoneNoId}`,
        method: "GET",
      }),
      providesTags: (result, error, phoneNoId) => [{ type: "Widgets", id: phoneNoId }],
    }),
    createWidget: builder.mutation<WidgetResponse, FormData>({
      query: (body) => ({
        url: "/widgets",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Widgets", id: "LIST" }],
    }),
    updateWidget: builder.mutation<WidgetResponse, { id: string; body: FormData }>({
      query: ({ id, body }) => ({
        url: `/widgets/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Widgets", id },
        { type: "Widgets", id: "LIST" },
      ],
    }),
    deleteWidget: builder.mutation<{ success: boolean; message?: string }, string>({
      query: (id) => ({
        url: `/widgets/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "Widgets", id },
        { type: "Widgets", id: "LIST" },
      ],
    }),
    bulkDeleteWidgets: builder.mutation<{ success: boolean; message: string; data: { deletedCount: number; deletedIds: string[] } }, { ids: string[] }>({
      query: (body) => ({
        url: "/widgets/bulk-delete",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Widgets", id: "LIST" }],
    }),
  }),
});

export const { useGetAllWidgetsQuery, useGetWidgetByIdQuery, useGetWidgetByPhoneNoIdQuery, useCreateWidgetMutation, useUpdateWidgetMutation, useDeleteWidgetMutation, useBulkDeleteWidgetsMutation } = widgetApi;
