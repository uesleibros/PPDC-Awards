import { classifyGameCategories } from "@/domain/usecases/classify-game-categories-usecase";

export async function POST(request) {
  try {
    const { project_id } = await request.json();

    if (!project_id) {
      return new Response(
        JSON.stringify({ error: "Falta do campo project_id" }),
        { status: 400 }
      );
    }

    const classifiedGameCategories = await classifyGameCategories(project_id);

    return new Response(
      JSON.stringify(classifiedGameCategories.map(category => category.category_id)),
      { status: 200 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message || "Erro interno" }),
      { status: 500 }
    );
  }
}