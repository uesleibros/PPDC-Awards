import { headers, cookies } from "next/headers";
import { notFound } from "next/navigation";
import PromoteGamesPhase2 from "@/components/frontend/PromoteGamesPhase2";
import ResultPromotedGames from "@/components/frontend/ResultPromotedGames";

export const metadata = {
  title: "PPDC Awards - Classificados.com2"
};

export default async function ClassificadosFase2Debug({ params }) {
	const { category } = await params;

	const headersList = await headers();
  const protocol = headersList.get("x-forwarded-proto");
  const host = headersList.get("host");
	const authorizedList = ["764259870563631114", "808627555027910676", "616386370063302686", "480338857724739594", "532970259422904340"];
	const cookiesList = await cookies();
	const cookieHeader = cookiesList.toString();
	const response = await fetch(`${protocol}://${host}/api/auth`, {
		credentials: "include",
		headers: {
	    Cookie: cookieHeader
	  },
	});

  if (!response.ok) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500 text-xl">
        Você não é digno.
      </div>
    );
  }

  const { user } = await response.json();

	if (!authorizedList.includes(user?.user_metadata?.sub)) {
		return (
			<div className="min-h-screen flex items-center justify-center text-red-500 text-xl">
        Você não é digno.
      </div>
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

  const reqgamesvotes = await fetch(`${protocol}://${host}/api/classified-game-categories/get-votes`, {
    method: "POST",
    body: JSON.stringify({ gameIDs, category_id: currentCategory.current.id }),
  });

  const bodygamesvotes = await reqgamesvotes.json();
  let gamesVotes = [];

  if (reqgamesvotes.ok)
    gamesVotes = bodygamesvotes;

	return (
		<div className="min-h-screen w-full">
			<div className="relative">
				<ResultPromotedGames debugMode={true} games={games} gamesVotes={gamesVotes} classifiedGamesCount={classifiedGamesCount} selectedCategory={currentCategory} />
				<div className="top-0 left-0 z-[-10] h-screen w-full bg-[url('https://cdn.thegameawards.com/frontend/jpegs/mid-section-bg_24.jpg')] bg-center bg-cover bg-no-repeat pointer-events-none fixed">
	        <div className="absolute inset-0 bg-black opacity-70" />
	      </div>
      </div>
		</div>
	);
}