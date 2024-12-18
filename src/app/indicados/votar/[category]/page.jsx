import { headers } from "next/headers";
import { notFound } from "next/navigation";
import PromoteGamesPhase2 from "@/components/frontend/PromoteGamesPhase2";
import WaitingRoom from "@/components/WaitingRoom";

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

export default async function IndicarJogo({ params }) {
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
  		<WaitingRoom status={status.last_stage_status} phase="Fase 2" />
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

  const reqgamesid = await fetch(`${protocol}://${host}/api/get-games-by-votes-category`, {
  	method: "POST",
  	body: JSON.stringify({ category_id: currentCategory.current.id, phase: "PHASE_1" })
  });

  const gameIDs = await reqgamesid.json();

  const reqclassifiedgamescount = await fetch(`${protocol}://${host}/api/get-games-by-votes-category/count-all`);
  const classifiedGamesCount = await reqclassifiedgamescount.json();

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
				<PromoteGamesPhase2 games={games} classifiedGamesCount={classifiedGamesCount} selectedCategory={currentCategory} />
				<div className="top-0 left-0 z-[-10] h-screen w-full bg-[url('https://cdn.thegameawards.com/frontend/jpegs/mid-section-bg_24.jpg')] bg-center bg-cover bg-no-repeat pointer-events-none fixed">
	        <div className="absolute inset-0 bg-black opacity-70" />
	      </div>
      </div>
		</div>
	);
}
