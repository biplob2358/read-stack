import { useState } from "react";
import { Dialog } from "@radix-ui/react-dialog";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog";
import { Button } from "../ui/button";
import { useDeleteBookMutation } from "../../redux/api/bookApi";
import { toast } from "sonner";

interface DeleteModalProps {
  openDeleteModal: boolean;
  setOpenDeleteModal: (open: boolean) => void;
  selectedBookId: string | null;
  onDeleteSuccess?: () => void;
  refetch?: () => void;
}

const DeleteModal = ({
  openDeleteModal,
  setOpenDeleteModal,
  selectedBookId,
  onDeleteSuccess,
  refetch,
}: DeleteModalProps) => {
  const [deleteBook, { isLoading }] = useDeleteBookMutation();
  const [error, setError] = useState<string | null>(null);

  const handleDelete = async () => {
    if (!selectedBookId) return;
    setError(null);

    try {
      await deleteBook(selectedBookId).unwrap();
      setOpenDeleteModal(false);
      onDeleteSuccess?.();

      toast.success("Book deleted successfully!");
      refetch?.();
    } catch (err) {
      console.error("Failed to delete book:", err);
      setError("Failed to delete book. Please try again.");
      toast.error("Failed to delete book.");
    }
  };

  return (
    <Dialog open={openDeleteModal} onOpenChange={setOpenDeleteModal}>
      <DialogContent className="bg-white rounded-md p-6 max-w-md mx-auto w-full shadow-lg outline-none transform transition-all duration-300 ease-in-out origin-center">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Confirm Delete
          </DialogTitle>
        </DialogHeader>

        <DialogDescription className="mt-4 text-gray-700">
          Are you sure you want to delete this book? This action cannot be
          undone.
        </DialogDescription>

        {error && (
          <p className="mt-4 text-sm text-red-600 font-medium">{error}</p>
        )}

        <div className="mt-6 flex justify-end space-x-2">
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={isLoading}
            className="bg-red-600 hover:bg-red-700 text-white"
          >
            {isLoading ? "Deleting..." : "Delete"}
          </Button>

          <Button
            variant="ghost"
            onClick={() => setOpenDeleteModal(false)}
            disabled={isLoading}
          >
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteModal;
