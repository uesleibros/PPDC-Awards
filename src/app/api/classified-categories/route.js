import { createClient } from "@/lib/supabase-ssr";

async function fetchClassifiedCategories(projectId) {
  const supabase = await createClient();
  const { data: votes, error } = await supabase
    .from("votes")
    .select("category_id, project_id")
    .eq("project_id", projectId);

  if (error) {
    console.error("Erro ao buscar votos:", error);
    return [];
  }

  const categoryCounts = votes.reduce((acc, vote) => {
    acc[vote.category_id] = (acc[vote.category_id] || 0) + 1;
    return acc;
  }, {});

  const classifiedCategories = Object.keys(categoryCounts)
    .filter(categoryId => categoryCounts[categoryId] >= 3)
    .map(categoryId => ({ category_id: categoryId, votes: categoryCounts[categoryId] }));

  return classifiedCategories;
}


export async function POST(request) {
  const { project_id } = await request.json();

  if (!project_id) {
    return new Response(
      JSON.stringify({ error: "Falta do campo project_id" }),
      { status: 400 }
    );
  }

  const data = await fetchClassifiedCategories(project_id);
  return new Response(JSON.stringify(data.map(category => category.category_id)), { status: 200 });
}
