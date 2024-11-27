"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Button from "@/components/ui/Button";
import supabase from "@/lib/supabase";

export default function IndicarFase1() {
  const [searchGame, setSearchGame] = useState("");
  const [loading, setLoading] = useState(false);
  const [games, setGames] = useState([]);

  async function fetchSearchGame() {
    setLoading(true);
    const req = await fetch("/api/crate/search", {
      method: "POST",
      body: JSON.stringify({ searchGame }),
    });

    const body = await req.json();

    if (req.ok) {
      setGames(body);
    }

    setLoading(false);
  }

  const isGameDisabled = (releaseDate) => {
    const releaseYear = new Date(releaseDate).getFullYear();
    const currentYear = new Date().getFullYear();
    return currentYear - releaseYear > 3;
  };

  return (
    <div>
      <div className="flex">
        <input
          value={searchGame}
          onChange={(e) => setSearchGame(e.target.value)}
          className="outline-none py-3 px-4 text-xs border border-yellow-200 text-white bg-slate-900 w-full rounded-l-sm placeholder-white"
          type="text"
          placeholder="Procure por um jogo para votar"
        />
        <Button onClick={fetchSearchGame} variant={true} content="BUSCAR" />
      </div>
      <div className="relative mt-5 w-full">
        {!loading ? (
          <div className="my-5 gap-4 w-full items-center flex items-center flex-wrap gap-2">
            {games.map((game, index) => (
              <div
                key={index}
                className="cursor-pointer w-full mb-auto lg:w-[227px] h-auto shadow-sm transition duration-200 hover:-translate-y-4"
              >
                <div className="shadow-sm">
                  <Image
                    className="w-full object-fill lg:h-[280px]"
                    src={game.icon}
                    width={1000}
                    height={1000}
                    alt={game.title}
                    quality={100}
                  />
                  <div
                    className={`w-full text-center p-8 ${
                      isGameDisabled(game.publishedDate)
                        ? "bg-gray-500"
                        : "bg-[#f2a366]"
                    }`}
                  >
                    <h1 className="font-bold text-sm">
                      {isGameDisabled(game.publishedDate)
                        ? "JOGO INCAPACITADO"
                        : "VOTAR"}
                    </h1>
                  </div>
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
            ))}
          </div>
        ) : (
          <p className="text-white font-xl select-none">Carregando...</p>
        )}
      </div>
    </div>
  );
}
