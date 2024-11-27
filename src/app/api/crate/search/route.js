export async function POST(request) {
  const { searchGame } = await request.json();

  const req = await fetch(`https://pptgamespt.wixsite.com/crate/_functions/api/v3/projects?title=contains(${searchGame})`);

  if (req.ok) {
    const data = await req.json();
    return new Response(JSON.stringify(data.items), { status: 200 });

    return new Response(
      JSON.stringify({ error: "Dados inválidos na resposta da API." }),
      { status: 200 }
    );
  } else {
    return new Response(
      JSON.stringify({ error: "Falhou ao buscar por esse jogo." }),
      { status: 200 }
    );
  }
}
