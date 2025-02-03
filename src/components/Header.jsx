"use client";

import { useState, useEffect } from "react";
import AccountMenu from "@/components/ui/AccountMenu";
import supabase from "@/lib/supabase-ssr-client";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
	const [account, setAccount] = useState(null);
	const [loaded, setLoaded] = useState(false);
	const [openedAccount, setOpenedAccount] = useState(false);

	useEffect(() => {
		async function getLogin() {
			const { data: { user } } = await supabase.auth.getUser();
			setAccount(user);
			setLoaded(true);
		}

		getLogin();
	}, []);

	return (
		<header className="bg-slate-900 min-h-[100px] py-4 px-5 lg:px-10 flex flex-col lg:flex-row items-center justify-between">
			<div className="flex gap-4 items-center">
				<div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
					<Link href="/" className="font-bold w-[max-content] text-white hover:underline">INÍCIO</Link>
					<Link href="/sobre" className="font-bold w-[max-content] text-white hover:underline">SOBRE</Link>
					<Link href="/faq" className="font-bold w-[max-content] text-white hover:underline">FAQ</Link>
					<Link href="/classe-do-futuro" className="font-bold w-[max-content] text-white hover:underline">CLASSE DO FUTURO</Link>
					<Link href="/termos-e-condicoes" className="font-bold w-[max-content] text-white hover:underline">TERMOS</Link>
				</div>
			</div>
			<div className="mt-5 lg:mt-0">
				{loaded ? (
					account ? (
						<div>
							<Image onClick={() => setOpenedAccount(true)} className="cursor-pointer border-2 border-gray-300 rounded-full" src={`/api/discord-profile?id=${account.user_metadata.sub}`} alt={account.user_metadata.full_name} width={50} height={50} />
							{openedAccount && <AccountMenu me={account} setOpenedAccount={setOpenedAccount} />}
						</div>
					) : (
						<a href="/api/auth/discord" className="cursor-pointer uppercase font-extrabold text-white text-lg">Entrar com o Discord</a>
					)
				) : <p className="font-extrabold text-white">...</p>}
			</div>
 		</header>
	);
}
