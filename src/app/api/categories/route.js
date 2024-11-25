import supabase from "@/lib/supabase";

export async function GET() {
	const { data: categories, error } = await supabase.from("categories").select('*');

	if (error)
		return Response.json({ error: "Failed to fetch categories." }, { status: 400 });

	return Response.json({ categories }, { status: 200 });
}