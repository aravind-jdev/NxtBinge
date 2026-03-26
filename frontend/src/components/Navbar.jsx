import React, { useState } from "react";
import ShufflePanel from "./ShufflePanel";

function Navbar({ setQuery }) {
  const [showShuffle, setShowShuffle] = useState(false);

  return (
    <>
      <nav className="w-full bg-black text-white px-6 py-4 flex items-center justify-between shadow-md">
        {/* Logo */}
        <h1 className="text-2xl font-bold text-red-500 cursor-pointer">
          NxtBinge
        </h1>

        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search movies..."
          onChange={(e) => setQuery(e.target.value)}
          className="bg-gray-800 text-white px-4 py-2 rounded-lg outline-none focus:ring-2 focus:ring-red-500 w-1/3"
        />

        {/* Shuffle Button */}
        <button
          onClick={() => setShowShuffle(true)}
          className="bg-red-500 hover:bg-red-600 px-6 py-2 rounded-lg font-bold transition flex items-center gap-2"
        >
          🎲 Shuffle
        </button>
      </nav>

      {/* Shuffle Panel Sidebar */}
      <ShufflePanel isOpen={showShuffle} onClose={() => setShowShuffle(false)} />
    </>
  );
}

export default Navbar;
