import supabase from "@/lib/supabase";

export async function GET() {
	const { data: categories, error } = await supabase.from("categories").select('*').order("created_at", { ascending: true });

	if (error)
		return Response.json({ error: "Falha ao pegar categorias." }, { status: 400 });

	return Response.json({ categories }, { status: 200 });
}