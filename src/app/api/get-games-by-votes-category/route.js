import { getGamesByVotesAndCategory } from "@/domain/usecases/get-games-by-votes-and-category-usecase";

export async function POST(request) {
  try {
    const { category_id, phase } = await request.json();

    if (!category_id || !phase) {
      return new Response(
        JSON.stringify({ message: "Parâmetro 'category_id' e 'phase' é obrigatório." }),
        { status: 400 }
      );
    }

    const filteredGames = await getGamesByVotesAndCategory(category_id, phase);
    return new Response(JSON.stringify(filteredGames), { status: 200 });
  } catch (error) {
    console.error("Erro no processamento da requisição: ", error);
    return new Response(
      JSON.stringify({ error: "Erro interno no servidor ao processar a requisição." }),
      { status: 500 }
    );
  }
}
