"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Button from "@/components/ui/Button";
import supabase from "@/lib/supabase-ssr-client";

export default function AccountMenu({ me, setOpenedAccount }) {
	const [log, setLogs] = useState([]);

	async function signOutUser() {
		await supabase.auth.signOut();
		setOpenedAccount(false);
		window.location.reload();
	}

	useEffect(() => {
	  document.body.style.overflow = "hidden";

	  return () => {
	    document.body.style.overflow = "auto";
	  };
	}, []);

	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="w-full h-full overflow-y-scroll p-10 lg:px-[22vh]">
				<div className="mb-10 flex justify-end">
					<h2 onClick={() => setOpenedAccount(false)} className="text-xl w-[max-content] font-bold text-right text-white cursor-pointer">FECHAR</h2>
				</div>
				<div className="grid gap-10 grid-cols-1 lg:grid-cols-3">
					<div className="flex flex-col items-center mx-auto">
						<h2 className="uppercase text-4xl font-bold text-white mb-10 text-yellow-200">Meu Perfil</h2>
						<Image className="rounded-full" src={`/api/discord-profile?id=${me.user_metadata.sub}`} alt={me.user_metadata.full_name} quality={100} width={200} height={200} />
						<h2 className="uppercase text-2xl font-bold text-white mt-5">{me.user_metadata.full_name}</h2>
						<Button onClick={signOutUser} variant={true} className="mt-10 w-full" content="Desconectar" />
					</div>
					<div>
						<h2 className="uppercase text-4xl font-bold text-white mb-10 text-yellow-200">Minhas Conquistas</h2>
						<p className="text-white uppercase text-2xl font-semibold">Em Breve</p>
					</div>
				</div>
				<div onClick={() => setOpenedAccount(false)} className="cursor-pointer fixed bottom-0 left-0 py-3 mt-3 w-full bg-slate-600">
					<p className="select-none text-slate-300 text-center font-bold text-xl">VOLTAR PRO SITE</p>
				</div>
				<div className="top-0 left-0 z-[-10] h-screen w-full bg-[url('https://cdn.thegameawards.com/frontend/jpegs/profile-bg.jpg')] bg-center bg-cover bg-no-repeat pointer-events-none fixed">
				  <div className="absolute inset-0 bg-black opacity-70" />
				</div>
			</div>
		</div>
	);
}