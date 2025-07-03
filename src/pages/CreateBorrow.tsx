import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useGetBookQuery } from "../redux/api/bookApi";
import { useBorrowBookMutation } from "../redux/api/borrowApi";
import { toast } from "sonner";
import { Skeleton } from "../components/ui/skeleton";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";

const CreateBorrow = () => {
  const { bookId } = useParams<{ bookId: string }>();
  const navigate = useNavigate();

  const {
    data: book,
    isLoading: bookLoading,
    error: bookError,
    refetch,
  } = useGetBookQuery(bookId ?? "", {
    skip: !bookId,
  });

  const [borrowBook, { isLoading: isBorrowing }] = useBorrowBookMutation();

  const [quantity, setQuantity] = useState(1);
  const [dueDate, setDueDate] = useState("");

  useEffect(() => {
    if (bookId) {
      refetch();
    }
  }, [bookId, refetch]);

  const handleSubmit = async () => {
    if (!book) return;

    if (quantity > book?.copies) {
      toast.error("Quantity exceeds available copies.");
      return;
    }

    try {
      await borrowBook({
        book: bookId ?? "",
        quantity,
        dueDate,
      }).unwrap();

      toast.success("Book borrowed successfully!");
      navigate("/borrow-summary");
    } catch (err) {
      console.error(err);
      toast.error("Failed to borrow book?. Try again.");
    }
  };

  return (
    <section className="p-4 min-h-[700px] container mx-auto">
      <div className="mt-10 bg-white rounded-xl shadow-lg p-6 flex flex-col md:flex-row gap-8">
        <div className="md:w-1/2 border border-gray-200 rounded-lg p-5 shadow-sm bg-gray-50">
          <h2 className="text-2xl font-bold mb-5 text-gray-800">
            📚 Book Details
          </h2>
          {bookLoading ? (
            <>
              <Skeleton className="h-6 w-full mb-3" />
              <Skeleton className="h-6 w-full mb-3" />
              <Skeleton className="h-6 w-full mb-3" />
              <Skeleton className="h-6 w-full mb-3" />
            </>
          ) : bookError ? (
            <p className="text-red-600">Failed to load book data.</p>
          ) : (
            <ul className="space-y-3 text-gray-700 text-base">
              <li>
                <span className="font-semibold">📖 Title:</span> {book?.title}
              </li>
              <li>
                <span className="font-semibold">✍️ Author:</span> {book?.author}
              </li>
              <li>
                <span className="font-semibold">🏷️ Genre:</span> {book?.genre}
              </li>
              <li>
                <span className="font-semibold">🔢 ISBN:</span> {book?.isbn}
              </li>
              <li>
                <span className="font-semibold">📦 Available Copies:</span>{" "}
                {book?.copies}
              </li>
            </ul>
          )}
        </div>
        <div className="md:w-1/2 border border-gray-200 rounded-lg p-5 shadow-sm bg-gray-50">
          <h2 className="text-2xl font-bold mb-5 text-gray-800">
            📥 Borrow Form
          </h2>

          {book?.copies === 0 ? (
            <p className="text-red-600 font-semibold">
              This book is not available for borrowing.
            </p>
          ) : (
            <>
              <div className="mb-5">
                <label
                  htmlFor="quantity"
                  className="block font-medium text-gray-700 mb-2"
                >
                  Quantity{" "}
                  <span className="text-sm text-gray-500">
                    (Available: {book?.copies})
                  </span>
                </label>
                <Input
                  id="quantity"
                  type="number"
                  min={1}
                  max={book?.copies}
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  disabled={isBorrowing}
                  className="bg-white"
                />
              </div>

              <div className="mb-6">
                <label
                  htmlFor="dueDate"
                  className="block font-medium text-gray-700 mb-2"
                >
                  Due Date
                </label>
                <Input
                  id="dueDate"
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  disabled={isBorrowing}
                  className="bg-white"
                />
              </div>

              <div className="flex space-x-4">
                <Button
                  onClick={handleSubmit}
                  disabled={
                    isBorrowing ||
                    !book ||
                    quantity <= 0 ||
                    !dueDate ||
                    book?.copies === 0
                  }
                >
                  {isBorrowing ? "Borrowing..." : "Borrow"}
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => navigate(-1)}
                  disabled={isBorrowing}
                  className="text-gray-600"
                >
                  Cancel
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default CreateBorrow;
