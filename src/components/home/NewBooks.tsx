import { useGetRecentBooksQuery } from "../../redux/api/bookApi";
import type { IBook } from "../../types/book";
import { Button } from "../../components/ui/button";
import { useNavigate } from "react-router";
import { useState } from "react";
import DeleteModal from "./DeleteModal";
import { Skeleton } from "../ui/skeleton";

const NewBooks = () => {
  const navigate = useNavigate();
  const { data: books, isLoading, error, refetch } = useGetRecentBooksQuery();
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);

  const handleDelete = (id: string) => {
    setDeleteTargetId(id);
    setOpenDeleteModal(true);
  };
  if (isLoading)
    return (
      <div className="space-y-3">
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} className="h-8 w-full" />
        ))}
      </div>
    );
  if (error)
    return (
      <p className="text-center text-red-500 mt-10">
        Failed to load recent books.
      </p>
    );

  return (
    <div className="p-4 container mx-auto">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold mb-4">🆕 Recently Added Books</h2>
        <Button
          onClick={() => navigate("/create-book")}
         
        >
          Add New
        </Button>
      </div>

      <div className="w-full overflow-x-auto">
        <table className="w-full min-w-[700px] table-auto border">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">Title</th>
              <th className="p-2 border">Author</th>
              <th className="p-2 border">Genre</th>
              <th className="p-2 border">ISBN</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
        <tbody>
  {books?.map((book: IBook) => (
    <tr
      key={book._id}
      className="cursor-pointer hover:bg-gray-100 transition"
      onClick={() => navigate(`/books/${book._id}`)}
    >
      <td className="p-2 border">{book.title}</td>
      <td className="p-2 border">{book.author}</td>
      <td className="p-2 border">{book.genre}</td>
      <td className="p-2 border">{book.isbn}</td>
      <td
        className="p-2 border"
        onClick={(e) => e.stopPropagation()} // Prevent row navigation when clicking inside buttons
      >
        <div className="flex space-x-2 justify-center">
          <Button
            onClick={() => navigate(`/edit-book/${book._id}`)}
            className="bg-green-400 hover:bg-green-500 text-white hover:text-white"
            variant="ghost"
          >
            Edit
          </Button>
          <Button
            onClick={() => navigate(`/borrow/${book._id}`)}
            className="bg-blue-400 hover:bg-blue-500 text-white hover:text-white"
            variant="ghost"
          >
            Borrow
          </Button>
          <Button
            onClick={() => handleDelete(book._id)}
            className="bg-red-400 hover:bg-red-500 text-white hover:text-white"
            variant="ghost"
          >
            Delete
          </Button>
        </div>
      </td>
    </tr>
  ))}
</tbody>

        </table>
      </div>
      {openDeleteModal && deleteTargetId && (
        <DeleteModal
          openDeleteModal={true}
          setOpenDeleteModal={setOpenDeleteModal}
          selectedBookId={deleteTargetId}
          refetch={refetch}
        />
      )}
    </div>
  );
};

export default NewBooks;
