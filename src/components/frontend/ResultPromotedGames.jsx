"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import VotingStatusBar from "@/components/ui/VotingStatusBar";

export default function ResultPromotedGames({ games, gamesVotes, classifiedGamesCount, selectedCategory }) {
	const [votedCategories, setVotedCategories] = useState([]);

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

	  fetchUserVotes();
	}, []);

	function addMostVotesFlag(games, gamesVotes) {
	  return games.map((game) => {
	    const hasMostVotes = gamesVotes.some(
	      (vote) => vote.project_id === game.id && vote.vote_count > 0
	    );

	    return {
	      ...game,
	      most_votes: hasMostVotes,
	    };
	  });
	}
	const games_pretty = addMostVotesFlag(games, gamesVotes);

	return (
		<div>
			<VotingStatusBar endEvent={true} votedCategories={votedCategories} classifiedGamesCount={classifiedGamesCount} selectedCategory={selectedCategory} />
			<div className="max-w-7xl w-full mx-auto">
			  <div className="mt-10 p-5 lg:p-10">
			    <div>
			      <h1 className="uppercase text-6xl text-yellow-200 font-extrabold max-w-2xl">{selectedCategory.current.title}</h1>
			      <p className="mt-5 text-xl text-white font-semibold max-w-2xl">{selectedCategory.current.description}</p>
			    </div>
			  </div>
			  <div className="p-5 lg:p-10">
			  	{games_pretty.length > 0 ? (
			  		<div className="relative mt-5 w-full">
              <div className="my-5 gap-4 w-full items-center grid gap-4 grid-cols-1 lg:grid-cols-5">
              	{games_pretty.map((game, index) => (
              		<div key={index} className="mb-auto">
              			{game.most_votes && (
              				<figure className="absolute left-5/4 -translate-x-5/4 -top-20 w-3/2">
              					<img src="https://thegameawards.com/3d/confetti.gif" alt="Vencedor"className="mx-auto w-full" />
              				</figure>
              			)}
              		  <div className={`lg:-ml-2 w-full mb-auto lg:w-[245px] h-auto ${game.most_votes ? "glow-card--hover" : "hover:glow-card--hover"} glow-card glow-card--mobile shadow-sm transition duration-200 group ${game.most_votes && "-translate-y-4"}`}>
              		    <div className="shadow-sm">
              		      <Image className={`lg:object-cover w-full lg:h-[245px] ${!game.most_votes && "filter grayscale"}`} src={game.icon} width={1000} height={1000} alt={game.title} quality={100} />
              		      <div
              		        className={`w-full text-center p-6 ${
                            game.most_votes
                              ? "bg-gradient-to-r from-blue-300 via-blue-400 to-blue-500 font-bold shadow-lg transition duration-400 group-hover:brightness-125"
                              : "bg-gradient-to-r from-gray-300 via-gray-400 to-gray-500 text-gray-800 font-bold shadow-lg transition duration-400 group-hover:brightness-125"
                          }`}
              		      >
              		        <h1 className="font-bold text-sm">
              		        	{game.most_votes ? "VENCEDOR" : "MAIS SORTE NA PRÓXIMA"}
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
              	))}
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
		</div>
	);
}