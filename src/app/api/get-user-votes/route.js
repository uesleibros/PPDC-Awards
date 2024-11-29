import { createClient } from "@/lib/supabase-ssr";

export async function POST(request) {
	const { phase } = await request.json();
  const supabase = await createClient();
	const { data: { user }, error } = await supabase.auth.getUser();

  if (error || !user) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
  }

  if (!phase) {
    return new Response(
      JSON.stringify({ error: "Missing required field phase" }),
      { status: 400 }
    );
  }

  const { data: votes } = await supabase
    .from("votes")
    .select("category_id")
    .eq("phase", phase)
    .eq("author_id", user.id);

  return new Response(JSON.stringify({ votes }), { status: 200 });
}