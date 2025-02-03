import { authorizedList } from "@/utils/helpers";
import { createClient } from "@/lib/supabase-ssr";
import { removeVote } from "@/domain/usecases/vote-usecase";

export async function POST(request) {
	const { project_id, category_id, phase, author_id } = await request.json();
	const supabase = await createClient();
	const { data: { user }, error } = await supabase.auth.getUser();

	if (!project_id || !category_id || !phase || !author_id) {
	  return new Response(JSON.stringify({ error: "Você não está conectado na sua conta do Discord. Entre usando ela e tente votar novamente." }), { status: 401 });
	}

	if (!authorizedList.includes(user?.user_metadata?.sub)) {
		return new Response(JSON.stringify({ error: "Você não está na lista de autorizados para fazer essa requisição." }), { status: 400 });
	}

	try {
	  await removeVote(project_id, category_id, phase, author_id);
	  return new Response(JSON.stringify({ message: "Voto removido com êxito." }), { status: 200 });
	} catch (error) {
	  console.error("Erro no processo de remoção do voto:", error);
	  return new Response(JSON.stringify({ error: error.message }), { status: 400 });
	}
}