import { useState } from "react";
import { useGetBooksQuery } from "../redux/api/bookApi";
import type { IBook } from "../types/book";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../components/ui/pagination";
import { HandHelping, Pencil, Trash2 } from "lucide-react";

const Books = () => {
  const [page, setPage] = useState(1);
  const limit = 20;

  const { data, isLoading, error } = useGetBooksQuery({ page, limit });

  if (isLoading) return <p className="text-center mt-10">Loading...</p>;
  if (error)
    return (
      <p className="text-center text-red-500 mt-10">Failed to load books.</p>
    );

  const totalPages = data ? Math.ceil(data.total / limit) : 1;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const handleEdit = (id: string) => {
  console.log("Edit book", id);
  // navigate(`/edit-book/${id}`) or open a modal
};

const handleDelete = (id: string) => {
  console.log("Delete book", id);
  // show confirmation modal, call delete API
};

const handleBorrow = (id: string) => {
  console.log("Borrow book", id);
  // open borrow form/modal or navigate to /borrow/:bookId
};


  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">📚 All Books</h2>
  <table className="w-full table-auto border">
  <thead className="bg-gray-100">
    <tr>
      <th className="p-2 border">Title</th>
      <th className="p-2 border">Author</th>
      <th className="p-2 border">Genre</th>
      <th className="p-2 border">ISBN</th>
      <th className="p-2 border">Copies</th>
      <th className="p-2 border">Available</th>
      <th className="p-2 border">Actions</th>
    </tr>
  </thead>
  <tbody>
    {data?.data.map((book: IBook) => (
      <tr key={book._id}>
        <td className="p-2 border">{book.title}</td>
        <td className="p-2 border">{book.author}</td>
        <td className="p-2 border">{book.genre}</td>
        <td className="p-2 border">{book.isbn}</td>
        <td className="p-2 border">{book.copies}</td>
        <td className="p-2 border">
          {book.available ? (
            <span className="text-green-600 font-medium">Yes</span>
          ) : (
            <span className="text-red-600 font-medium">No</span>
          )}
        </td>
        <td className="p-2 border">
          <div className="flex space-x-2 justify-center">
            <button
              onClick={() => handleEdit(book._id)}
              className="text-blue-600 hover:text-blue-800"
              title="Edit Book"
            >
              <Pencil size={18} />
            </button>
            <button
              onClick={() => handleDelete(book._id)}
              className="text-red-600 hover:text-red-800"
              title="Delete Book"
            >
              <Trash2 size={18} />
            </button>
            <button
              onClick={() => handleBorrow(book._id)}
              className="text-green-600 hover:text-green-800"
              title="Borrow Book"
            >
              <HandHelping size={18} />
            </button>
          </div>
        </td>
      </tr>
    ))}
  </tbody>
</table>


      {/* Pagination */}
      <Pagination
        aria-label="Page navigation"
        className="mt-4 flex justify-center"
      >
        <PaginationPrevious
          onClick={
            page === 1 ? undefined : () => setPage((p) => Math.max(p - 1, 1))
          }
          className={page === 1 ? "pointer-events-none opacity-50" : ""}
        >
          Previous
        </PaginationPrevious>

        <PaginationContent>
          {pages.map((pageNumber) => (
            <PaginationItem
              key={pageNumber}
              className={page === pageNumber ? "font-bold underline" : ""}
            >
              <PaginationLink onClick={() => setPage(pageNumber)}>
                {pageNumber}
              </PaginationLink>
            </PaginationItem>
          ))}
        </PaginationContent>

        <PaginationNext
          onClick={
            page === totalPages
              ? undefined
              : () => setPage((p) => Math.min(p + 1, totalPages))
          }
          className={
            page === totalPages ? "pointer-events-none opacity-50" : ""
          }
        >
          Next
        </PaginationNext>
      </Pagination>
    </div>
  );
};

export default Books;
