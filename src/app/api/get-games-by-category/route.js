import supabase from "@/lib/supabase";

export async function POST(request) {
  try {
    const { category_id } = await request.json();

    if (!category_id) {
      return new Response(
        JSON.stringify({ message: "Parâmetro 'category_id' é obrigatório." }),
        { status: 400 }
      );
    }

    const { data: votes, error } = await supabase
      .from("votes")
      .select("project_id")
      .eq("category_id", category_id);

    if (error) {
      return new Response(
        JSON.stringify({ message: "Erro ao buscar dados da base." }),
        { status: 500 }
      );
    }

    const voteCounts = {};
    votes.forEach(vote => {
      if (voteCounts[vote.project_id]) {
        voteCounts[vote.project_id] += 1;
      } else {
        voteCounts[vote.project_id] = 1;
      }
    });

    const filteredProjects = Object.keys(voteCounts).filter(
      (project_id) => voteCounts[project_id] >= 3
    );

    return new Response(JSON.stringify(filteredProjects), { status: 200 });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Erro interno no servidor ao processar a requisição." }),
      { status: 500 }
    );
  }
}
