import { getCrateProjectsByIDs } from "@/domain/usecases/get-crate-projects-by-ids-usecase";

export async function POST(request) {
  try {
    const { gameIDs } = await request.json();

    if (!gameIDs || gameIDs.length === 0) {
      return new Response(
        JSON.stringify({ error: "Nenhum ID fornecido para busca." }),
        { status: 400 }
      );
    }

    const gamesData = await getCrateProjectsByIDs(gameIDs);
    return new Response(JSON.stringify(gamesData), { status: 200 });
  } catch (error) {
    console.error("Erro interno:", error);
    return new Response(
      JSON.stringify({ error: "Erro interno do servidor ao processar a requisição." }),
      { status: 500 }
    );
  }
}
