import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getMovieDetails } from "../api/movieApi";

function MovieDetails() {
const { id } = useParams();
const navigate = useNavigate();

const [movie, setMovie] = useState(null);

useEffect(() => {
const fetchDetails = async () => {
const data = await getMovieDetails(id);
setMovie(data);
};

fetchDetails();


}, [id]);

if (!movie) {
return <p className="p-6 text-gray-400">Loading...</p>;
}

return ( <div className="p-6">
{/* Back Button */}
<button
onClick={() => navigate(-1)}
className="mb-6 bg-gray-800 px-4 py-2 rounded hover:bg-gray-700"
>
← Back </button>

  <div className="grid md:grid-cols-2 gap-8">
    
    {/* Poster */}
<img
src={
movie.poster
? movie.poster
: "https://via.placeholder.com/500x750?text=No+Image"
}
alt={movie.title}
className="w-full max-w-md rounded-xl shadow-lg"
/>


    {/* Info */}
    <div>
      <h1 className="text-4xl font-bold">
        {movie.title}
      </h1>

      <div className="flex gap-4 mt-4 text-gray-400">
        <span>⭐ {movie.rating}</span>
        <span>{movie.year}</span>
      </div>

      <p className="mt-6 text-gray-300 leading-relaxed">
        {movie.overview || "No description available."}
      </p>
    </div>

  </div>
</div>

);
}

export default MovieDetails;
