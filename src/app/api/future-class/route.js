import supabase from "@/lib/supabase";

export async function GET() {
	const { data, error } = await supabase.from("future-class").select('*');

	if (error)
		return Response.json({ error: "Falha ao pegar future-class." }, { status: 400 });

	return Response.json({ "future-class": data }, { status: 200 });
}