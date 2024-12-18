import supabase from "@/lib/supabase";
import { checkEventStatus } from "@/domain/usecases/check-status-programing-usecase";

export async function GET() {
  try {
    const response = await checkEventStatus();
    return Response.json(response, { status: 200 });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}