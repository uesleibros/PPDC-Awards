"use client";

import supabase from "@/lib/supabase";
import { useState, useEffect } from "react";
import Notification from "@/components/ui/Notification";

export default function VoteCategory({ game, preLastVotes, preCategoriesList, preVotedCategories, disabled, children }) {
  const [searchCategory, setSearchCategory] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedRemoveCategory, setSelectedRemoveCategory] = useState(null);
  const [blockedCategories, setBlockedCategories] = useState([]);
  const [openedChooseCategory, setOpenedChooseCategory] = useState(false);
  const [notifications, setNotifications] = useState([]);

  const addNotification = (message, type, position) => {
    const id = Math.random().toString(36).substring(2, 9);
    setNotifications((prev) => [...prev, { id, message, type, position }]);
    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    }, 4000);
  };

  useEffect(() => {
    async function fetchBlockedCategories() {
    	const req = await fetch("/api/classified-categories", {
    		method: "POST",
    		body: JSON.stringify({ project_id: game.id })
    	});
    	const body = await req.json();

    	if (req.ok)
      	setBlockedCategories(body);
    }

		supabase.channel("custom-update-channel")
		.on(
	    "postgres_changes",
	    { event: '*', schema: "public", table: "votes" },
	    (payload) => {
	      fetchBlockedCategories();
	    }
	  )
	  .subscribe()

    fetchBlockedCategories();
  }, [game]);

  const categoriasFiltradas = preCategoriesList.filter((category) =>
    category.title.toLowerCase().includes(searchCategory.toLowerCase().trim())
  );

const handleConfirm = async () => {
  const req = await fetch("/api/vote", {
    method: "POST",
    body: JSON.stringify({
      project_id: game.id,
      category_id: selectedCategory,
      phase: "PHASE_1"
    })
  });
  const body = await req.json();

  if (req.ok) {
    addNotification(
      `Obrigado por votar na categoria "${preCategoriesList.find(category => category.id === selectedCategory)?.title}", seu voto faz a diferença.`,
      "success",
      "bottom-right"
    );
    setSelectedCategory(null);
  } else {
    addNotification(body.error, "warning", "bottom-right");
  }
};

const handleConfirmDelete = async () => {
  const req = await fetch("/api/vote", {
    method: "DELETE",
    body: JSON.stringify({
      project_id: game.id,
      category_id: selectedRemoveCategory,
      phase: "PHASE_1"
    })
  });
  const body = await req.json();

  if (req.ok) {
    addNotification(
      `Voto removido da categoria "${preCategoriesList.find(category => category.id === selectedRemoveCategory)?.title}", seu voto não fez a diferença.`,
      "success",
      "bottom-right"
    );
    setSelectedRemoveCategory(null);
  } else {
    addNotification(body.error, "warning", "bottom-right");
  }
};


  const handleCancel = () => {
    setSelectedCategory(null);
  };

  const handleOpenChooseCategory = () => {
  	setOpenedChooseCategory(true);
  }

  const handleCancelDelete = () => {
  	setSelectedRemoveCategory(null);
  };

  return (
    <>
      {disabled ? (
        children
      ) : (
        <>
          <div className="mb-auto" onClick={handleOpenChooseCategory}>
            {children}
          </div>
          {openedChooseCategory && (
            <div className="fixed inset-0 z-50 top-0 left-0 w-full h-full p-10 lg:px-[22vh] overflow-y-auto overscroll-contain">
              <div>
                <div className="mb-20 flex justify-end">
                  <h2
                    onClick={() => setOpenedChooseCategory(false)}
                    className="text-xl w-[max-content] font-bold text-right text-white cursor-pointer"
                  >
                    FECHAR
                  </h2>
                </div>
                <div>
                  <h1 className="text-5xl font-extrabold text-yellow-200">
                    ESCOLHA UMA CATEGORIA
                  </h1>
                  <p className="font-semibold text-xl text-white mt-5">
                    Ao escolher, você estará indicando o <strong>{game.title}</strong> para
                    concorrer na categoria escolhida.
                  </p>
                  <p className="font-semibold text-xs text-white mt-5">
                    As categorias que estão meio apagadas se deve a alguns motivos. Primeiro, se o seu jogo não foi lançado, apenas a categoria &quot;Mais Aguardado&quot; estará disponível para voto. Caso o jogo a ser votado já lançou, a categoria &quot;Mais Aguardado&quot; ficará indisponível para voto.
                  </p> 
                  <input
                    value={searchCategory}
                    onChange={(e) => setSearchCategory(e.target.value)}
                    className="outline-none py-3 px-4 text-xs border border-yellow-200 text-white bg-slate-900 w-full rounded-sm mt-5 placeholder-white"
                    type="text"
                    placeholder="Procure por uma categoria"
                  />
                  {(selectedCategory || selectedRemoveCategory) && (
                  	<div>
	                    <div className="mt-5 flex items-center gap-4">
	                      <p onClick={selectedCategory ? handleConfirm : selectedRemoveCategory ? handleConfirmDelete : null} className="select-none p-4 bg-slate-900 transition-colors hover:bg-slate-800 uppercase cursor-pointer font-extrabold text-lg text-white">Confirmar</p>
	                      <p onClick={selectedCategory ? handleCancel : selectedRemoveCategory ? handleCancelDelete : null} className="select-none p-4 bg-gray-200 transition-colors hover:bg-gray-400 uppercase cursor-pointer font-extrabold text-lg text-black">Cancelar</p>
	                    </div>
	                    <p className="font-semibold text-xs text-white mt-5">
	                      {selectedCategory ? "Ao confirmar, você estará votando na categoria escolhida." : selectedRemoveCategory ? "Ao confirmar, você estará removendo seu voto da categoria escolhida." : ''}
	                    </p>
                    </div>
                  )}

                  <div className="mt-5 grid grid-cols-1 lg:grid-cols-5 gap-4">
										{preCategoriesList.map((category) => {
										  const isBlocked = blockedCategories.includes(String(category.id));
										  const isVoted = preVotedCategories.some(
										    (vote) => vote.category_id === category.id && vote.project_id === game.id
										  );
										  const isMostAnticipated = category.id === 2;
										  const isGameReleased = game.released;

										  const isClickable =
										    !isBlocked &&
										    ((isGameReleased && !isMostAnticipated) || (!isGameReleased && isMostAnticipated));

										  const handleClick = () => {
										    if (isBlocked) return;
										    if (isVoted) {
										      setSelectedRemoveCategory(category.id);
										    } else if (isClickable && selectedCategory === null) {
										      setSelectedCategory(category.id);
										    }
										  };

										  const containerClass = `select-none h-full lg:aspect-square flex flex-col lg:justify-center border border-[#6588ba] p-4 lg:py-14 lg:px-17 lg:text-center lg:min-h-[100px] min-w-[100px] bg-[#0a0e13b3] transition-all ${(isClickable && (selectedCategory === category.id || selectedRemoveCategory === category.id)) && "bg-[#1e2938] transform scale-105 border-none" } ${
										    isBlocked
										      ? "cursor-not-allowed opacity-50"
										      : isClickable
										      ? "cursor-pointer hover:bg-[#1e2938] hover:border-[#1e2938]"
										      : isVoted
										      ? "cursor-pointer hover:bg-[#1e2938] hover:border-[#1e2938]"
										      : selectedCategory === category.id
										      ? "bg-[#1e2938] transform scale-105"
										      : "cursor-not-allowed opacity-50"
										  }`;

										  return (
											  <div key={category.id} onClick={handleClick} className={containerClass}>
											    <h3 className="uppercase text-white font-semibold">{category.title}</h3>
											    {(isVoted || isBlocked) && (
											      <>
											        <p className="uppercase font-bold text-xs text-green-500 mt-2">
											          {isVoted ? "VOTADO" : "CLASSIFICADO"}
											        </p>
											        <p className="uppercase font-bold text-xs text-yellow-200 mt-2">
											          {preLastVotes.find(
											            (lastVote) => lastVote.category_id === category.id && lastVote.project_id === game.id
											          )?.id}
											        </p>
											      </>
											    )}
											  </div>
											);
										})}
                  </div>
                </div>
                <div className="top-0 left-0 z-[-10] h-screen w-full bg-[url('https://cdn.thegameawards.com/frontend/jpegs/mid-section-bg_24.jpg')] bg-center bg-cover bg-no-repeat pointer-events-none fixed">
                  <div className="absolute inset-0 bg-black opacity-70" />
                </div>
              </div>
            </div>
          )}
        </>
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
    </>
  );
}
