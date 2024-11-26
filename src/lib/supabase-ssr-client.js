import { createBrowserClient } from "@supabase/ssr";

const supabase = createBrowserClient(
  "https://doqpwhcglnhkftttcluc.supabase.co",
  process.env.NEXT_PUBLIC_SUPABASE_KEY
);

export default supabase;