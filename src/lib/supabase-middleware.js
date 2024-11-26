import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";

export async function updateSession(request) {
  // Inicializa a resposta de forma padrão
  let supabaseResponse = NextResponse.next();

  // Cria o cliente Supabase com as cookies do request
  const supabase = createServerClient(
    "https://doqpwhcglnhkftttcluc.supabase.co",
    process.env.NEXT_PUBLIC_SUPABASE_KEY,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();  // Obtém todos os cookies
        },
        setAll(cookiesToSet) {
          // Configura os cookies na resposta
          cookiesToSet.forEach(({ name, value, options }) => {
            request.cookies.set(name, value, options);  // Set cookies on the request
            supabaseResponse.cookies.set(name, value, options);  // Set cookies in the response
          });
        },
      },
    }
  );

  // Retorna a resposta do Supabase, que inclui os cookies atualizados
  return supabaseResponse;
}
