import { getMiscAll } from "@/domain/usecases/get-misc-all-usecase";

export async function GET() {
	try {
		const result = await getMiscAll("advisors");
		return new Response(JSON.stringify({ advisors: result }), { status: 200 });
	} catch (error) {
		console.error("Erro ao pegar dados:", error);
    return new Response(JSON.stringify({ error: error.message }), { status: 400 });
	}
}