import supabase from "@/lib/supabase";

export async function GET() {
	const { data: partners, error } = await supabase.from("partners").select('*');

	if (error)
		return Response.json({ error: "Failed to fetch partners." }, { status: 400 });

	return Response.json({ partners }, { status: 200 });
}