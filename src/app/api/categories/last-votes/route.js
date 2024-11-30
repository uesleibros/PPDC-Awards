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

  return new Response(
    JSON.stringify({ lastVotes: Object.values(lastVotesByCategory) }),
    { status: 200, headers: { "Content-Type": "application/json" } }
  );
}
