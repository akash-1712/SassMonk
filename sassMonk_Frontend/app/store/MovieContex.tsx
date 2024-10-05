import { createContext } from "react";

interface Movie {
  id: number;
  name: string;
  releaseDate: string;
  averageRating: number | null;
}

interface Review {
  id: string;
  movieId: number;
  reviewerName: string | null;
  rating: number;
  comments: string;
}

interface MovieContextType {
  movies: Movie[] | null;
  movie: Movie | null;
  reviews: Review[] | null;
  addMovies: (data: { name: string; releaseDate: string }) => Promise<void>;
  addReview: (data: Review) => Promise<void>;
  editMovie: (
    id: number,
    data: { name: string; releaseDate: string }
  ) => Promise<void>;
  editReview: (id: string, data: Review) => Promise<void>;
  deleteMovie: (id: number) => Promise<void>;
  deleteReview: (MovieId: number, id: string) => Promise<void>;
  setMovieDetails: (id: number) => Promise<void>;
}

const initialMovieValue: MovieContextType = {
  movies: null,
  movie: null,
  reviews: null,
  addMovies: async () => {},
  addReview: async () => {},
  editMovie: async () => {},
  editReview: async () => {},
  deleteMovie: async () => {},
  deleteReview: async () => {},
  setMovieDetails: async () => {},
};

const MovieContext = createContext<MovieContextType>(initialMovieValue);

export default MovieContext;
