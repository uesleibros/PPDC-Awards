import ClassificadosDebug from "@/components/frontend/ClassificadosDebug";
import { getGamesByVotesAndCategory } from "@/domain/usecases/get-games-by-votes-and-category-usecase";
import { getAllCategories } from "@/domain/usecases/get-all-categories-usecase";
import { countGamesAboveThreeVotes } from "@/domain/usecases/count-games-above-three-votes-usecase";
import { getCrateProjectsByIDs } from "@/domain/usecases/get-crate-projects-by-ids-usecase";
import { headers, cookies } from "next/headers";
import { authorizedList } from "@/utils/helpers";

export const metadata = {
  title: "PPDC Awards - Classificados.com"
};

export default async function ClassificadosFase1Debug() {
	const headersList = await headers();
  const protocol = headersList.get("x-forwarded-proto");
  const host = headersList.get("host");
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

	const categories = await getAllCategories();
	const games_classified = await countGamesAboveThreeVotes("PHASE_1");

	const categories_games_ids = await Promise.all(
	  categories.map(category => getGamesByVotesAndCategory(category.id, "PHASE_1"))
	);

	const categories_games = await Promise.all(
	  categories_games_ids.map(ids => getCrateProjectsByIDs(ids))
	);

	return (
		<ClassificadosDebug categories={categories} categories_games={categories_games} games_classified={games_classified} />
	);
}