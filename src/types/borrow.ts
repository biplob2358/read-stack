export interface IBorrow {
  _id: string;
  book: string;
  quantity: number;
  dueDate: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface IBorrowSummary {
  bookId: string;
  title: string;
  isbn: string;
  totalBorrowed: number;
}
