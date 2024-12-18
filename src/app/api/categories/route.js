import supabase from "@/lib/supabase";
import { getAllCategories } from "@/domain/usecases/get-all-categories-usecase";

export async function GET() {
	try {
		const categories = await getAllCategories();
		return new Response(JSON.stringify({ categories }), { status: 200 });
	} catch (error) {
		console.error(`Falha ao pegar todas as categorias: ${error}`);
		return new Response(
			JSON.stringify({ error: error.message }),
			{ status: 400 }
		);
	}
}