import { AIModelsResponse, AISettings, AISettingsResponse } from "@/src/types/settings";
import { baseApi } from "./baseApi";

export const settingsApi = baseApi.enhanceEndpoints({ addTagTypes: ["Settings"] }).injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getSettings: builder.query({
      query: (params) => ({
        url: "/settings",
        params,
      }),
    }),
    getUserSettings: builder.query<AISettingsResponse, void>({
      query: () => ({
        url: "/user-settings",
        method: "GET",
      }),
      providesTags: ["Settings"],
    }),
    getAllModels: builder.query<AIModelsResponse, void>({
      query: () => ({
        url: "/ai/models",
        method: "GET",
      }),
    }),
    updateUserSettings: builder.mutation<void, AISettings | FormData>({
      query: (body) => ({
        url: "/user-settings",
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Settings"],
    }),
  }),
});

export const { useGetSettingsQuery, useGetUserSettingsQuery, useGetAllModelsQuery, useUpdateUserSettingsMutation } = settingsApi;
