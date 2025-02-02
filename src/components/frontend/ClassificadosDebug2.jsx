"use client";

import { useState } from "react";
import Image from "next/image";

export default function ClassificadosDebug2({ categories, categories_games, games_classified }) {
	const [selectedCategory, setSelectedCategory] = useState(0);

	return (
		<div className="min-h-screen w-full">
			<div className="max-w-7xl w-full mx-auto">
        <div className="z-10 p-5 lg:p-10">
        	<h1 className="uppercase text-6xl text-yellow-200 font-extrabold max-w-2xl break-words">{categories[selectedCategory].title}</h1>
        	<p className="mt-2 text-xl text-white font-semibold max-w-2xl">{categories[selectedCategory].description}</p>
        	<p className="mt-10 text-white text-4xl font-bold">JOGOS CLASSIFICADOS</p>
        	<p className="text-white text-sm font-semibold">EM GERAL: {games_classified.count}, NESSA CATEGORIA: {categories_games[selectedCategory].length}</p>
        	<div className="mt-5">
            <select
              className="p-2 bg-gray-800 text-white rounded-md"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(Number(e.target.value))}
            >
              {categories.map((category, index) => (
                <option key={index} value={index}>
                  {category.title} ({categories_games[index].length})
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="p-5 lg:p-10">
          {categories_games[selectedCategory].length > 0 ? (
            <div className="relative mt-5 w-full">
              <div className="my-5 w-full items-center grid gap-20 grid-cols-1 lg:grid-cols-5">
                {categories_games[selectedCategory].map((game, index) => {
                  return (
                    <div key={index} className="mb-auto">
                      <div className="lg:-ml-2 w-full mb-auto lg:w-[245px] h-auto hover:glow-card--hover glow-card glow-card--mobile shadow-sm transition duration-200 group hover:-translate-y-2">
                        <div className="shadow-sm">
                          <Image className="lg:object-cover w-full lg:h-[245px]" src={game.icon} width={1000} height={1000} alt={game.title} quality={100} />
                        </div>
                        <div className="mt-5">
                          <h1 className="uppercase font-extrabold text-xl text-white">
                            {game.title}
                          </h1>
                          <h1 className="font text-lg text-zinc-200">
                            {game.author.name}
                          </h1>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="flex flex-col">
              <h1 className="text-lg font-bold text-red-400 mb-2">
                Nenhum jogo está atualmente concorrendo nesta categoria.
              </h1>
              <p className="text-sm text-red-200 max-w-2xl mb-4">
                A ausência de jogos nesta categoria se deve ao fato de que muitos membros, incluindo você, podem não ter votado em nenhum jogo para que ele fosse considerado concorrente. Para o próximo ano, encorajamos a participação para fortalecer a competição nesta categoria.
              </p>
            </div>
          )}
        </div>
      </div>
			<div className="top-0 left-0 z-[-10] h-screen w-full bg-[url('https://cdn.thegameawards.com/frontend/jpegs/mid-section-bg_24.jpg')] bg-center bg-cover bg-no-repeat pointer-events-none fixed">
			  <div className="absolute inset-0 bg-black opacity-70" />
			</div>
		</div>
	);
}