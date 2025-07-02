import { useNavigate, useLocation } from "react-router";
import { useGetBooksQuery } from "../../redux/api/bookApi";
import type { IBook } from "../../types/book";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../../components/ui/pagination";
import { Button } from "../../components/ui/button";
import EditModal from "./EditModal";
import DeleteModal from "./DeleteModal";
import { useState } from "react";

const BooksTable = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);

  const [page, setPage] = useState(1);
  const limit = 20;

  const { data, isLoading, error } = useGetBooksQuery({ page, limit });

  const totalPages = data ? Math.ceil(data.total / limit) : 1;
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const modalRoute = location.pathname;
  const editId = modalRoute.startsWith("/edit-book/") ? modalRoute.split("/edit-book/")[1] : null;

  const handleEdit = (id: string) => navigate(`/edit-book/${id}`);
  const handleBorrow = (id: string) => navigate(`/borrow/${id}`);
  const handleDelete = (id: string) => {
    setDeleteTargetId(id);
    setOpenDeleteModal(true);
  };

  if (isLoading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-red-500 text-center mt-10">Failed to load books.</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">📚 All Books</h2>

      <div className="w-full overflow-x-auto">
        <table className="w-full min-w-[700px] table-auto border">
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
                    <Button
                      onClick={() => handleEdit(book._id)}
                      className="bg-green-400 hover:bg-green-500 text-white"
                      variant="ghost"
                    >
                      Edit
                    </Button>
                    <Button
                      onClick={() => handleDelete(book._id)}
                      className="bg-red-400 hover:bg-red-500 text-white"
                      variant="ghost"
                    >
                      Delete
                    </Button>
                    <Button
                      onClick={() => handleBorrow(book._id)}
                      className="bg-blue-400 hover:bg-blue-500 text-white"
                      variant="ghost"
                    >
                      Borrow
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <Pagination className="mt-4 flex justify-center">
        <PaginationPrevious
          onClick={page === 1 ? undefined : () => setPage(page - 1)}
          className={page === 1 ? "pointer-events-none opacity-50" : ""}
        />
        <PaginationContent>
          {pages.map((p) => (
            <PaginationItem key={p} className={page === p ? "font-bold underline" : ""}>
              <PaginationLink onClick={() => setPage(p)}>{p}</PaginationLink>
            </PaginationItem>
          ))}
        </PaginationContent>
        <PaginationNext
          onClick={page === totalPages ? undefined : () => setPage(page + 1)}
          className={page === totalPages ? "pointer-events-none opacity-50" : ""}
        />
      </Pagination>

      {/* Modals */}
      {editId && (
        <EditModal
          openEditModal={true}
          setOpenEditModal={() => navigate("/books")}
          selectedBookId={editId}
        />
      )}

      {openDeleteModal && deleteTargetId && (
        <DeleteModal
          openDeleteModal={true}
          setOpenDeleteModal={setOpenDeleteModal}
          selectedBookId={deleteTargetId}
        />
      )}
    </div>
  );
};

export default BooksTable;
