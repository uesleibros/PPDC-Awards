import { createClient } from "@/lib/supabase-ssr";
import { authorizedList } from "@/utils/helpers";
import getProjectsVotesPhase2 from "@/domain/usecases/get-projects-votes-phase2-usecase";

export async function POST(request) {
	try {
		const { gameIDs, category_id, debugMode } = await request.json();

		if (!gameIDs || !category_id) {
		  return new Response(
		    JSON.stringify({ error: "Falta do campo gameIDs ou category_id." }),
		    { status: 400 }
		  );
		}

		if (!Array.isArray(gameIDs)) {
		  return new Response(
		    JSON.stringify({ error: "Campo gameIDs precisa ser um array." }),
		    { status: 400 }
		  );
		}

		if (debugMode) {
			const supabase = await createClient();
			const { data: { user }, error } = await supabase.auth.getUser();
			if (error || !user) {
			  return new Response(JSON.stringify({ error: "Você não está conectado na sua conta do Discord. Entre usando ela e tente votar novamente." }), { status: 401 });
			}

			if (!authorizedList.includes(user?.user_metadata?.sub)) {
				return new Response(JSON.stringify({ error: "Você não está na lista de autorizados para fazer essa requisição." }), { status: 400 });
			}
		}

		const votes = await getProjectsVotesPhase2(gameIDs, category_id, debugMode || false);
		return new Response(
			JSON.stringify(votes),
			{ status: 200 }
		);
	} catch (error) {
		return new Response(
		  JSON.stringify({ error: error.message || "Erro interno" }),
		  { status: 500 }
		);
	}
}