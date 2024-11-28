export async function POST(request) {
  const { searchGame } = await request.json();

  const req = await fetch(`https://pptgamespt.wixsite.com/crate/_functions/api/v3/projects?title=contains(${searchGame})`);

  if (req.ok) {
    const data = await req.json();
    const filteredItems = data.items.filter(item => !item.icon.startsWith("wix:image://v1"));

    return new Response(JSON.stringify(filteredItems), { status: 200 });
  } else {
    return new Response(
      JSON.stringify({ error: "Falhou ao buscar por esse jogo." }),
      { status: 200 }
    );
  }
}
