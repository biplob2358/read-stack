import { createBrowserRouter } from "react-router";
import App from "../App";
import Books from "../pages/Books";
import CreateBook from "../pages/CreateBook";
import BorrowSummary from "../pages/BorrowSummary";
import CreateBorrow from "../pages/CreateBorrow";
import Home from "../pages/Home";
import BookDetails from "../pages/BookDetails";

const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        index: true,
        Component: Home,
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
        path: "books/:id",
        Component: BookDetails,
      },
      {
        path: "borrow-summary",
        Component: BorrowSummary,
      },
      {
        path: "edit-book/:id",
        Component: Books,
      },
      {
        path: "borrow/:bookId",
        Component: CreateBorrow,
      },
    ],
  },
]);
export default router;
