import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getGenres, getLanguages, getCountries, getRandomMovie } from "../api/movieApi";

function ShufflePanel({ isOpen, onClose }) {
  const navigate = useNavigate();
  const [genres, setGenres] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(false);

  // Filters state
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");

  // Fetch filter options on mount
  useEffect(() => {
    const fetchFilterOptions = async () => {
      const [genresData, languagesData, countriesData] = await Promise.all([
        getGenres(),
        getLanguages(),
        getCountries()
      ]);
      setGenres(genresData);
      setLanguages(languagesData);
      setCountries(countriesData);
    };
    fetchFilterOptions();
  }, []);

  const handleShuffle = async () => {
    setLoading(true);
    const filters = {
      genre: selectedGenre || null,
      language: selectedLanguage || null,
      country: selectedCountry || null
    };

    const randomMovie = await getRandomMovie(filters);

    if (randomMovie) {
      navigate(`/movie/${randomMovie.id}`);
      onClose();
    } else {
      alert("No movies found with those filters. Try different filters!");
    }
    setLoading(false);
  };

  const handleReset = () => {
    setSelectedGenre("");
    setSelectedLanguage("");
    setSelectedCountry("");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Overlay */}
      <div
        className="flex-1 bg-black bg-opacity-50"
        onClick={onClose}
      ></div>

      {/* Sidebar */}
      <div className="w-80 bg-gray-900 shadow-2xl flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-800 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">🎲 Shuffle</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white text-2xl font-bold"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Genre Filter */}
          <div>
            <label className="block text-sm font-semibold text-red-500 mb-3">
              🎭 GENRE
            </label>
            <select
              value={selectedGenre}
              onChange={(e) => setSelectedGenre(e.target.value)}
              className="w-full bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-700 focus:border-red-500 focus:outline-none"
            >
              <option value="">All Genres</option>
              {genres.map((genre) => (
                <option key={genre.id} value={genre.id}>
                  {genre.name}
                </option>
              ))}
            </select>
          </div>

          {/* Language Filter */}
          <div>
            <label className="block text-sm font-semibold text-red-500 mb-3">
              🌐 LANGUAGE
            </label>
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="w-full bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-700 focus:border-red-500 focus:outline-none"
            >
              <option value="">All Languages</option>
              {languages.map((lang) => (
                <option key={lang.iso_639_1} value={lang.iso_639_1}>
                  {lang.english_name} ({lang.iso_639_1})
                </option>
              ))}
            </select>
          </div>

          {/* Country Filter */}
          <div>
            <label className="block text-sm font-semibold text-red-500 mb-3">
              🌍 COUNTRY
            </label>
            <select
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              className="w-full bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-700 focus:border-red-500 focus:outline-none"
            >
              <option value="">All Countries</option>
              {countries.map((country) => (
                <option key={country.iso_3166_1} value={country.iso_3166_1}>
                  {country.english_name} ({country.iso_3166_1})
                </option>
              ))}
            </select>
          </div>

          {/* Active Filters Display */}
          {(selectedGenre || selectedLanguage || selectedCountry) && (
            <div className="bg-gray-800 rounded-lg p-4">
              <p className="text-xs text-gray-400 mb-3 font-semibold">ACTIVE FILTERS:</p>
              <div className="flex flex-wrap gap-2">
                {selectedGenre && (
                  <span className="px-3 py-1 bg-red-500 text-white text-xs rounded-full">
                    {genres.find((g) => g.id == selectedGenre)?.name}
                  </span>
                )}
                {selectedLanguage && (
                  <span className="px-3 py-1 bg-red-500 text-white text-xs rounded-full">
                    {languages.find((l) => l.iso_639_1 === selectedLanguage)?.english_name}
                  </span>
                )}
                {selectedCountry && (
                  <span className="px-3 py-1 bg-red-500 text-white text-xs rounded-full">
                    {countries.find((c) => c.iso_3166_1 === selectedCountry)?.english_name}
                  </span>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-gray-800 p-6 space-y-3">
          <button
            onClick={handleShuffle}
            disabled={loading}
            className="w-full bg-red-500 hover:bg-red-600 disabled:bg-gray-600 text-white font-bold py-3 rounded-lg transition"
          >
            {loading ? "Shuffling..." : "🎲 SHUFFLE"}
          </button>
          <button
            onClick={handleReset}
            className="w-full bg-gray-800 hover:bg-gray-700 text-gray-300 font-semibold py-2 rounded-lg transition"
          >
            Clear Filters
          </button>
        </div>
      </div>
    </div>
  );
}

export default ShufflePanel;
