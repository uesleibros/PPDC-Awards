"use client";

import { useState, useEffect } from "react";
import supabase from "@/lib/supabase";
import Image from "next/image";
import Link from "next/link";

const getURL = () => {
  let url =
    process?.env?.NEXT_PUBLIC_SITE_URL ??
    process?.env?.NEXT_PUBLIC_VERCEL_URL ??
    "http://localhost:3000/"
  url = url.startsWith('http') ? url : `https://${url}`
  url = url.endsWith('/') ? url : `${url}/`
  return url
}

export default function Header() {
	const [account, setAccount] = useState(null);
	const [loaded, setLoaded] = useState(false);

	async function signInWithDiscord() {
	  const { data, error } = await supabase.auth.signInWithOAuth({
	    provider: "discord",
	    options: {
		    redirectTo: `${getURL()}/api/auth/callback`,
		  },
	  })
	}

	useEffect(() => {
		async function getLogin() {
			const { data: { user } } = await supabase.auth.getUser();
			setAccount(user);
			setLoaded(true);
		}

		getLogin();
	}, []);

	return (
		<header className="bg-slate-900 min-h-[100px] p-4 flex flex-col lg:flex-row items-center justify-between">
			<div className="flex gap-4 items-center">
				<Link className="max-[700px]:hidden" href="/">
					<Image src="/logo.png" width={70} height={70} alt="PPDC AWards Logo" />
				</Link>
				<div className="flex items-center gap-4">
					<Link href="/sobre" className="font-bold w-[max-content] text-white hover:underline">SOBRE</Link>
					<Link href="/faq" className="font-bold w-[max-content] text-white hover:underline">FAQ</Link>
					<Link href="/classe-do-futuro" className="font-bold w-[max-content] text-white hover:underline">CLASSE DO FUTURO</Link>
					<Link href="/termos-e-condicoes" className="font-bold w-[max-content] text-white hover:underline">TERMOS</Link>
				</div>
			</div>
			<div className="mt-5 lg:mt-0">
				{loaded ? (
					account ? (
						<Image className="rounded-full" src={account.user_metadata.avatar_url} alt={account.user_metadata.full_name} width={50} height={50} />
					) : (
						<p className="cursor-pointer uppercase font-extrabold text-white text-lg" onClick={signInWithDiscord}>Entrar com o Discord</p>
					)
				) : <p className="font-extrabold text-white">...</p>}
			</div>
 		</header>
	);
}