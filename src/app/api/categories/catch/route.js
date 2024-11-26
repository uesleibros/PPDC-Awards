import supabase from "@/lib/supabase";

function slugToTitle(slug) {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export async function POST(request) {
	const { title } = await request.json();
	const { data: currentData, error } = await supabase
    .from("categories")
    .select("*")
    .ilike("title", slugToTitle(decodeURIComponent(title)))
    .single();

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 400 });
  }

  const currentId = currentData.id;

  const { data: prevData, error: prevError } = await supabase
    .from("categories")
    .select("*")
    .lt("id", currentId)
    .order("created_at", { ascending: false })
    .limit(1)
    .single();

  if (prevError && prevError.code !== "PGRST116") {
    return new Response(JSON.stringify({ error: prevError.message }), { status: 400 });
  }

  const { data: nextData, error: nextError } = await supabase
    .from("categories")
    .select("*")
    .gt("id", currentId)
    .order("created_at", { ascending: true })
    .limit(1)
    .single();

  if (nextError && nextError.code !== "PGRST116") {
    return new Response(JSON.stringify({ error: nextError.message }), { status: 400 });
  }

  return new Response(
    JSON.stringify({
      current: currentData,
      prev: prevData || null,
      next: nextData || null,
    }),
    { status: 200, headers: { "Content-Type": "application/json" } }
  );
}