import { useState } from "react";
import { useNavigate } from "react-router";

import { toast } from "sonner";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { useCreateBookMutation } from "../redux/api/bookApi";

export default function CreateBook() {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    genre: "",
    isbn: "",
    description: "",
    copies: "",
    available: true,
  });

  const navigate = useNavigate();
  const [createBook, { isLoading }] = useCreateBookMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.title ||
      !formData.author ||
      !formData.genre ||
      !formData.isbn ||
      !formData.copies
    ) {
      toast.error("Please fill all required fields.");
      return;
    }

    try {
      await createBook({
        ...formData,
        copies: Number(formData.copies),
      }).unwrap();

      toast.success("Book created successfully!");
      navigate("/books");
    } catch (error) {
      console.error(error);
      toast.error("Failed to create book.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white p-6 rounded-md shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">Create Book</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium mb-1">Title</label>
            <Input
              name="title"
              value={formData.title}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Author</label>
            <Input
              name="author"
              value={formData.author}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Genre</label>
            <Input
              name="genre"
              value={formData.genre}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block font-medium mb-1">ISBN</label>
            <Input name="isbn" value={formData.isbn} onChange={handleChange} />
          </div>

          <div>
            <label className="block font-medium mb-1">Description</label>
            <Input
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Copies</label>
            <Input
              name="copies"
              type="number"
              value={formData.copies}
              onChange={handleChange}
              min={0}
            />
          </div>

          <div className="flex items-center space-x-2">
            <input
              id="available"
              name="available"
              type="checkbox"
              checked={formData.available}
              onChange={handleChange}
            />
            <label htmlFor="available">Available</label>
          </div>

          <div className="pt-4 flex justify-end">
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Creating..." : "Create Book"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
