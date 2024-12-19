import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";

export async function updateSession(request, requestHeaders) {
  let supabaseResponse = NextResponse.next({
    request: {
      headers: requestHeaders
    }
  });

  const supabase = createServerClient(
    "https://doqpwhcglnhkftttcluc.supabase.co",
    process.env.NEXT_PUBLIC_SUPABASE_KEY,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            request.cookies.set(name, value, options);
            supabaseResponse.cookies.set(name, value, options);
          });
        },
      },
    }
  );

  return supabaseResponse;
}
