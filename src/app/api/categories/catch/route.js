import { getCategoryNavigation } from "@/domain/usecases/get-category-navigation-usecase";

export async function POST(request) {
  try {
    const { title } = await request.json();
    const result = await getCategoryNavigation(title);
    return new Response(JSON.stringify(result), { status: 200 });
  } catch (error) {
    console.error("Erro ao pegar categoria:", error);
    return new Response(JSON.stringify({ error: error.message }), { status: 400 });
  }
}