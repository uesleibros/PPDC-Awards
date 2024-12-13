import supabase from "@/lib/supabase";

export async function GET() {
  try {
    const now = new Date();
    const formattedDate = now.toISOString().split("T")[0];

    const { data: programing, error } = await supabase
      .from("programing")
      .select("first_stage, last_stage, end_event")
      .single();

    if (error || !programing) {
      return Response.json({ message: "Nenhum registro encontrado." }, { status: 404 });
    }

    const { first_stage, last_stage, end_event } = programing;

    let first_stage_status = "não iniciado";
    let last_stage_status = "não iniciado";

    if (formattedDate >= first_stage && (!last_stage || formattedDate < last_stage)) {
      first_stage_status = "rolando";
    }

    if (formattedDate >= last_stage && (!end_event || formattedDate < end_event)) {
      first_stage_status = "encerrado";
      last_stage_status = "rolando";
    }

    if (formattedDate >= end_event) {
      first_stage_status = "encerrado";
      last_stage_status = "encerrado";
    }

    const response = {
      first_stage_status,
      last_stage_status,
      event_ended: !!end_event && formattedDate >= end_event,
    };

    return Response.json(response, { status: 200 });
  } catch (error) {
    return Response.json({ error: "Erro interno do servidor." }, { status: 500 });
  }
}