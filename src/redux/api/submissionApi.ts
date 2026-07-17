/* eslint-disable @typescript-eslint/no-explicit-any */
import { Submission, SubmissionDetailsResponse, SubmissionListResponse, SubmissionStats } from "@/src/types/submission";
import { baseApi } from "./baseApi";

export const submissionApi = baseApi.enhanceEndpoints({ addTagTypes: ["Submission", "SubmissionStats"] }).injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getSubmissions: builder.query<SubmissionListResponse, { form_id: string; params?: any }>({
      query: ({ form_id, params }) => ({
        url: `/whatsapp/form-builder/${form_id}/submissions`,
        params,
      }),
      providesTags: (result) => (result ? [...result.data.map(({ _id }) => ({ type: "Submission" as const, id: _id })), { type: "Submission", id: "LIST" }] : [{ type: "Submission", id: "LIST" }]),
    }),
    getSubmissionStats: builder.query<{ success: boolean; data: SubmissionStats }, string>({
      query: (form_id) => `/whatsapp/form-builder/${form_id}/submissions/stats`,
      providesTags: (result, error, form_id) => [{ type: "SubmissionStats", id: form_id }],
    }),
    getSubmissionDetails: builder.query<SubmissionDetailsResponse, string>({
      query: (id) => `/whatsapp/form-builder/submissions/${id}`,
      providesTags: (result, error, id) => [{ type: "Submission", id }],
    }),
    updateSubmissionStatus: builder.mutation<{ success: boolean; data: Submission }, { id: string; status: string }>({
      query: ({ id, status }) => ({
        url: `/whatsapp/form-builder/submissions/${id}`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Submission", id }, { type: "Submission", id: "LIST" }, { type: "SubmissionStats" }],
    }),
    deleteSubmission: builder.mutation<{ success: boolean; message: string }, string>({
      query: (id) => ({
        url: `/whatsapp/form-builder/submissions/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Submission", id: "LIST" }, { type: "SubmissionStats" }],
    }),
  }),
});

export const { useGetSubmissionsQuery, useGetSubmissionStatsQuery, useGetSubmissionDetailsQuery, useUpdateSubmissionStatusMutation, useDeleteSubmissionMutation } = submissionApi;
