export async function POST(request) {
  try {
    const { gameIDs } = await request.json();
    console.log(gameIDs);

    if (!gameIDs || gameIDs.length === 0) {
      return new Response(
        JSON.stringify({ error: "Nenhum ID fornecido para busca." }),
        { status: 400 }
      );
    }

    const fetchPromises = gameIDs.map(id =>
      fetch(`https://pptgamespt.wixsite.com/crate/_functions/api/v3/projects/id/${id}`)
        .then(response => {
          if (response.ok) {
            return response.json();
          }
          return { error: `Falhou ao buscar o jogo ${id}` };
        })
        .catch(() => ({ error: `Erro ao buscar o jogo ${id}` }))
    );

    const gamesData = await Promise.all(fetchPromises);
    return new Response(JSON.stringify(gamesData), { status: 200 });
  } catch (error) {
    console.error("Erro interno:", error);
    return new Response(
      JSON.stringify({ error: "Erro interno do servidor ao processar a requisição." }),
      { status: 500 }
    );
  }
}
