import supabase from "@/lib/supabase";

export async function GET() {
	const { data: advisors, error } = await supabase.from("advisors").select('*');

	if (error)
		return Response.json({ error: "Failed to fetch advisors." }, { status: 400 });

	return Response.json({ advisors }, { status: 200 });
}