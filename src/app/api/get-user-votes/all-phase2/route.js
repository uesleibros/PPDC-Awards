import { getUserVotesPhase2 } from "@/domain/usecases/get-user-votes-phase2-usecase";

export async function POST(request) {
	const { category_id } = await request.json();

	if (!category_id) {
	  return new Response(
	    JSON.stringify({ error: "Falta do campo category_id" }),
	    { status: 400 }
	  );
	}

	try {
	  const votes = await getUserVotesPhase2(category_id);
	  return new Response(JSON.stringify({ votes }), { status: 200 });
	} catch (error) {
	  console.error("Erro no processo de votação:", error);
	  return new Response(
	    JSON.stringify({ error: error.message }),
	    { status: 400 }
	  );
	}
}