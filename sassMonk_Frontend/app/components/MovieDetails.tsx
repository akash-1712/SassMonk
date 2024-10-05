"use client";
import React, { useContext, useEffect, useState } from "react";
import EditReviewForm from "./EditReviewForm";
import MovieContext from "../store/MovieContex";

interface Review {
  id: string;
  movieId: number;
  reviewerName: string | null;
  rating: number;
  comments: string;
}

interface MovieDetailProps {
  id: string;
}

const MovieDetail: React.FC<MovieDetailProps> = ({ id }) => {
  const [showEditReviewForm, setShowEditReviewForm] = useState<boolean>(false);
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const { deleteReview, movie, setMovieDetails, reviews } =
    useContext(MovieContext);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      if (id) {
        await setMovieDetails(Number(id));
      }
    };
    fetchMovieDetails();
  }, [id]);

  const onEdit = (id: string) => {
    const reviewToEdit =
      reviews && reviews.find((review: Review) => review.id === id);
    setSelectedReview(reviewToEdit || null);
    setShowEditReviewForm(true);
  };

  const onDelete = async (MovieId: string, id: string) => {
    await deleteReview(Number(MovieId), id);
  };

  return (
    <div className="max-w-4xl mx-auto p-5">
      {movie && (
        <>
          {showEditReviewForm && selectedReview && (
            <EditReviewForm
              onClose={() => setShowEditReviewForm(false)}
              movieId={id}
              rid={selectedReview.id}
              initialContent={selectedReview.comments}
              initialRating={selectedReview.rating.toString()}
              initialAuthor={selectedReview.reviewerName || ""}
            />
          )}

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-3xl font-bold">{movie.name}</h2>
              <span className="text-4xl text-purple-500">
                {movie.averageRating !== null
                  ? movie.averageRating.toFixed(2)
                  : "N/A"}
                /10
              </span>
            </div>

            <div className="space-y-4 mt-5">
              {reviews && reviews.length > 0 ? (
                reviews.map((review: Review) => (
                  <div
                    key={review.id}
                    className="bg-gray-100 p-4 rounded-lg shadow-sm"
                  >
                    <p className="text-lg">{review.comments}</p>
                    {review.reviewerName && (
                      <p className="text-sm text-gray-600">
                        By {review.reviewerName}
                      </p>
                    )}
                    <div className="flex justify-between items-center mt-3">
                      <span className="text-2xl text-purple-500">
                        {review.rating}/10
                      </span>
                      <div className="flex space-x-4">
                        <button
                          onClick={() => onEdit(review.id)}
                          className="text-blue-500 hover:underline"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => onDelete(id, review.id)}
                          className="text-red-500 hover:underline"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-500">No reviews yet.</p>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default MovieDetail;
