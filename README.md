# 📚 ReadStack- Minimal Library Management System

A clean, modern library management system built with React, Redux Toolkit Query (RTK Query), and TypeScript. This system provides essential book management and borrowing functionality without authentication complexity.

## 🌐 Live Website & API Server

- **Live Website:** [https://read-stack-roan.vercel.app/](https://read-stack-roan.vercel.app)  
- **API Server:** [https://libaray-management-server.vercel.app/](https://libaray-management-server.vercel.app/)

## 🚀 Features

### 📖 Book Management
- **View Books**: Browse all books in a responsive table format
- **Add Books**: Create new book entries with comprehensive details
- **Edit Books**: Update existing book information
- **Delete Books**: Remove books with confirmation dialogs
- **Real-time Updates**: Instant UI updates after API operations

### 📋 Borrowing System
- **Borrow Books**: Simple borrowing process with quantity and due date selection
- **Availability Tracking**: Automatic availability status updates based on copies
- **Borrow Summary**: Aggregated view of all borrowed books

### 🎨 User Interface
- **Responsive Design**: Fully responsive layout for mobile, tablet, and desktop
- **Clean UI**: Minimalist design with Tailwind CSS
- **Intuitive Navigation**: Simple navbar with clear page routing
- **User-Friendly Forms**: Easy-to-use forms with validation

## 🛠️ Tech Stack

- **Frontend**: React 18+ with TypeScript
- **State Management**: Redux Toolkit Query (RTK Query)
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **HTTP Client**: RTK Query (built on Redux Toolkit)
- **Build Tool**: Vite (recommended) or Create React App

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- npm  package manager

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/biplob2358/read-stack.git
   cd read-stack
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   ```bash
   cp .env.example .env
   ```
   Update the `.env` file with your API endpoint:
   ```
   VITE_API_URL=http://localhost:5001/api/](https://libaray-management-server.vercel.app/
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Access the application**
   Open [http://localhost:3000](http://localhost:5173) in your browser

## 🗂️ Project Structure

```
src
|  App.css
│   App.tsx
│   index.css
│   main.tsx
│   vite-env.d.ts
│
├───assets
│       react.svg
│
├───components
│   ├───books
│   │       DeleteModal.tsx
│   │       EditModal.tsx
│   │       index.tsx
│   │
│   ├───footer
│   │       Footer.tsx
│   │
│   ├───home
│   │       DeleteModal.tsx
│   │       Hero.tsx
│   │       NewBooks.tsx
│   │
│   ├───navbar
│   │       Navbar.tsx
│   │
│   └───ui
│           alert.tsx
│           button.tsx
│           dialog.tsx
│           input.tsx
│           pagination.tsx
│           skeleton.tsx
│           sonner.tsx
│
├───lib
│       utils.ts
│
├───pages
│       BookDetails.tsx
│       Books.tsx
│       BorrowSummary.tsx
│       CreateBook.tsx
│       CreateBorrow.tsx
│       Home.tsx
│
├───redux
│   │   store.ts
│   │
│   └───api
│           baseApi.ts
│           bookApi.ts
│           borrowApi.ts
│
├───routes
│       inedex.tsx
│
└───types
        book.ts
        borrow.ts
```


## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.


## 🙏 Acknowledgments

- React Team for the amazing framework
- Redux Toolkit team for excellent state management
- Tailwind CSS for the utility-first CSS framework
- TypeScript team for type safety

## 📊 Project Status

- ✅ Core book management functionality
- ✅ Borrowing system implementation
- ✅ Responsive UI design
- ✅ TypeScript integration
- ✅ RTK Query implementation
- 🚧 Advanced search features (planned)
- 🚧 Export functionality (planned)
- 🚧 Book categories management (planned)

---

**Built with ❤️ for efficient library management**
