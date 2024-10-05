import React, { useContext, useState } from "react";
import MovieContext from "../store/MovieContex";

interface EditMovieFormProps {
  onClose: () => void;
  mn: string;
  mrd: string;
  mid: number;
}

const EditMovieForm: React.FC<EditMovieFormProps> = ({
  onClose,
  mn,
  mrd,
  mid,
}) => {
  const [name, setName] = useState(mn);
  const [releaseDate, setReleaseDate] = useState(mrd);
  const { editMovie } = useContext(MovieContext);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const data = { name, releaseDate };

    try {
      await editMovie(mid, data);
      onClose();
    } catch (error) {
      setError("Error updating movie. Please try again.");
      console.error("Error updating movie:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-lg">
        <h2 className="text-lg font-bold mb-4">Edit Movie</h2>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Previous Name:
          </label>
          <p className="text-gray-500 mb-2">{mn}</p>
          <input
            type="text"
            placeholder="Movie Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border border-gray-300"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Previous Release Date:
          </label>
          <p className="text-gray-500 mb-2">{mrd}</p>
          <input
            type="date"
            value={releaseDate}
            onChange={(e) => setReleaseDate(e.target.value)}
            className="w-full p-2 border border-gray-300"
            required
          />
        </div>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
          >
            Update Movie
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

export default EditMovieForm;
