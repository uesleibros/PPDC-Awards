import { createServerClient } from "@/lib/supabase-ssr";

export async function GET(request) {
  const supabase = await createServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return new Response(
      JSON.stringify({ error: "Você não está conectado na sua conta do Discord. Entre usando ela e tente votar novamente." }),
      { status: 401 }
    );
  }

  return new Response(JSON.stringify({ user }), { status: 200 });
}