import React from "react";
import { useNavigate } from "react-router-dom";

function MovieCard({ movie }) {
const navigate = useNavigate();

return (
<div
onClick={() => navigate(`/movie/${movie.id}`)}
className="bg-gray-900 rounded-xl overflow-hidden shadow-lg hover:scale-105 transition duration-300 cursor-pointer"
>
{/* Poster */} <img
     src={movie.poster}
     alt={movie.title}
     className="w-full h-72 object-cover"
   />

  {/* Info */}
  <div className="p-4">
    <h2 className="text-lg font-semibold truncate">
      {movie.title}
    </h2>

    <div className="flex justify-between text-sm text-gray-400 mt-2">
      <span>⭐ {movie.rating}</span>
      <span>{movie.year}</span>
    </div>
  </div>
</div>


);
}

export default MovieCard;
