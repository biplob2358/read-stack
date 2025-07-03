import type { IBook, PaginatedBooksResponse } from "../../types/book";
import { baseApi } from "./baseApi";

export const bookApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBooks: builder.query<
      PaginatedBooksResponse,
      { page: number; limit: number }
    >({
      query: ({ page, limit }) => `books?page=${page}&limit=${limit}`,
      providesTags: ["Books"],
    }),

    getBook: builder.query<IBook, string>({
      query: (id) => `books/${id}`,
      transformResponse: (response: {
        success: boolean;
        message: string;
        data: IBook;
      }) => response.data,
      providesTags: ["Books"],
    }),
    getRecentBooks: builder.query<IBook[], void>({
      query: () => "books/new",
      transformResponse: (response: {
        success: boolean;
        message: string;
        data: IBook[];
      }) => response.data,
      providesTags: ["Books"],
    }),
    createBook: builder.mutation<IBook, Partial<IBook>>({
      query: (book) => ({
        url: "books",
        method: "POST",
        body: book,
      }),
      invalidatesTags: ["Books"],
    }),
    updateBook: builder.mutation<IBook, { id: string; data: Partial<IBook> }>({
      query: ({ id, data }) => ({
        url: `books/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Books"],
    }),
    deleteBook: builder.mutation<void, string>({
      query: (id) => ({
        url: `books/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Books"],
    }),
  }),
});

export const {
  useGetBooksQuery,
  useGetBookQuery,
  useGetRecentBooksQuery,
  useCreateBookMutation,
  useUpdateBookMutation,
  useDeleteBookMutation,
} = bookApi;
