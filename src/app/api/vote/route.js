import { createClient } from "@/lib/supabase-ssr";
import { vote, removeVote } from "@/domain/usecases/vote-usecase";

export async function POST(request) {
  const supabase = await createClient();
	const { project_id, category_id, phase } = await request.json();
	const { data: { user }, error } = await supabase.auth.getUser();

  if (error || !user) {
    return new Response(JSON.stringify({ error: "Você não está conectado na sua conta do Discord. Entre usando ela e tente votar novamente." }), { status: 401 });
  }

  if (!project_id || !category_id || !phase) {
    return new Response(
      JSON.stringify({ error: "Falta de campos: project_id, category_id, ou phase" }),
      { status: 400 }
    );
  }

  try {
    await vote(project_id, category_id, phase, user.id);
    return new Response(JSON.stringify({ message: "Voto registrado com êxito." }), { status: 200 });
  } catch (error) {
    console.error("Erro no processo de votação:", error);
    return new Response(JSON.stringify({ error: error.message }), { status: 400 });
  }
}

export async function DELETE(request) {
  const supabase = await createClient();
  const { project_id, category_id, phase } = await request.json();
  const { data: { user }, error } = await supabase.auth.getUser();

  if (error || !user) {
    return new Response(JSON.stringify({ error: "Você não está conectado na sua conta do Discord. Entre usando ela e tente votar novamente." }), { status: 401 });
  }

  if (!project_id || !category_id || !phase) {
    return new Response(
      JSON.stringify({ error: "Falta de campos: project_id, category_id, ou phase" }),
      { status: 400 }
    );
  }

  try {
    await removeVote(project_id, category_id, phase, user.id);
    return new Response(JSON.stringify({ message: "Voto removido com êxito." }), { status: 200 });
  } catch (error) {
    console.error("Erro no processo de remoção do voto:", error);
    return new Response(JSON.stringify({ error: error.message }), { status: 400 });
  }
}