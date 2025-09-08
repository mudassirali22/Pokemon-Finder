import React from "react";

const PokemonsCards = ({ pokemon, theme }) => {
  return (

    <li
      className={`${
        theme === false
          ? "bg-gradient-to-b from-gray-800 to-gray-700 text-white"
          : "bg-gradient-to-tl from-purple-200 via-indigo-400 to-violet-600"
      } 
        rounded-2xl cursor-pointer hover:shadow-xl transition-all duration-300 
        transform hover:-translate-y-2 shadow-md 
        w-full max-w-xs sm:max-w-sm md:max-w-md 
        grid place-items-center p-4`}
    >
      
      <div className="w-full">
        {/* Image + Name + Types */}
        <div className="capitalize text-center w-full">
          <img
            src={pokemon.sprites.other.dream_world.front_default}
            alt={pokemon.name}
            className="w-28 h-28 sm:w-36 sm:h-36 md:w-40 md:h-40 
              my-3 drop-shadow-md mx-auto object-contain"
          />
          <h2 className="font-[900] mt-2 text-lg sm:text-xl md:text-2xl truncate">
            {pokemon.name}
          </h2>
          <p
            className="bg-blue-900 rounded-2xl px-3 sm:px-6 py-1 mt-3 text-white 
              text-xs sm:text-sm md:text-base max-w-[90%] mx-auto 
              break-words whitespace-normal"
          >
            {pokemon.types.map((curtype) => curtype.type.name).join(", ")}
          </p>
        </div>

        {/* Info Section */}
        <div className="flex flex-col gap-y-2 capitalize w-full mt-4">
          <div
            className="flex flex-col sm:flex-col sm:justify-between 
              text-xs sm:text-sm md:text-base gap-2 sm:gap-4"
          >
            <span className="whitespace-normal break-words">
              <strong>Weight:</strong> {pokemon.weight}
            </span>
            <span className="whitespace-normal break-words">
              <strong>Height:</strong> {pokemon.height}
            </span>
            <span className="whitespace-normal break-words">
              <strong>Experience:</strong> {pokemon.base_experience}
            </span>
          </div>

          <div
            className="flex flex-wrap items-start gap-1 
              text-xs sm:text-sm whitespace-normal break-words"
          >
            <strong>Abilities:</strong>
            <span className="flex flex-wrap gap-1">
              {pokemon.abilities.map((curability, i) => (
                <span
                  key={i}
                  className="bg-white/20 px-2 rounded-lg 
                    text-[10px] sm:text-xs md:text-sm 
                    break-words whitespace-normal"
                >
                  {curability.ability.name}
                </span>
              ))}
            </span>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-5 capitalize w-full">
          <div
            className="bg-blue-900 rounded-2xl px-4 py-1 text-white 
              text-center text-sm sm:text-base"
          >
            Stats
          </div>

          <div
            className="mt-3 grid grid-cols-2 sm:grid-cols-3 gap-2 
              text-xs sm:text-sm md:text-base"
          >
            {pokemon.stats.map((curstats, index) => (
              <span
                key={index}
                className="p-2 bg-white/10 rounded-lg text-center 
                  break-words whitespace-normal"
              >
                <strong className="block">{curstats.stat.name}</strong>
                <p className="whitespace-normal break-words">
                  {curstats.base_stat}
                </p>
              </span>
            ))}
          </div>
        </div>
      </div>
    </li>
  );
};

export default PokemonsCards;
