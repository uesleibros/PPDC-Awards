import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://doqpwhcglnhkftttcluc.supabase.co";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function cleanExtraVotes() {
  const { data: votes, error } = await supabase
    .from("votes")
    .select("*")
    .eq("phase", "PHASE_2");

  if (error) {
    throw new Error(`Erro ao buscar votos: ${error.message}`);
  }

  const groupedVotes = votes.reduce((acc, vote) => {
    const key = `${vote.author_id}_${vote.category_id}`;
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(vote);
    return acc;
  }, {});

  for (const key in groupedVotes) {
    const votesInGroup = groupedVotes[key];
    if (votesInGroup.length > 2) {
      votesInGroup.sort(
        (a, b) => new Date(a.created_at) - new Date(b.created_at)
      );
      const votesToDelete = votesInGroup.slice(2);
      const idsToDelete = votesToDelete.map((vote) => vote.id);

      const { error: deleteError } = await supabase
        .from("votes")
        .delete()
        .in("id", idsToDelete);

      if (deleteError) {
        console.error(
          `Erro ao deletar votos para o grupo ${key}: ${deleteError.message}`
        );
      } else {
        console.log(
          `Foram deletados ${idsToDelete.length} votos excedentes para o grupo ${key}.`
        );
      }
    }
  }
}

cleanExtraVotes();