import { useParams } from "react-router";
import { useGetBookQuery } from "../redux/api/bookApi";
import { Skeleton } from "../components/ui/skeleton";

const BookDetails = () => {
  const { id } = useParams<{ id: string }>();

  const {
    data: book,
    isLoading,
    error,
  } = useGetBookQuery(id ?? "", {
    skip: !id,
  });

  return (
    <section className="p-4 min-h-[700px] container mx-auto">
      <div className="mt-10 bg-white rounded-xl shadow-lg p-6 flex justify-center">
        <div className="w-full md:w-2/3 border border-gray-200 rounded-lg p-6 shadow-sm bg-gray-50">
          <h2 className="text-2xl font-bold mb-5 text-gray-800 text-center">
            📘 Book Details
          </h2>

          {isLoading ? (
            <>
              <Skeleton className="h-6 w-full mb-3" />
              <Skeleton className="h-6 w-full mb-3" />
              <Skeleton className="h-6 w-full mb-3" />
              <Skeleton className="h-6 w-full mb-3" />
              <Skeleton className="h-6 w-full mb-3" />
            </>
          ) : error ? (
            <p className="text-red-600 text-center">
              Failed to load book details.
            </p>
          ) : (
            <ul className="space-y-4 text-gray-700 text-base">
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
              <li>
                <span className="font-semibold">📅 Published Date:</span>{" "}
                {book?.createdAt ? book.createdAt.slice(0, 10) : "N/A"}
              </li>
              <li>
                <span className="font-semibold">📝 Description:</span>{" "}
                {book?.description ?? "No description provided."}
              </li>
            </ul>
          )}
        </div>
      </div>
    </section>
  );
};

export default BookDetails;
