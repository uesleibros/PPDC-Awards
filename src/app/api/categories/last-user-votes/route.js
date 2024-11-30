import { createClient } from "@/lib/supabase-ssr";

export async function POST(request) {
  const { phase } = await request.json();
  const supabase = await createClient();
  const { data: { user }, error } = await supabase.auth.getUser();

  if (error || !user) {
    return new Response(
      JSON.stringify({ error: "Você não está conectado na sua conta do Discord. Entre usando ela e tente votar novamente." }),
      { status: 401 }
    );
  }

  if (!phase) {
    return new Response(
      JSON.stringify({ error: "Falta do campo phase" }),
      { status: 400 }
    );
  }

  const { data: votes, error: votesError } = await supabase
    .from("votes")
    .select("project_id, category_id, created_at")
    .eq("phase", phase)
    .eq("author_id", user.id)
    .order("created_at", { ascending: false });

  if (votesError) {
    return new Response(
      JSON.stringify({ error: votesError.message }),
      { status: 400 }
    );
  }

  const lastVotesByCategory = votes.reduce((result, vote) => {
    if (!result[vote.category_id] || new Date(vote.created_at) > new Date(result[vote.category_id].created_at)) {
      result[vote.category_id] = vote;
    }
    return result;
  }, {});

  const votesWithTitles = await Promise.all(
    Object.values(lastVotesByCategory).map(async (vote) => {
      try {
        const response = await fetch(
          `https://pptgamespt.wixsite.com/crate/_functions/api/v3/projects/id/${vote.project_id}`
        );
        if (!response.ok) {
          throw new Error(`Erro ao buscar o título do projeto ${vote.project_id}`);
        }
        const projectData = await response.json();
        return {
          category_id: vote.category_id,
          project_id: vote.project_id,
          title: projectData.title || "Título indisponível",
          created_at: vote.created_at
        };
      } catch (error) {
        return {
          category_id: vote.category_id,
          project_id: vote.project_id,
          title: "Erro ao buscar título",
          created_at: vote.created_at
        };
      }
    })
  );

  return new Response(
    JSON.stringify({ lastVotes: votesWithTitles }),
    { status: 200, headers: { "Content-Type": "application/json" } }
  );
}
