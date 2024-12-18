import { countGamesAboveThreeVotes } from "@/domain/usecases/count-games-above-three-votes-usecase";

export async function GET() {
  try {
    const result = await countGamesAboveThreeVotes("PHASE_1");
    return new Response(JSON.stringify({ count: result.count }), { status: 200 });
  } catch (error) {
    console.error("Erro interno:", error);
    return new Response(
      JSON.stringify({ error: "Erro interno no servidor ao processar a requisição." }),
      { status: 500 }
    );
  }
}
