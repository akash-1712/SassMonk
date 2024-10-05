"use client";

import { useEffect, useState, ReactNode, useCallback } from "react";

import axios from "axios";
import MovieContext from "../store/MovieContex";

interface Review {
  id: string;
  movieId: number;
  reviewerName: string | null;
  rating: number;
  comments: string;
}

interface Movie {
  id: number;
  name: string;
  releaseDate: string;
  averageRating: number | null;
}

interface MovieContextProviderProps {
  children: ReactNode;
}

export function MovieContextProvider({ children }: MovieContextProviderProps) {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [movie, setMovie] = useState<Movie | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);

  const fetchMovie = useCallback(function () {
    axios
      .get("https://saasmonk-test-backend.vercel.app/movies")
      .then((response) => {
        setMovies(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    fetchMovie();
  }, [fetchMovie]);

  async function setMovieDetails(id: number) {
    try {
      const movieResponse = await axios.get(
        `https://saasmonk-test-backend.vercel.app/movies/${id}`
      );
      setMovie(movieResponse.data);

      const reviewsResponse = await axios.get(
        `https://saasmonk-test-backend.vercel.app/movies/${id}/reviews`
      );
      setReviews(reviewsResponse.data);
      console.log(id, reviewsResponse, movieResponse);
    } catch (error) {
      console.error(error);
    }
  }

  async function addMovies({
    name,
    releaseDate,
  }: {
    name: string;
    releaseDate: string;
  }) {
    try {
      console.log("adding movies", name, releaseDate);
      const response = await axios.post(
        "https://saasmonk-test-backend.vercel.app/movies",
        {
          name,
          releaseDate,
        }
      );
      console.log(response);
      setMovies((prevMovies) => [...prevMovies, response.data]);
    } catch (error) {
      console.error(error);
    }
  }

  async function deleteMovie(id: number) {
    try {
      await axios.delete(
        `https://saasmonk-test-backend.vercel.app/movies/${id}`
      );
      setMovies((prevMovies) => prevMovies.filter((movie) => movie.id !== id));
    } catch (error) {
      console.error(error);
    }
  }

  async function editMovie(
    id: number,
    data: { name: string; releaseDate: string }
  ) {
    try {
      const response = await axios.put(
        `https://saasmonk-test-backend.vercel.app/movies/${id}`,
        data
      );
      setMovies((prevMovies) =>
        prevMovies.map((movie) => (movie.id === id ? response.data : movie))
      );
    } catch (error) {
      console.error(error);
    }
  }

  async function addReview(data: Review) {
    try {
      await axios.post(
        "https://saasmonk-test-backend.vercel.app/reviews",
        data
      );

      fetchMovie();
      setMovieDetails(data.movieId);
    } catch (error) {
      console.error(error);
    }
  }

  async function editReview(id: string, data: Review) {
    try {
      await axios.put(
        `https://saasmonk-test-backend.vercel.app/reviews/${id}`,
        data
      );
      setMovieDetails(data.movieId);
    } catch (error) {
      console.error(error);
    }
  }

  async function deleteReview(MovieId: number, id: string) {
    try {
      await axios.delete(
        `https://saasmonk-test-backend.vercel.app/reviews/${id}`
      );
      setMovieDetails(Number(MovieId));
    } catch (error) {
      console.error(error);
    }
  }

  const movieCtxValue = {
    movies,
    movie,
    reviews,
    addMovies,
    deleteMovie,
    editMovie,
    addReview,
    editReview,
    deleteReview,
    setMovieDetails,
  };

  return (
    <MovieContext.Provider value={movieCtxValue}>
      {children}
    </MovieContext.Provider>
  );
}
