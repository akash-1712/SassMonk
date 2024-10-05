import React, { useContext, useState } from "react";
import MovieContext from "../store/MovieContex";

interface AddReviewFormProps {
  onClose: () => void;
}

const AddReviewForm: React.FC<AddReviewFormProps> = ({ onClose }) => {
  const [selectedMovieId, setSelectedMovieId] = useState<number | null>(null);
  const [content, setContent] = useState("");
  const [rating, setRating] = useState("");
  const [author, setAuthor] = useState("");
  const { addReview, movies } = useContext(MovieContext);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMovieId) {
      alert("Please select a movie.");
      return;
    }

    if (Number(rating) < 0 || Number(rating) > 10) {
      alert("Rating must be between 0 and 10.");
      return;
    }

    const data: {
      id: string;
      movieId: number;
      reviewerName: string | null;
      rating: number;
      comments: string;
    } = {
      id: selectedMovieId.toString(),
      movieId: selectedMovieId,
      reviewerName: author || null,
      rating: Number(rating),
      comments: content,
    };

    try {
      await addReview(data);
      console.log("Review added successfully");

      setSelectedMovieId(null);
      setContent("");
      setRating("");
      setAuthor("");
      onClose();
    } catch (error) {
      console.error("Error adding review:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-lg w-96"
      >
        <h2 className="text-lg font-bold mb-4">Add New Review</h2>

        <select
          value={selectedMovieId || ""}
          onChange={(e) => setSelectedMovieId(Number(e.target.value))}
          className="w-full p-2 border border-gray-300 mb-4"
          required
        >
          <option value="" disabled>
            Select a movie
          </option>
          {movies &&
            movies.map((movie) => (
              <option key={movie.id} value={movie.id}>
                {movie.name}
              </option>
            ))}
        </select>

        <textarea
          placeholder="Review Comments"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full p-2 border border-gray-300 mb-4"
          required
        />

        <input
          type="number"
          placeholder="Rating (0-10)"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          className="w-full p-2 border border-gray-300 mb-4"
          min="0"
          max="10"
          required
        />

        <input
          type="text"
          placeholder="Reviewer Name (optional)"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="w-full p-2 border border-gray-300 mb-4"
        />

        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
          >
            Add Review
          </button>
          <button
            type="button"
            onClick={onClose}
            className="ml-2 border border-purple-600 text-purple-600 px-4 py-2 rounded hover:bg-purple-50"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddReviewForm;
