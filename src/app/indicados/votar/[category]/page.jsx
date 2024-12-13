import { headers } from "next/headers";
import { notFound } from "next/navigation";
import Categories from "@/components/ui/Categories";
import VotarFase2 from "@/components/VotarFase2";
import WaitingRoom from "@/components/WaitingRoom";
import Link from "next/link";

export async function generateMetadata({ params }) {
  const { category } = await params;

  const headersList = await headers();
  const protocol = headersList.get("x-forwarded-proto");
  const host = headersList.get("host");

  const req = await fetch(`${protocol}://${host}/api/categories/catch`, {
    method: "POST",
    body: JSON.stringify({ title: category }),
  });

  const body = await req.json();
  let currentCategory = {};

  if (req.ok) {
    currentCategory = body;
  } else {
    notFound();
  }

  if (Object.keys(currentCategory.current || {}).length === 0) {
    notFound();
  }

  return {
    title: currentCategory.current ? `${currentCategory.current.title} | PPDC Awards` : "PPDC Awards",
  };
}

export default async function IndicadosCategoria({ params }) {
	const { category } = await params;

	const headersList = await headers();
  const protocol = headersList.get("x-forwarded-proto");
  const host = headersList.get("host");

  const reqstatus = await fetch(`${protocol}://${host}/api/programing/check-available`);
  const bodystatus = await reqstatus.json();
  let status = [];

  if (reqstatus.ok) {
    status = bodystatus;
  }

  if (status.last_stage_status !== "rolando") {
  	return (
  		<WaitingRoom phase="Fase 2" />
  	);
  }

  const req = await fetch(`${protocol}://${host}/api/categories/catch`, {
  	method: "POST",
  	body: JSON.stringify({ title: category })
  });

  const body = await req.json();
  let currentCategory = {};

  if (req.ok) {
    currentCategory = body;
  } else {
  	notFound();
  }

  if (Object.keys(currentCategory.current || {}).length === 0)
  	notFound();

  const reqgamesid = await fetch(`${protocol}://${host}/api/get-games-by-category`, {
  	method: "POST",
  	body: JSON.stringify({ category_id: currentCategory.current.id })
  });

  const gameIDs = await reqgamesid.json();

  const reqgames = await fetch(`${protocol}://${host}/api/crate/search/ids`, {
    method: "POST",
    body: JSON.stringify({ gameIDs }),
  });

  const bodygames = await reqgames.json();
  let games = [];

  if (reqgames.ok)
    games = bodygames;

	return (
		<div className="min-h-screen w-full">
			<div className="relative">
				<div className="bg-slate-700 flex flex-col items-center justify-center w-full p-5 shrink-nav">
					<div className="container flex flex-col gap-10 lg:gap-0 lg:flex-row items-center justify-between">
						<div>
							<Link className="uppercase flex items-center gap-2 font-bold text-white text-lg transition-colors hover:text-slate-300 hover:underline" href="/indicados">
								<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" className="transition group-hover:-translate-x-5"><path d="M15.8332 9.99996H4.1665M4.1665 9.99996L9.99984 15.8333M4.1665 9.99996L9.99984 4.16663" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg>
								Sair da votação
							</Link>
						</div>
						<div className="flex flex-col lg:flex-row gap-10 items-center">
							{currentCategory.prev ? ( 
								<Link className="uppercase hover:underline transition-colors hover:text-slate-300 flex items-center gap-2 font-bold text-white text-lg" href={`/indicados/votar/${currentCategory.prev.title.toLowerCase().replaceAll(' ', '-')}`}>
									<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" className="transition group-hover:-translate-x-5"><path d="M15.8332 9.99996H4.1665M4.1665 9.99996L9.99984 15.8333M4.1665 9.99996L9.99984 4.16663" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg>
									Anterior
								</Link>
							) : (
								<p className="select-none flex items-center gap-2 uppercase font-bold text-white opacity-30 text-lg">
									<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" className="transition group-hover:-translate-x-5"><path d="M15.8332 9.99996H4.1665M4.1665 9.99996L9.99984 15.8333M4.1665 9.99996L9.99984 4.16663" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg>
									Anterior
								</p>
							)}
							<Categories minimalist={true} />
							{currentCategory.next ? ( 
								<Link className="uppercase hover:underline transition-colors hover:text-slate-300 flex items-center gap-2 font-bold text-white text-lg" href={`/indicados/votar/${currentCategory.next.title.toLowerCase().replaceAll(' ', '-')}`}>
									Próximo
									<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" className="transition group-hover:-translate-x-5"><path d="M3.3335 10H16.6668M16.6668 10L11.6668 5M16.6668 10L11.6668 15" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg>
								</Link>
							) : (
								<p className="select-none flex items-center gap-2 uppercase font-bold text-white opacity-30 text-lg">
									Próximo
									<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" className="transition group-hover:-translate-x-5"><path d="M3.3335 10H16.6668M16.6668 10L11.6668 5M16.6668 10L11.6668 15" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg>
								</p>
							)}
						</div>
						<div className="flex items-center gap-4">
							<h3 className="font-bold text-white text-sm">VOTOS LANÇADOS</h3>
							<h1 className="font-extrabold text-[#a3b8d6] text-4xl">0/??</h1>
						</div>
					</div>
				</div>
				<div className="max-w-7xl w-full mx-auto">
					<div className="mt-10 p-5 lg:p-10">
						<div>
							<h1 className="uppercase text-6xl text-yellow-200 font-extrabold max-w-[700px]">{currentCategory.current.title}</h1>
							<p className="mt-5 text-2xl text-white font-semibold max-w-[700px]">{currentCategory.current.description}</p>
						</div>
					</div>
					<div className="p-5 lg:p-10">
						{games.length > 0 ? (
							<VotarFase2 games={games} selectedCategory={currentCategory.current} />
						) : (
							<p className="font-bold text-red-500 text-lg">Infelizmente não há jogos concorrendo nessa categoria.</p>
						)}
					</div>
				</div>
				<div className="top-0 left-0 z-[-10] h-screen w-full bg-[url('https://cdn.thegameawards.com/frontend/jpegs/mid-section-bg_24.jpg')] bg-center bg-cover bg-no-repeat pointer-events-none fixed">
	        <div className="absolute inset-0 bg-black opacity-70" />
	      </div>
      </div>
		</div>
	);
}
