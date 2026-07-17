import { baseApi } from "./baseApi";
import { 
  PlanResponse, 
  PlansListResponse, 
  PaginatedPlansResponse 
} from "@/src/types/plan";
import { Plan } from "@/src/types/subscription";

export const planApi = baseApi.enhanceEndpoints({ addTagTypes: ["Plan"] }).injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getActivePlans: builder.query<PlansListResponse, void>({
      query: () => "/plan/active",
      providesTags: ["Plan"],
    }),
    getFeaturedPlans: builder.query<PlansListResponse, void>({
      query: () => "/plan/featured",
      providesTags: ["Plan"],
    }),
    getPlanById: builder.query<PlanResponse, string>({
      query: (id) => `/plan/${id}`,
      providesTags: (result, error, id) => [{ type: "Plan", id }],
    }),
    getAllPlans: builder.query<PaginatedPlansResponse, { page?: number; limit?: number }>({
      query: (params) => ({
        url: "/plan",
        params,
      }),
      providesTags: ["Plan"],
    }),
    createPlan: builder.mutation<PlanResponse, Partial<Plan>>({
      query: (body) => ({
        url: "/plan/create",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Plan"],
    }),
    updatePlan: builder.mutation<PlanResponse, { id: string; data: Partial<Plan> }>({
      query: ({ id, data }) => ({
        url: `/plan/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => ["Plan", { type: "Plan", id }],
    }),
    updatePlanStatus: builder.mutation<PlanResponse, { id: string; is_active: boolean }>({
      query: ({ id, is_active }) => ({
        url: `/plan/${id}/status`,
        method: "PUT",
        body: { is_active },
      }),
      invalidatesTags: (result, error, { id }) => ["Plan", { type: "Plan", id }],
    }),
    deletePlan: builder.mutation<{ success: boolean; message: string }, string[]>({
      query: (ids) => ({
        url: "/plan",
        method: "DELETE",
        body: { ids },
      }),
      invalidatesTags: ["Plan"],
    }),
  }),
});

export const {
  useGetActivePlansQuery,
  useGetFeaturedPlansQuery,
  useGetPlanByIdQuery,
  useGetAllPlansQuery,
  useCreatePlanMutation,
  useUpdatePlanMutation,
  useUpdatePlanStatusMutation,
  useDeletePlanMutation,
} = planApi;
