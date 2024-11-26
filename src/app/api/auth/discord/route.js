import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase-ssr";

const getURL = () => {
  let url =
    process?.env?.NEXT_PUBLIC_SITE_URL ??
    process?.env?.NEXT_PUBLIC_VERCEL_URL ??
    "http://localhost:3000/";
  url = url.startsWith("http") ? url : `https://${url}`;
  url = url.endsWith("/") ? url : `${url}/`;
  return url;
};

export async function GET(request) {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "discord",
    options: {
      redirectTo: `${getURL()}api/auth/callback`,
    },
  });

  if (error) {
    console.error("Erro na autenticação:", error.message);
    return NextResponse.redirect("/error");
  }

  if (data?.url) {
    return NextResponse.redirect(data.url);
  }

  return NextResponse.redirect("/error");
}