import React from "react";
import Link from "next/link";

interface NavbarProps {
  onAddMovieClick: () => void;
  onAddReviewClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({
  onAddMovieClick,
  onAddReviewClick,
}) => {
  return (
    <nav className="flex justify-between items-center p-4 bg-gray-100 shadow">
      <Link href="/" passHref>
        <h1 className="text-xl font-bold cursor-pointer">MOVIECRITIC</h1>
      </Link>
      <div>
        <button
          onClick={onAddMovieClick}
          className="bg-purple-600 text-white px-4 py-2 rounded mr-2"
          aria-label="Add new movie"
        >
          Add New Movie
        </button>
        <button
          onClick={onAddReviewClick}
          className="border border-purple-600 text-purple-600 px-4 py-2 rounded"
          aria-label="Add new review"
        >
          Add New Review
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
