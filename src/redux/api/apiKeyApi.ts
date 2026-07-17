/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "./baseApi";
import type {
  ApiKey,
  GenericApiResponse,
  ApiKeyListResponse,
} from "@/src/types/integrationTools";

// Re-export for backward compatibility
export type { ApiKey, ApiKeyListResponse };

// Alias for existing code using GenericResponse
export type GenericResponse = GenericApiResponse;

export const apiKeyApi = baseApi
  .enhanceEndpoints({ addTagTypes: ["ApiKeys"] })
  .injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
      getApiKeys: builder.query<
        ApiKeyListResponse,
        { page?: number; limit?: number }
      >({
        query: (params) => ({
          url: "/api-keys",
          params,
        }),
        providesTags: ["ApiKeys"],
      }),
      createApiKey: builder.mutation<GenericResponse, { name: string }>({
        query: (data) => ({
          url: "/api-keys",
          method: "POST",
          body: data,
        }),
        invalidatesTags: ["ApiKeys"],
      }),
      deleteApiKey: builder.mutation<GenericResponse, { ids: string[] }>({
        query: (data) => ({
          url: "/api-keys/delete",
          method: "POST",
          body: data,
        }),
        invalidatesTags: ["ApiKeys"],
      }),
    }),
  });

export const {
  useGetApiKeysQuery,
  useCreateApiKeyMutation,
  useDeleteApiKeyMutation,
} = apiKeyApi;
