import ClassificadosDebug from "@/components/frontend/ClassificadosDebug";
import { getGamesByVotesAndCategory } from "@/domain/usecases/get-games-by-votes-and-category-usecase";
import { getAllCategories } from "@/domain/usecases/get-all-categories-usecase";
import { countGamesAboveThreeVotes } from "@/domain/usecases/count-games-above-three-votes-usecase";
import { getCrateProjectsByIDs } from "@/domain/usecases/get-crate-projects-by-ids-usecase";
import { createClient } from "@/lib/supabase-ssr";

export const metadata = {
  title: "PPDC Awards - Classificados.com"
};

export default async function ClassificadosFase1Debug() {
	const authorizedList = ["764259870563631114", "808627555027910676", "616386370063302686", "480338857724739594"];
	const supabase = await createClient();
	const { data: { user } } = await supabase.auth.getUser();

	if (!authorizedList.includes(user?.user_metadata?.sub)) {
		return (
			"Você não é digno."
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