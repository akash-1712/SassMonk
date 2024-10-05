import React, { useContext, useState } from "react";
import MovieContext from "../store/MovieContex";

interface EditReviewFormProps {
  onClose: () => void;
  rid: string;
  movieId: string;
  initialContent: string;
  initialRating: string;
  initialAuthor: string;
}

const EditReviewForm: React.FC<EditReviewFormProps> = ({
  onClose,
  rid,
  movieId,
  initialContent,
  initialRating,
  initialAuthor,
}) => {
  const [content, setContent] = useState<string>(initialContent);
  const [rating, setRating] = useState<string>(initialRating);
  const [author, setAuthor] = useState<string>(initialAuthor);
  const { editReview } = useContext(MovieContext);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data: {
      id: string;
      movieId: number;
      reviewerName: string | null;
      rating: number;
      comments: string;
    } = {
      id: rid,
      movieId: Number(movieId),
      reviewerName: author,
      rating: Number(rating),
      comments: content,
    };

    try {
      await editReview(rid, data);
      console.log("Review updated successfully");
    } catch (error) {
      console.error("Error updating review:", error);
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-lg">
        <h2 className="text-lg font-bold mb-4">Edit Review</h2>

        <textarea
          placeholder="Review Comments"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full p-2 border border-gray-300 mb-4"
          required
        />
        <input
          type="text"
          placeholder="Rating (0-10)"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          className="w-full p-2 border border-gray-300 mb-4"
          required
        />
        <input
          type="text"
          placeholder="Reviewer Name (optional)"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="w-full p-2 border border-gray-300 mb-4"
        />
        <button
          type="submit"
          className="bg-purple-600 text-white px-4 py-2 rounded"
        >
          Update Review
        </button>
        <button
          type="button"
          onClick={onClose}
          className="ml-2 border border-purple-600 text-purple-600 px-4 py-2 rounded"
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default EditReviewForm;
