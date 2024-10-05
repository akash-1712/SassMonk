import React, { useContext, useState } from "react";
import MovieContext from "../store/MovieContex";

interface AddMovieFormProps {
  onClose: () => void;
}

const AddMovieForm: React.FC<AddMovieFormProps> = ({ onClose }) => {
  const [name, setName] = useState<string>("");
  const [releaseDate, setReleaseDate] = useState<string>("");
  const { addMovies } = useContext(MovieContext);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = { name, releaseDate };
    console.log(data);
    try {
      await addMovies(data);
      console.log("new movies added");
      onClose();
    } catch (error) {
      console.error("Error adding movie:", error);
      setErrorMessage("Failed to add the movie. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-lg w-96"
      >
        <h2 className="text-lg font-bold mb-4">Add New Movie</h2>
        {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
        <input
          type="text"
          placeholder="Movie Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border border-gray-300 mb-4 rounded"
          required
        />
        <input
          type="date"
          value={releaseDate}
          onChange={(e) => setReleaseDate(e.target.value)}
          className="w-full p-2 border border-gray-300 mb-4 rounded"
          required
        />
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition"
          >
            Add Movie
          </button>
          <button
            type="button"
            onClick={onClose}
            className="ml-2 border border-purple-600 text-purple-600 px-4 py-2 rounded hover:bg-purple-50 transition"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddMovieForm;
