"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import supabase from "@/lib/supabase";
import Notification from "@/components/ui/Notification";

export default function VotarFase2({ games, selectedCategory }) {
  const [votedCategories, setVotedCategories] = useState([]);
  const [notifications, setNotifications] = useState([]);

  const addNotification = (message, type, position) => {
    const id = Math.random().toString(36).substring(2, 9);
    setNotifications((prev) => [...prev, { id, message, type, position }]);
    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    }, 4000);
  };

  useEffect(() => {
    async function fetchUserVotes() {
      const req = await fetch("/api/get-user-votes", {
        method: "POST",
        body: JSON.stringify({ phase: "PHASE_2" })
      });
      const body = await req.json();

      if (req.ok)
        setVotedCategories(body.votes);
    }

    supabase.channel("custom-insert-channel")
    .on(
      "postgres_changes",
      { event: '*', schema: "public", table: "votes" },
      (payload) => {
        fetchUserVotes();
      }
    )
    .subscribe()

    fetchUserVotes();
  }, []);

  const handleConfirm = async (game) => {
    const req = await fetch("/api/vote", {
      method: "POST",
      body: JSON.stringify({
        project_id: game.id,
        category_id: selectedCategory.id,
        phase: "PHASE_2"
      })
    });
    const body = await req.json();

    if (req.ok) {
      addNotification(
        `Obrigado por votar no jogo ${game.title} para a categoria "${selectedCategory.title}", seu voto faz a diferença.`,
        "success",
        "bottom-right"
      );
    } else {
      addNotification(body.error, "warning", "bottom-right");
    }
  };

  const handleConfirmDelete = async (game) => {
    const req = await fetch("/api/vote", {
      method: "DELETE",
      body: JSON.stringify({
        project_id: game.id,
        category_id: selectedCategory.id,
        phase: "PHASE_2"
      })
    });
    const body = await req.json();

    if (req.ok) {
      addNotification(
        `Voto removido do jogo ${game.title} para a categoria "${selectedCategory.title}", seu voto não fez a diferença.`,
        "success",
        "bottom-right"
      );
    } else {
      addNotification(body.error, "warning", "bottom-right");
    }
  };

  return (
    <div>
      <div className="relative mt-5 w-full">
        <div className="my-5 gap-4 w-full items-center grid gap-4 grid-cols-1 lg:grid-cols-5">
          {games.map((game, index) => {
            const isVoted = votedCategories.some(
              (vote) => vote.category_id === selectedCategory.id && vote.project_id === game.id
            );

            const handleClick = () => {
              if (isVoted)
                handleConfirmDelete(game);
              else
                handleConfirm(game);
            };

            return (
              <div key={index} onClick={handleClick} className="mb-auto">
                <div className="cursor-pointer lg:-ml-2 w-full mb-auto lg:w-[245px] h-auto hover:glow-card--hover glow-card glow-card--mobile shadow-sm transition duration-200 group hover:-translate-y-2">
                  <div className="shadow-sm">
                    <Image className="lg:object-cover w-full lg:h-[245px]" src={game.icon} width={1000} height={1000} alt={game.title} quality={100} />
                    <div
                      className={`w-full text-center p-6 ${
                        isVoted
                          ? "bg-gradient-to-r from-blue-300 via-blue-400 to-blue-500 font-bold shadow-lg transition duration-400 group-hover:brightness-125"
                          : "bg-gradient-to-r from-[#f0b689] via-[#f2a366] to-[#ed914a] font-bold shadow-lg transition duration-400 group-hover:brightness-125 text-black"
                      }`}
                    >
                      <h1 className="font-bold text-sm">
                        {isVoted
                          ? "REMOVER VOTO"
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
              </div>
            );
          })}
        </div>
      </div>
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