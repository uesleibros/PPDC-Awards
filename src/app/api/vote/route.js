import { createClient } from "@/lib/supabase-ssr";
import { headers } from "next/headers";

export async function POST(request) {
  const headersList = await headers();
  const protocol = headersList.get("x-forwarded-proto");
  const host = headersList.get("host");
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

  const req = await fetch(`https://pptgamespt.wixsite.com/crate/_functions/api/v3/projects/id/${project_id}`);
  if (!req.ok) {
    return new Response(
      JSON.stringify({ error: "Falha ao encontrar o projeto por esse id.", details: `Jogo ${project_id} é inválido (não encontrado.).` }),
      { status: 400 }
    ); 
  } else {
    const game = await req.json();
    if (category_id === 2 && game.released) {
      return new Response(
        JSON.stringify({ error: "Você não pode votar na categoria 'Mais Aguardado' quando o jogo já foi lançado.", details: "Tentativa de votar em um jogo que já lançou na categoria 'Mais Aguardado'." }),
        { status: 400 }
      ); 
    }

    if (!game.released && category_id !== 2) {
      return new Response(
        JSON.stringify({ error: "Você não pode votar em outras categorias além da 'Mais Aguardado' quando o jogo não foi lançado.", details: "Tentativa de votar em um jogo que não lançou em uma categoria que não seja 'Mais Aguardado'." }),
        { status: 400 }
      ); 
    }

    const releaseYear = new Date(game.publishedDate);
    const currentYear = new Date().getFullYear();

    if (currentYear - releaseYear > 3) {
      return new Response(
        JSON.stringify({ error: "Esse jogo foi lançado há mais de 3 anos, não está no padrão de voto." }),
        { status: 409 }
      );
    }
  }

  const validPhases = ["PHASE_1", "PHASE_2"];
  if (!validPhases.includes(phase)) {
    return new Response(JSON.stringify({ error: "Fase inválida." }), { status: 400 });
  }

  if (phase === "PHASE_2") {
    const { data: votes } = await supabase
      .from("votes")
      .select("project_id")
      .eq("project_id", project_id)
      .eq("phase", "PHASE_1");

    if (votes.length < 3) {
      return new Response(
        JSON.stringify({ error: "Você não pode votar em um jogo que não está classificado para a fase 2." }),
        { status: 400 }
      );
    }
  }

  const reqstatus = await fetch(`${protocol}://${host}/api/programing/check-available`);
  const status = await reqstatus.json();

  if (phase === "PHASE_1") {
    if (status.first_stage_status !== "rolando") {
      return new Response(
        JSON.stringify({ error: `Não é possível votar, essa fase está listada como "${status.first_stage_status}".` }),
        { status: 400 }
      );
    }
  } else {
    if (status.last_stage_status !== "rolando") {
      return new Response(
        JSON.stringify({ error: `Não é possível votar, essa fase está listada como "${status.first_stage_status}".` }),
        { status: 400 }
      );
    }
  }

  const { data: voteCount, error: countError } = await supabase
    .from("votes")
    .select("id", { count: "exact" })
    .eq("project_id", project_id)
    .eq("category_id", category_id)

  if (countError) {
    return new Response(
      JSON.stringify({ error: "Falha ao contabilizar quantidade de votos.", details: countError.message }),
      { status: 500 }
    );
  }

  if (voteCount.count >= 3) {
    return new Response(
      JSON.stringify({ error: "Essa categoria tem mais de 3 votos para esse jogo, você não pode votar mais nela para esse jogo." }),
      { status: 409 }
    );
  }

  const { data: existingVote, error: voteError } = await supabase
    .from("votes")
    .select("*")
    .eq("author_id", user.id)
    .eq("project_id", project_id)
    .eq("category_id", category_id)
    .eq("phase", phase)
    .single();

  if (voteError && voteError.code !== "PGRST116") {
    return new Response(JSON.stringify({ error: voteError.message }), {
      status: 400,
    });
  }

  if (existingVote) {
    return new Response(
      JSON.stringify({ error: "Você já votou nesse jogo." }),
      { status: 409 }
    );
  }

  const { error: insertError } = await supabase.from("votes").insert({
    project_id,
    category_id,
    phase,
    author_id: user.id,
  });

  if (insertError) {
    return new Response(JSON.stringify({ error: "Falha ao registrar voto.", details: insertError.message }), {
      status: 500,
    });
  }

  return new Response(JSON.stringify({ message: "Voto registrado com êxito." }), { status: 200 });
}

export async function DELETE(request) {
  const headersList = await headers();
  const protocol = headersList.get("x-forwarded-proto");
  const host = headersList.get("host");
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

  const req = await fetch(`https://pptgamespt.wixsite.com/crate/_functions/api/v3/projects/id/${project_id}`);
  if (!req.ok) {
    return new Response(
      JSON.stringify({ error: "Falha ao encontrar o projeto por esse id.", details: `Jogo ${project_id} é inválido (não encontrado.).` }),
      { status: 400 }
    ); 
  } else {
    const game = await req.json();
    if (category_id === 2 && game.released) {
      return new Response(
        JSON.stringify({ error: "Você não pode remover o voto da categoria 'Mais Aguardado' quando o jogo já foi lançado." }),
        { status: 400 }
      ); 
    }

    if (!game.released && category_id !== 2) {
      return new Response(
        JSON.stringify({ error: "Você não pode remover o voto de outras categorias além da 'Mais Aguardado' quando o jogo não foi lançado." }),
        { status: 400 }
      ); 
    }

    const releaseYear = new Date(game.publishedDate);
    const currentYear = new Date().getFullYear();

    if (currentYear - releaseYear > 3) {
      return new Response(
        JSON.stringify({ error: "Esse jogo foi lançado há mais de 3 anos, não está no padrão de remoção de voto." }),
        { status: 409 }
      );
    }
  }

  const validPhases = ["PHASE_1", "PHASE_2"];
  if (!validPhases.includes(phase)) {
    return new Response(JSON.stringify({ error: "Fase inválida." }), { status: 400 });
  }

  const reqstatus = await fetch(`${protocol}://${host}/api/programing/check-available`);
  const status = await reqstatus.json();

  if (phase === "PHASE_1") {
    if (status.first_stage_status !== "rolando") {
      return new Response(
        JSON.stringify({ error: `Não é possível votar, essa fase está listada como "${status.first_stage_status}".` }),
        { status: 400 }
      );
    }
  } else {
    if (status.last_stage_status !== "rolando") {
      return new Response(
        JSON.stringify({ error: `Não é possível votar, essa fase está listada como "${status.first_stage_status}".` }),
        { status: 400 }
      );
    }
  }

  const { data: existingVote, error: voteError } = await supabase
    .from("votes")
    .select("*")
    .eq("author_id", user.id)
    .eq("project_id", project_id)
    .eq("category_id", category_id)
    .eq("phase", phase)
    .single();

  if (voteError) {
    return new Response(JSON.stringify({ error: voteError.message }), {
      status: 400,
    });
  }

  if (!existingVote) {
    return new Response(
      JSON.stringify({ error: "Você não tem voto registrado nessa categoria para remover." }),
      { status: 404 }
    );
  }

  const { error: deleteError } = await supabase
    .from("votes")
    .delete()
    .eq("author_id", user.id)
    .eq("project_id", project_id)
    .eq("phase", phase)
    .eq("category_id", category_id);

  if (deleteError) {
    return new Response(
      JSON.stringify({ error: "Falha ao remover o voto.", details: deleteError.message }),
      { status: 500 }
    );
  }

  return new Response(
    JSON.stringify({ message: "Voto removido com êxito." }),
    { status: 200 }
  );
}