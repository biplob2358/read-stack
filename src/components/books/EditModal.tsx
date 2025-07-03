import { useEffect, useState } from "react";
import { Dialog } from "@radix-ui/react-dialog";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog";
import {
  useGetBookQuery,
  useUpdateBookMutation,
} from "../../redux/api/bookApi";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Skeleton } from "../ui/skeleton";
import { toast } from "sonner";

interface EditModalProps {
  openEditModal: boolean;
  setOpenEditModal: (open: boolean) => void;
  selectedBookId: string;
}

const EditModal = ({
  openEditModal,
  setOpenEditModal,
  selectedBookId,
}: EditModalProps) => {
  const {
    data: book,
    isLoading,
    error,
  } = useGetBookQuery(selectedBookId, {
    skip: !selectedBookId,
  });

  const [updateBook, { isLoading: isUpdating }] = useUpdateBookMutation();

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    genre: "",
    isbn: "",
    description: "",
    copies: "",
  });

  const [updateStatus, setUpdateStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  useEffect(() => {
    if (book) {
      setFormData({
        title: book.title || "",
        author: book.author || "",
        genre: book.genre || "",
        isbn: book.isbn || "",
        description: book.description || "",
        copies: book.copies?.toString() || "",
      });
    }
  }, [book]);

  useEffect(() => {
    if (!openEditModal) {
      setUpdateStatus("idle");
    }
  }, [openEditModal]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    if (!selectedBookId) return;
    setUpdateStatus("idle");

    try {
      await updateBook({
        id: selectedBookId,
        data: {
          ...formData,
          copies: Number(formData.copies),
        },
      }).unwrap();

      setUpdateStatus("success");
      toast.success("Book updated successfully!");

      setTimeout(() => {
        setOpenEditModal(false);
      }, 800);
    } catch (err) {
      console.error("Failed to update book:", err);
      setUpdateStatus("error");
      toast.error("Failed to update book.");
    }
  };

  return (
    <Dialog open={openEditModal} onOpenChange={() => setOpenEditModal(false)}>
      <DialogContent
        className="bg-white rounded-md p-6 max-w-lg mx-auto w-full sm:w-[480px] md:w-[600px] shadow-lg outline-none transform transition-all duration-300 ease-in-out origin-center min-h-[480px] flex flex-col"
        style={{
          opacity: openEditModal ? 1 : 0,
          transform: openEditModal ? "scale(1)" : "scale(0.96)",
          pointerEvents: openEditModal ? "auto" : "none",
        }}
      >
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Edit Book</DialogTitle>
          {error && (
            <p className="mt-2 text-red-500">Failed to load book data.</p>
          )}
        </DialogHeader>

        <DialogDescription className="flex-grow overflow-auto mt-4 space-y-4">
          {isLoading ? (
            <>
              <Skeleton className="h-8 w-full rounded-md" />
              <Skeleton className="h-8 w-full rounded-md" />
              <Skeleton className="h-8 w-full rounded-md" />
              <Skeleton className="h-8 w-full rounded-md" />
              <Skeleton className="h-8 w-full rounded-md" />
              <Skeleton className="h-8 w-1/2 rounded-md" />
            </>
          ) : (
            <>
              {[
                "title",
                "author",
                "genre",
                "isbn",
                "description",
                "copies",
              ].map((field) => (
                <div key={field}>
                  <label
                    htmlFor={field}
                    className="block font-medium mb-1 capitalize"
                  >
                    {field}
                  </label>

                  {field === "description" ? (
                    <textarea
                      id={field}
                      name={field}
                      placeholder={field}
                      value={(formData as any)[field]}
                      onChange={handleChange}
                      disabled={isUpdating}
                      rows={4}
                      className="w-full rounded-md border border-gray-300 px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-dark-500"
                    />
                  ) : (
                    <Input
                      id={field}
                      name={field}
                      placeholder={field}
                      value={(formData as any)[field]}
                      onChange={handleChange}
                      type={field === "copies" ? "number" : "text"}
                      disabled={isUpdating}
                    />
                  )}
                </div>
              ))}

              {updateStatus === "success" && (
                <div className="mt-4 p-3 bg-green-100 border border-green-300 text-green-700 rounded">
                  Book updated successfully!
                </div>
              )}

              {updateStatus === "error" && (
                <div className="mt-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded">
                  Failed to update book. Please try again.
                </div>
              )}
            </>
          )}
        </DialogDescription>

        <div className="mt-6 flex justify-end space-x-2">
          <Button
            onClick={handleSubmit}
            disabled={isUpdating || isLoading}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            {isUpdating ? "Saving..." : "Save Changes"}
          </Button>

          <Button
            variant="ghost"
            onClick={() => setOpenEditModal(false)}
            disabled={isUpdating}
          >
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditModal;
