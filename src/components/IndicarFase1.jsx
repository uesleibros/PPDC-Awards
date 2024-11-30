"use client";

import { useEffect, useState } from "react";
import supabase from "@/lib/supabase";
import VoteCategory from "@/components/ui/VoteCategory";
import Image from "next/image";
import Button from "@/components/ui/Button";
import Notification from "@/components/ui/Notification";

export default function IndicarFase1() {
  const [openendInvalidGame, setOpenedInvalidGame] = useState(false);
  const [selectedGame, setSelectedGame] = useState(null);
  const [searchGame, setSearchGame] = useState("");
  const [loading, setLoading] = useState(false);
  const [games, setGames] = useState([]);
  const [votedCategories, setVotedCategories] = useState([]);
  const [categoriesList, setCategoriesList] = useState([]);
  const [lastVotes, setLastVotes] = useState([]);
  const [notifications, setNotifications] = useState([]);

  const addNotification = (message, type, position) => {
    const id = Math.random().toString(36).substring(2, 9);
    setNotifications((prev) => [...prev, { id, message, type, position }]);
    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    }, 4000);
  };

  async function fetchSearchGame() {
    if (searchGame.trim().length < 3) {
      addNotification("Para a busca ser mais precisa, tem que ter no mínimo 3 caracteres.", "warning", "bottom-right");
      return;
    }

    setLoading(true);
    const req = await fetch("/api/crate/search", {
      method: "POST",
      body: JSON.stringify({ searchGame: searchGame.trim() }),
    });

    const body = await req.json();

    if (req.ok) {
      if (body.length === 0)
        addNotification(`A busca do jogo ${searchGame.trim()} não deu resultados.`, "default", "bottom-right");
      setGames(body);
    }

    setLoading(false);
  }

  useEffect(() => {
    async function fetchCategories() {
      const req = await fetch("/api/categories");
      const body = await req.json();

      if (req.ok) {
        setCategoriesList(body.categories);
      }
    }

    async function fetchUserVotes() {
      const req = await fetch("/api/get-user-votes", {
        method: "POST",
        body: JSON.stringify({ phase: "PHASE_1" })
      });
      const body = await req.json();

      if (req.ok)
        setVotedCategories(body.votes);
    }

    async function fetchLastUserVotes() {
      const req = await fetch("/api/categories/last-user-votes", {
        method: "POST",
        body: JSON.stringify({ phase: "PHASE_1" })
      });
      const body = await req.json();

      if (req.ok)
        setLastVotes(body.lastVotes);
    }

    supabase.channel("custom-insert-channel")
    .on(
      "postgres_changes",
      { event: '*', schema: "public", table: "votes" },
      (payload) => {
        fetchUserVotes();
        fetchLastUserVotes();
      }
    )
    .subscribe()

    fetchCategories();
    fetchLastUserVotes();
    fetchUserVotes();
  }, []);

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
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              fetchSearchGame();
            }
          }}
          className="outline-none py-3 px-4 text-sm border border-yellow-200 text-white bg-slate-900 w-full rounded-l-sm placeholder-white"
          type="text"
          placeholder="Procure por um jogo para votar"
        />
        <Button onClick={fetchSearchGame} variant={true} content="BUSCAR" />
      </div>
      <div className="relative mt-5 w-full">
        {!loading ? (
          <div className="my-5 gap-4 w-full items-center grid gap-4 grid-cols-1 lg:grid-cols-5">
            {games.map((game, index) => (
              <VoteCategory key={index} game={game} preLastVotes={lastVotes} preCategoriesList={categoriesList} preVotedCategories={votedCategories} disabled={isGameDisabled(game.publishedDate)}>
                <div onClick={() => {
                  setSelectedGame(game);
                    if (isGameDisabled(game.publishedDate)) {
                      setOpenedInvalidGame(true);
                    }
                  }}
                  className="cursor-pointer lg:-ml-2 w-full mb-auto lg:w-[245px] h-auto hover:glow-card--hover glow-card glow-card--mobile shadow-sm transition duration-200 group hover:-translate-y-2">
                  <div className="shadow-sm">
                    <Image className="lg:object-cover w-full lg:h-[245px]" src={game.icon} width={1000} height={1000} alt={game.title} quality={100} />
                    <div
                      className={`w-full text-center p-6 ${
                        isGameDisabled(game.publishedDate)
                          ? "bg-gradient-to-r from-gray-300 via-gray-400 to-gray-500 text-gray-800 font-bold shadow-lg transition duration-400 group-hover:brightness-125"
                          : "bg-gradient-to-r from-[#f0b689] via-[#f2a366] to-[#ed914a] font-bold shadow-lg transition duration-400 group-hover:brightness-125 text-black"
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
              </VoteCategory>
            ))}
          </div>
        ) : (
          <p className="text-white font-xl select-none">Carregando...</p>
        )}
      </div>
      {openendInvalidGame && selectedGame && (
        <div className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-md p-5 lg:p-0">
          <div className="bg-slate-900 border border-yellow-200 shadow-lg max-w-[700px] w-full p-8">
            <h1 className="text-yellow-200 font-extrabold text-3xl mb-6">JOGO INCAPACITADO</h1>
            <p className="text-white text-lg mb-6">
              <strong>{selectedGame.title}</strong> não está elegível para votação, pois foi lançado há mais de 3 anos.
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setOpenedInvalidGame(false)}
                className="px-6 py-3 text-sm font-bold text-black bg-yellow-200 rounded-md hover:bg-yellow-300 transition"
              >
                FECHAR
              </button>
            </div>
          </div>
        </div>
      )}
      {notifications.map((notif) => (
        <Notification
          key={notif.id}
          message={notif.message}
          type={notif.type}
          position={notif.position}
          onClose={() =>
            setNotifications((prev) => prev.filter((n) => n.id !== notif.id))
          }
        />
      ))}
    </div>
  );
}
