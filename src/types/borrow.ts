/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IBorrow {
  _id: string;
  book: string;
  quantity: number;
  dueDate: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface IBorrowSummary {
  book: any;
  totalQuantity: any;
  bookId: string;
  title: string;
  isbn: string;
  totalBorrowed: number;
}
