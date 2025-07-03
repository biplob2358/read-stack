import { Skeleton } from "../components/ui/skeleton";
import { useGetBorrowSummaryQuery } from "../redux/api/borrowApi";

export default function BorrowSummary() {
  const { data, isLoading, error } = useGetBorrowSummaryQuery();
  const summaries = data?.data || [];

  return (
    <div className="flex flex-col items-center  min-h-screen bg-gray-100 px-4 py-10">
      <div className="w-full container  bg-white p-6 rounded shadow-md">
        <h1 className="text-2xl font-bold mb-4">Borrow Summary</h1>

        {isLoading ? (
          <div className="space-y-3">
            {[...Array(3)].map((_, i) => (
              <Skeleton key={i} className="h-8 w-full" />
            ))}
          </div>
        ) : error ? (
          <p className="text-red-500">Failed to load borrow summary.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full table-auto border-collapse">
              <thead>
                <tr className="bg-gray-100 text-left">
                  <th className="px-4 py-2 border-b">Book Title</th>
                  <th className="px-4 py-2 border-b">ISBN</th>
                  <th className="px-4 py-2 border-b">
                    Total Quantity Borrowed
                  </th>
                </tr>
              </thead>
              <tbody>
                {summaries.length > 0 ? (
                  summaries.map((item, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-4 py-2 border-b">{item.book.title}</td>
                      <td className="px-4 py-2 border-b">{item.book.isbn}</td>
                      <td className="px-4 py-2 border-b">
                        {item.totalQuantity}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={3} className="text-center py-4 text-gray-500">
                      No borrow records found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
