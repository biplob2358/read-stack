import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL || "https://libaray-management-server.vercel.app/api/",
  }),
  tagTypes: ["Books", "Borrows"],
  endpoints: () => ({}),
});
