import type { IBorrow, IBorrowSummary } from "../../types/borrow";
import { baseApi } from "./baseApi";

export const borrowApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    borrowBook: builder.mutation<IBorrow, Partial<IBorrow>>({
      query: (data) => ({
        url: "borrows",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Borrows", "Books"],
    }),
    getBorrowSummary: builder.query<IBorrowSummary[], void>({
      query: () => "borrows/summary",
      providesTags: ["Borrows"],
    }),
  }),
});

export const { useBorrowBookMutation, useGetBorrowSummaryQuery } = borrowApi;
