import { createClient } from "@/lib/supabase-ssr";
import { getUserVotesByPhase } from "@/domain/usecases/get-user-votes-by-phase-usecase";

export async function POST(request) {
	const { phase } = await request.json();
  const supabase = await createClient();
	const { data: { user }, error } = await supabase.auth.getUser();

  if (error || !user) {
    return new Response(JSON.stringify({ error: "Você não está conectado na sua conta do Discord. Entre usando ela e tente votar novamente." }), { status: 401 });
  }

  if (!phase) {
    return new Response(
      JSON.stringify({ error: "Falta do campo phase" }),
      { status: 400 }
    );
  }

  try {
    const votes = await getUserVotesByPhase(user.id, phase);
    return new Response(JSON.stringify({ votes }), { status: 200 });
  } catch (error) {
    console.error("Erro no processo de votação:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 400 }
    );
  }
}
