import supabase from "@/lib/supabase";

export async function GET() {
  try {
    const { data: votes, error } = await supabase
      .from("votes")
      .select("project_id");

    if (error) {
      return new Response(
        JSON.stringify({ message: "Erro ao buscar dados da base." }),
        { status: 500 }
      );
    }

    const voteCounts = {};
    votes?.forEach(vote => {
      if (voteCounts[vote.project_id]) {
        voteCounts[vote.project_id] += 1;
      } else {
        voteCounts[vote.project_id] = 1;
      }
    });

    const projectsAboveThreeVotes = Object.values(voteCounts).filter(count => count > 3);

    return new Response(
      JSON.stringify({ count: projectsAboveThreeVotes.length }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Erro interno:", error);
    return new Response(
      JSON.stringify({ error: "Erro interno no servidor ao processar a requisição." }),
      { status: 500 }
    );
  }
}
