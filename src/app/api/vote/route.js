import { createClient } from "@/lib/supabase-ssr";

export async function POST(request) {
  const supabase = await createClient();
	const { project_id, category_id, phase } = await request.json();
	const { data: { user }, error } = await supabase.auth.getUser();

  if (error || !user) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
  }

  if (!project_id || !category_id || !phase) {
    return new Response(
      JSON.stringify({ error: "Missing required fields: project_id, category_id, or phase" }),
      { status: 400 }
    );
  }

  const req = await fetch(`https://pptgamespt.wixsite.com/crate/_functions/api/v3/projects/id/${project_id}`);
  if (!req.ok) {
    return new Response(
      JSON.stringify({ error: "Failed to found project by id.", details: `Project ${project_id} is invalid.` }),
      { status: 400 }
    ); 
  } else {
    const game = await req.json();
    if (category_id === 2 && game.released) {
      return new Response(
        JSON.stringify({ error: "You can't vote on 'Most Anticipated' when the project is already released.", details: "Trying to vote a released project to most anticipated." }),
        { status: 400 }
      ); 
    }

    const releaseYear = new Date(game.publishedDate);
    const currentYear = new Date().getFullYear();

    if (currentYear - releaseYear > 3) {
      return new Response(
        JSON.stringify({ error: "This game is older than 3 years and cannot vote." }),
        { status: 409 }
      );
    }
  }

  const validPhases = ["PHASE_1", "PHASE_2"];
  if (!validPhases.includes(phase)) {
    return new Response(JSON.stringify({ error: "Invalid phase value" }), { status: 400 });
  }

  const { data: voteCount, error: countError } = await supabase
    .from("votes")
    .select("id", { count: "exact" })
    .eq("project_id", project_id)
    .eq("category_id", category_id)

  if (countError) {
    return new Response(
      JSON.stringify({ error: "Failed to fetch vote count", details: countError.message }),
      { status: 500 }
    );
  }

  if (voteCount.count >= 3) {
    return new Response(
      JSON.stringify({ error: "This category already has 3 votes, you cannot vote" }),
      { status: 409 }
    );
  }

  const { data: existingVote, error: voteError } = await supabase
    .from("votes")
    .select("*")
    .eq("author_id", user.id)
    .eq("project_id", project_id)
    .eq("category_id", category_id)
    .single();

  if (voteError && voteError.code !== "PGRST116") {
    return new Response(JSON.stringify({ error: voteError.message }), {
      status: 400,
    });
  }

  if (existingVote) {
    return new Response(
      JSON.stringify({ error: "Vote already registered" }),
      { status: 409 }
    );
  }

  const { error: insertError } = await supabase.from("votes").insert({
    project_id,
    category_id,
    phase,
    author_id: user.id,
  });

  if (insertError) {
    return new Response(JSON.stringify({ error: "Failed to save vote", details: insertError.message }), {
      status: 500,
    });
  }

  return new Response(JSON.stringify({ message: "Vote successfully recorded" }), { status: 200 });
}
