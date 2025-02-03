"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import VotingStatusBar from "@/components/ui/VotingStatusBar";

export default function ResultPromotedGames({ games, gamesVotes, classifiedGamesCount, selectedCategory, gamesUserVotes = null, debugMode = false }) {
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
	  const gameWithMostVotes = gamesVotes.reduce((maxVoteGame, vote) => {
	    const currentGame = games.find(game => game.id === vote.project_id);
	    if (!currentGame) return maxVoteGame;
	    if (vote.vote_count > (maxVoteGame ? maxVoteGame.vote_count : -1)) {
	      return { game: currentGame, vote_count: vote.vote_count };
	    }
	    return maxVoteGame;
	  }, null);

	  return games.map((game) => {
	    const hasMostVotes = gameWithMostVotes && gameWithMostVotes.game.id === game.id;
	    return {
	      ...game,
	      most_votes: hasMostVotes,
	    };
	  });
	}

	const games_pretty = addMostVotesFlag(games, gamesVotes);

	return (
		<div>
			<VotingStatusBar debugMode={debugMode} endEvent={true} votedCategories={votedCategories} classifiedGamesCount={classifiedGamesCount} selectedCategory={selectedCategory} />
			<div className="max-w-7xl w-full mx-auto">
			  <div className="mt-10 p-5 lg:p-10">
			    <div>
			      <h1 className="uppercase text-6xl text-yellow-200 font-extrabold max-w-2xl break-words">{selectedCategory.current.title}</h1>
			      <p className="mt-5 text-xl text-white font-semibold max-w-2xl">{selectedCategory.current.description}</p>
			    </div>
			  </div>
			  <div className="p-5 lg:p-10">
			  	{games_pretty.length > 0 ? (
			  		<div className="relative mt-5 w-full">
              <div className="my-5 w-full items-center grid gap-20 grid-cols-1 lg:grid-cols-5">
              	{games_pretty.map((game, index) => (
              		<div key={index} className="mb-auto overflow-visible">
              			{game.most_votes && (
						          <img src="https://thegameawards.com/3d/confetti.gif" alt="Vencedor" className="select-none absolute invisible lg:visible -translate-x-[23%] -translate-y-[20%] z-[-1] w-1/3" />
						        )}
              		  <div className={`lg:-ml-2 w-full mb-auto lg:w-[245px] h-auto ${game.most_votes ? "glow-card--hover" : "hover:glow-card--hover"} glow-card glow-card--mobile shadow-sm transition duration-200 group ${game.most_votes && "-translate-y-4"}`}>
              		    <div className="shadow-sm">
              		      <Image className={`select-none lg:object-cover w-full lg:h-[245px] ${!game.most_votes && "filter grayscale"}`} src={game.icon} width={1000} height={1000} alt={game.title} quality={100} />
              		      {(game.most_votes && selectedCategory.current.title === "O Melhor Jogo") && (
              		      	<Image className="select-none absolute -translate-y-[280%] right-[18%] w-3/5 z-10" src="/trofeu-mj.png" width={1000} height={1000} quality={100} alt="Troféu de Melhor Jogo" />
              		      )}

              		      {(game.most_votes && selectedCategory.current.title !== "O Melhor Jogo") && (
              		      	<Image className="select-none absolute -translate-y-[220%] left-[10%] w-1/3 z-10" src="/medalha-derivados.png" width={1000} height={1000} quality={100} alt={`Medalha de ${selectedCategory.current.title}`} />
              		      )}
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
              		      {debugMode && (
              		      	<div className="mt-2 flex items-center gap-2 flex-wrap">
              		      		{gamesUserVotes.filter(gameUserVote => gameUserVote.project_id === game.id).map((gameUserVote, index) => (
              		      			<div key={index} className="relative overflow-visible">
												        <img
												          src={`/api/discord-profile?id=${gameUserVote.author.raw_user_meta_data.sub}`}
												          className="w-8 h-8 rounded-full peer"
												        />
												        {/* Tooltip */}
												        <span className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 opacity-0 peer-hover:opacity-100 transition-opacity duration-300 bg-gray-800 text-white text-xs rounded py-1 px-2 pointer-events-none w-[max-content]">
												          {gameUserVote.author.raw_user_meta_data.full_name} || {gameUserVote.author.raw_user_meta_data.custom_claims.global_name}
												        </span>
												      </div>
              		      		))}
              		      	</div>
              		      )}
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