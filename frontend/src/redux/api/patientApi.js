import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../baseUrl";

export const patientApi = createApi({
  reducerPath: "patientApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
  }),

  tagTypes: ["patient"],
  endpoints: (builder) => ({
    getPatient: builder.query({
      query: ({ volunteerId }) => ({
        url: `/patient?${volunteerId ? `volunteer_id=${volunteerId}` : ""}`,
        credentials: "include",
      }),
      providesTags: ["patient"],
    }),
    getVolunteer: builder.query({
      query: () => ({
        url: "/volunteer",
        credentials: "include",
      }),
    }),
    createPatient: builder.mutation({
      query: ({ patient }) => ({
        url: "/patient",
        method: "POST",
        body: patient,
        credentials: "include",
      }),
      invalidatesTags: ["patient"],
    }),
    updatePatient: builder.mutation({
      query: ({ patient, id }) => ({
        url: `/patient/${id}`,
        method: "PUT",
        body: patient,
        credentials: "include",
      }),
      invalidatesTags: ["patient"],
    }),
    deletePatient: builder.mutation({
      query: ({ id }) => ({
        url: `/patient/${id}`,
        method: "DELETE",
        body: id,
        credentials: "include",
      }),
      invalidatesTags: ["patient"],
    }),
    getSinglePatient: builder.query({
      query: ({ id }) => ({
        url: `/patient/${id}`,
        credentials: "include",
      }),
      providesTags: ["patient"],
    }),
  }),
});

export const {
  useGetPatientQuery,
  useGetVolunteerQuery,
  useCreatePatientMutation,
  useDeletePatientMutation,
  useGetSinglePatientQuery,
  useUpdatePatientMutation,
} = patientApi;
