"use client";

import { useState, useContext } from "react";
import MovieCard from "./components/MovieCard";
import EditMovieForm from "./components/EditMovieForm";
import MovieContext from "./store/MovieContex";

interface Movie {
  id: number;
  name: string;
  releaseDate: string;
  averageRating: number | null;
}

const App = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [showEditMovieForm, setShowEditMovieForm] = useState<boolean>(false);
  const { deleteMovie, movies } = useContext(MovieContext);
  const [id, setId] = useState<number>(0);
  const [movieName, setMovieName] = useState<string>("");
  const [releaseDate, setReleaseDate] = useState<string>("");

  const filteredMovies =
    (movies &&
      movies.filter((movie: Movie) =>
        movie.name.toLowerCase().includes(searchTerm.toLowerCase())
      )) ||
    [];

  const handleEdit = (movie: Movie) => {
    setShowEditMovieForm(true);
    setId(movie.id);
    setMovieName(movie.name);
    setReleaseDate(movie.releaseDate);
    console.log(`Edit movie with id: ${movie.id}`);
  };

  const handleDelete = async (id: number) => {
    await deleteMovie(id);
  };

  return (
    <div>
      {showEditMovieForm && (
        <EditMovieForm
          onClose={() => setShowEditMovieForm(false)}
          mn={movieName}
          mrd={releaseDate}
          mid={id}
        />
      )}

      <div className="p-6 max-w-screen-lg mx-auto">
        <input
          type="text"
          placeholder="Search for your favourite movie"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded mb-6"
        />
        <div className="grid grid-cols-3 gap-6">
          {filteredMovies.map((movie: Movie) => (
            <MovieCard
              key={movie.id}
              id={movie.id}
              name={movie.name}
              releaseDate={movie.releaseDate}
              averageRating={movie.averageRating || 10}
              onEdit={() => handleEdit(movie)}
              onDelete={handleDelete}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
