import React from "react";
import Link from "next/link";

interface MovieCardProps {
  id: number;
  name: string;
  releaseDate: string;
  averageRating: number;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

const MovieCard: React.FC<MovieCardProps> = ({
  id,
  name,
  releaseDate,
  averageRating,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="border p-4 rounded shadow cursor-pointer ">
      <Link href={`/movies/${id}`} passHref>
        <h3 className="text-lg font-bold">{name}</h3>
        <p className="text-gray-600">Release Date: {releaseDate}</p>
        <p className="text-purple-600">Average Rating: {averageRating}/10</p>
      </Link>
      <div className="flex space-x-2 mt-4">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onEdit(id);
          }}
          className="text-blue-500 hover:underline"
        >
          Edit
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(id);
          }}
          className="text-red-500 hover:underline"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default MovieCard;
