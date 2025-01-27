"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Button from "@/components/ui/Button";
import supabase from "@/lib/supabase-ssr-client";
/*import { getUserVotesByPhase } from "@/domain/usecases/get-user-votes-by-phase-usecase";
import { getCrateProjectsByIDs } from "@/domain/usecases/get-crate-projects-by-ids-usecase";*/

export default function AccountMenu({ me, setOpenedAccount }) {
	const [log, setLogs] = useState([]);

	async function signOutUser() {
		await supabase.auth.signOut();
		setOpenedAccount(false);
		window.location.reload();
	}

	return (
		<div className="fixed inset-0 z-50 top-0 left-0 w-full h-full p-10 lg:px-[22vh] overflow-y-auto">
			<div>
				<div className="mb-10 flex justify-end">
					<h2 onClick={() => setOpenedAccount(false)} className="text-xl w-[max-content] font-bold text-right text-white cursor-pointer">FECHAR</h2>
				</div>
				<div className="grid grid-cols-1 lg:grid-cols-3">
					<div className="flex flex-col items-center mx-auto">
						<h2 className="uppercase text-4xl font-bold text-white mb-10 text-yellow-200">Meu Perfil</h2>
						<Image className="rounded-full" src={me.user_metadata.avatar_url} alt={me.user_metadata.full_name} width={200} height={200} />
						<h2 className="uppercase text-3xl font-bold text-white mt-5">{me.user_metadata.full_name}</h2>
						<Button onClick={signOutUser} variant={true} className="mt-3 w-full" content="Desconectar" />
					</div>
				</div>
				<div className="top-0 left-0 z-[-10] h-screen w-full bg-[url('https://cdn.thegameawards.com/frontend/jpegs/profile-bg.jpg')] bg-center bg-cover bg-no-repeat pointer-events-none fixed">
				  <div className="absolute inset-0 bg-black opacity-70" />
				</div>
			</div>
		</div>
	);
}