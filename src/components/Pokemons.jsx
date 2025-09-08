import React, { useState, useEffect } from "react";
import PokemonsCards from "./PokemonsCards";
import { IoMoonOutline, IoSunnyOutline } from "react-icons/io5";

const Pokemons = () => {
  
  const [apiData, setapiData] = useState([]);
  const [search, setsearch] = useState("");
  const [loading, setloading] = useState(true);
  const [error, seterror] = useState("");
  const [theme, settheme] = useState(true);

  const apiFetchData = async () => {
    try {
      const res = await fetch(
        "https://pokeapi.co/api/v2/pokemon?offset=20&limit=100"
      );
      const data = await res.json();
      const results = data.results;

      const detailedData = await Promise.all(
        results.map(async (curData) => {
          const res = await fetch(curData.url);
          const details = await res.json();
          return details;
        })
      );

      setapiData(detailedData);
      setloading(false);
    } catch (error) {
      setloading(false);
      seterror(error);
    }
  };

  useEffect(() => {
    apiFetchData();
  }, []);

  // Search logic
  const searchInput = apiData.filter((curFilter) =>
    curFilter.name.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <div className="mt-80 text-center text-2xl sm:text-4xl font-extrabold">
        Loading....
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-20 text-center text-2xl sm:text-4xl font-extrabold cursor-wait">
        {error.message}
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen w-full transition-colors duration-500 ease-in-out
        ${theme ? "bg-gray-200 text-black" : "bg-gray-900 text-white"}`}
    >

      {/* Theme Toggle */}
      <div className="flex justify-end pr-4  sm:pr-10 pt-4 sm:pt-6">
        <button
          onClick={() => settheme(!theme)}
          className={`h-10 w-10 sm:h-12 sm:w-12 flex items-center justify-center 
            rounded-full transition-all duration-700 ease-in-out cursor-pointer
            ${theme ? "bg-gray-300 hover:bg-gray-100" : "bg-gray-800 hover:bg-gray-700"}`}
        >
          <span className="text-xl sm:text-2xl transition-all duration-700">
            {theme ? (
              <IoMoonOutline className="text-black" />
            ) : (
              <IoSunnyOutline className="text-white" />
            )}
          </span>
        </button>
      </div>

      {/* Heading & Search */}
      <div className="pt-8 px-4 text-center">
        <h1 className="text-3xl sm:text-5xl font-bold cursor-default">
          Let's Catch Pokémon
        </h1>
        <input
          type="text"
          placeholder="Search Pokémon"
          value={search}
          onChange={(e) => setsearch(e.target.value)}
          className="w-full sm:w-96 h-12 sm:h-14 px-4 mt-6 rounded-2xl border border-gray-300 
            shadow-sm placeholder-gray-400 transition-all
            focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300"
        />
      </div>

      {/* Pokémon Cards */}
      <div className="pt-8 sm:pt-10 ">
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 
          gap-6 max-w-7xl mx-auto place-items-center p-6"
        >
          {searchInput.map((pokemon) => (
            <PokemonsCards key={pokemon.id} pokemon={pokemon} theme={theme} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Pokemons;
