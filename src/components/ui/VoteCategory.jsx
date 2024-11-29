"use client";

import supabase from "@/lib/supabase-ssr-client";
import { useState, useEffect } from "react";

export default function VoteCategory({ game, preCategoriesList, preVotedCategories, disabled, children }) {
  const [categoriesList, setCategoriesList] = useState(preCategoriesList || []);
  const [searchCategory, setSearchCategory] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [blockedCategories, setBlockedCategories] = useState([]);
  const [votedCategories, setVotedCategories] = useState(preVotedCategories || []);
  const [openedChooseCategory, setOpenedChooseCategory] = useState(false);
  const [isAuth, setIsAuth] = useState(false);

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

    async function getIsAuth() {
    	const { data: { user } } = await supabase.auth.getUser();
    	if (user)
    		setIsAuth(true);
    }

    getIsAuth();
    fetchBlockedCategories();
  }, []);

  const categoriasFiltradas = categoriesList.filter((category) =>
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

    if (req.ok) {
    	setVotedCategories((prevVotedCategories) => [
	      ...prevVotedCategories,
				{ category_id: selectedCategory, project_id: game.id }
	    ]);
	    setSelectedCategory(null);
    } else {
    	alert("Houve um erro ao votar, tente novamente.");
    }
  };

  const handleCancel = () => {
    setSelectedCategory(null);
  };

  const handleOpenChooseCategory = () => {
  	if (!isAuth) {
  		alert("Você precisa logar com sua conta do Discord antes de votar.");
  	} else {
  		setOpenedChooseCategory(true);
  	}
  }

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
                  <input
                    value={searchCategory}
                    onChange={(e) => setSearchCategory(e.target.value)}
                    className="outline-none py-3 px-4 text-xs border border-yellow-200 text-white bg-slate-900 w-full rounded-sm mt-5 placeholder-white"
                    type="text"
                    placeholder="Procure por uma categoria"
                  />
                  {selectedCategory && (
                    <div className="mt-5 flex items-center gap-4">
                      <p onClick={handleConfirm} className="p-4 bg-slate-900 transition-colors hover:bg-slate-800 uppercase cursor-pointer font-extrabold text-lg text-white">Confirmar</p>
                      <p onClick={handleCancel} className="p-4 bg-gray-200 transition-colors hover:bg-gray-400 uppercase cursor-pointer font-extrabold text-lg text-black">Cancelar</p>
                    </div>
                  )}

                  <div className="mt-5 grid grid-cols-1 lg:grid-cols-5 gap-4">
										{categoriesList.map((category) => {
										  const isBlocked = blockedCategories.includes(category.id);
										  const isVoted = votedCategories.some(
  (vote) => vote.category_id === category.id && vote.project_id === game.id
);
										  const isClickable =
  (!game.released && category.id === 2) || 
  (!isBlocked && !isVoted && game.released && category.id !== 2);


										  return (
										    <div
										      onClick={() =>
										        isClickable && selectedCategory === null
										          ? setSelectedCategory(category.id)
										          : null
										      }
										      key={category.id}
										      className={`h-full lg:aspect-square flex flex-col lg:justify-center border border-[#6588ba] p-4 lg:py-14 lg:px-17 lg:text-center lg:min-h-[100px] min-w-[100px] bg-[#0a0e13b3] transition-all ${
										        !isClickable
										          ? "cursor-not-allowed opacity-50"
										          : selectedCategory === category.id
										          ? "bg-[#1e2938] transform scale-105"
										          : "cursor-pointer hover:bg-[#1e2938] hover:border-[#1e2938]"
										      }`}
										    >
										      <h3 className="uppercase text-white font-semibold">{category.title}</h3>
										      {(isVoted || isBlocked) && (
										        <p className="uppercase font-bold text-sm text-yellow-200 mt-2">
										          {isVoted ? "VOTO REALIZADO" : "CLASSIFICADA"}
										        </p>
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
    </>
  );
}
