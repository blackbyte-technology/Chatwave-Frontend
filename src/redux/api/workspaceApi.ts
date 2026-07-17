import { baseApi } from "./baseApi";
import { Workspace } from "@/src/types/workspace";

interface GetWorkspacesResponse {
  success: boolean;
  data: Workspace[];
}

interface CreateWorkspacePayload {
  name: string;
  description?: string;
}

interface UpdateWorkspacePayload {
  id: string;
  name: string;
  description?: string;
}

interface WorkspaceResponse {
  success: boolean;
  data: Workspace;
}

export const workspaceApi = baseApi.enhanceEndpoints({ addTagTypes: ["Workspace"] }).injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getWorkspaces: builder.query<GetWorkspacesResponse, void>({
      query: () => `/workspaces`,
      providesTags: [{ type: "Workspace", id: "LIST" }],
    }),
    createWorkspace: builder.mutation<WorkspaceResponse, CreateWorkspacePayload>({
      query: (body) => ({ url: `/workspaces`, method: "POST", body }),
      invalidatesTags: [{ type: "Workspace", id: "LIST" }],
    }),
    updateWorkspace: builder.mutation<WorkspaceResponse, UpdateWorkspacePayload>({
      query: ({ id, ...body }) => ({ url: `/workspaces/${id}`, method: "PATCH", body }),
      invalidatesTags: [{ type: "Workspace", id: "LIST" }],
    }),
    deleteWorkspace: builder.mutation<{ success: boolean; message: string }, string>({
      query: (id) => ({ url: `/workspaces/${id}`, method: "DELETE" }),
      invalidatesTags: [{ type: "Workspace", id: "LIST" }],
    }),
  }),
});

export const { useGetWorkspacesQuery, useLazyGetWorkspacesQuery, useCreateWorkspaceMutation, useUpdateWorkspaceMutation, useDeleteWorkspaceMutation } = workspaceApi;
