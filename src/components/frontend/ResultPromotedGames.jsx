"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import VotingStatusBar from "@/components/ui/VotingStatusBar";
import Notification from "@/components/ui/Notification";

export default function ResultPromotedGames({ games, gamesVotes, classifiedGamesCount, selectedCategory, preGamesUserVotes = null, debugMode = false }) {
	const [votedCategories, setVotedCategories] = useState([]);
	const [openedVote, setOpenedVote] = useState(false);
	const [selectedState, setSelectedState] = useState({ game: null, user: null });
	const [notifications, setNotifications] = useState([]);
	const [gamesUserVotes, setGamesUserVotes] = useState(preGamesUserVotes);

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

	async function handleBruteForceRemoveVote() {
		const req = await fetch("/api/brute-force/remove-phase2-vote", {
			method: "POST",
			body: JSON.stringify({
				project_id: selectedState.user.project_id,
				phase: selectedState.user.phase,
				category_id: selectedState.user.category_id,
				author_id: selectedState.user.author_id
			})
		});

		if (req.ok) {
			addNotification(
			  `Voto removido de ${selectedState.user.author.raw_user_meta_data.full_name}${selectedState.user.author.raw_user_meta_data.custom_claims.global_name && ` (${selectedState.user.author.raw_user_meta_data.custom_claims.global_name})`} no jogo ${selectedState.game.title}.`,
			  "success",
			  "bottom-right"
			);
			setGamesUserVotes((prevVotes) =>
	      prevVotes.filter((vote) => vote.id !== selectedState.user.id)
	    );
			setSelectedState({ game: null, user: null });
			setOpenedVote(false);
		} else {
			addNotification(body.error, "warning", "bottom-right");
		}
	}

	const games_pretty = addMostVotesFlag(games, gamesVotes);

	return (
		<div className="overflow-x-hidden">
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
              		<div key={index} className="mb-auto">
              			{game.most_votes && (
						          <img src="https://thegameawards.com/3d/confetti.gif" alt="Vencedor" className="select-none absolute invisible lg:visible -translate-x-[23%] -translate-y-[20%] z-[-1] w-1/3" />
						        )}
              		  <div className={`lg:-ml-2 w-full mb-auto lg:w-[245px] h-auto ${game.most_votes ? "glow-card--hover" : "hover:glow-card--hover"} glow-card glow-card--mobile shadow-sm transition duration-200 group ${game.most_votes && "-translate-y-4"}`}>
              		    <div className="shadow-sm">
              		      <Image className={`select-none lg:object-cover w-full lg:h-[245px] ${!game.most_votes && "filter grayscale"}`} src={game.icon} width={1000} height={1000} alt={game.title} quality={100} />
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
												          className="cursor-pointer w-8 h-8 rounded-full peer"
												          onClick={() => {
												          	setOpenedVote(true);
												          	setSelectedState({
												          		game,
												          		user: gameUserVote
												          	})
												          }}
												        />
												        <span className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 opacity-0 peer-hover:opacity-100 transition-opacity duration-300 bg-gray-800 text-white text-xs rounded py-1 px-2 pointer-events-none w-[max-content]">
												          {gameUserVote.author.raw_user_meta_data.full_name}{gameUserVote.author.raw_user_meta_data.custom_claims.global_name && ` || ${gameUserVote.author.raw_user_meta_data.custom_claims.global_name}`}
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
			{openedVote && selectedState && (
			  <div className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-md p-5 lg:p-0">
			    <div className="bg-slate-900 border border-yellow-200 shadow-lg max-w-[700px] w-full p-8">
			      <h1 className="text-yellow-200 font-extrabold text-3xl mb-6">REMOVE VOTO DE {selectedState.user.author.raw_user_meta_data.full_name}{selectedState.user.author.raw_user_meta_data.custom_claims.global_name && ` (${selectedState.user.author.raw_user_meta_data.custom_claims.global_name})`}</h1>
			      <p className="text-white text-lg mb-6">
			        <strong>Após remover o voto dele do jogo <strong>{selectedState.game.title}</strong>, essa ação não poderá ser desfeita. Com muito cuidado, prossiga e escolha sua decisão.</strong>
			      </p>
			      <div className="flex justify-end gap-4">
			      	<button
			      	  onClick={handleBruteForceRemoveVote}
			      	  className="px-6 py-3 text-sm font-bold text-black bg-red-400 rounded-md hover:bg-red-500 transition"
			      	>
			      	  REMOVER
			      	</button>
			        <button
			          onClick={() => setOpenedVote(false)}
			          className="px-6 py-3 text-sm font-bold text-black bg-yellow-200 rounded-md hover:bg-yellow-300 transition"
			        >
			          DEIXA PRA LÁ
			        </button>
			      </div>
			    </div>
			  </div>
			)}
			{debugMode && (
				notifications.map((notif) => (
				  <Notification
				    key={notif.id}
				    message={notif.message}
				    type={notif.type}
				    position={notif.position}
				    onClose={() =>
				      setNotifications((prev) => prev.filter((n) => n.id !== notif.id))
				    }
				  />
				))
			)}
		</div>
	);
}