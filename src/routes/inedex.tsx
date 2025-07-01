import { createBrowserRouter } from "react-router";
import App from "../App";
import Books from "../pages/Books";
import CreateBook from "../pages/CreateBook";
import BorrowSummary from "../pages/BorrowSummary";

const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        index: true,
        Component: Books,
      },
      {
        index: true,
        path: "books",
        Component: Books,
      },
      {
        path: "create-book",
        Component: CreateBook,
      },
      {
        path: "borrow-summary",
        Component: BorrowSummary,
      },
    ],
  },
]);
export default router;
