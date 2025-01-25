import getProjectsVotesPhase2 from "@/domain/usecases/get-projects-votes-phase2-usecase";

export async function POST(request) {
	try {
		const { gameIDs, category_id } = await request.json();

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

		const votes = await getProjectsVotesPhase2(gameIDs, category_id);
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