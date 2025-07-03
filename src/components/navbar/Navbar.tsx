import { useState } from "react";
import { Link } from "react-router";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold text-blue-700">
          <img
            src="/public/img/logo.svg"
            alt="ReadStack Logo"
            className="h-10 w-10 inline-block mr-2"
          />
          ReadStack
        </Link>

        <button
          className="md:hidden text-gray-700"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {isOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>

        {/* Desktop menu */}
        <ul className="hidden md:flex gap-6 text-gray-700 font-medium">
          <li>
            <Link to="/books">All Books</Link>
          </li>
          <li>
            <Link to="/create-book">Add Book</Link>
          </li>
          <li>
            <Link to="/borrow-summary">Borrow Summary</Link>
          </li>
        </ul>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4">
          <ul className="flex flex-col gap-3 text-gray-700 font-medium">
            <li>
              <Link to="/books" onClick={() => setIsOpen(false)}>
                All Books
              </Link>
            </li>
            <li>
              <Link to="/create-book" onClick={() => setIsOpen(false)}>
                Add Book
              </Link>
            </li>
            <li>
              <Link to="/borrow-summary" onClick={() => setIsOpen(false)}>
                Borrow Summary
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
