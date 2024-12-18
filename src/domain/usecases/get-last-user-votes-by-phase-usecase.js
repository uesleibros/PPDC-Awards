import VoteRepository from "@/infrastructure/repositories/vote-repository";
import { fetchProjectDetails } from "@/utils/helpers";

export async function getLastUserVotesByPhase(author_id, phase) {
  const voteRepo = new VoteRepository();
  await voteRepo.init();

  const votes = await voteRepo.fetchVotesByPhase(author_id, phase);

  const lastVotesByCategory = votes.reduce((result, vote) => {
    if (!result[vote.category_id] || new Date(vote.created_at) > new Date(result[vote.category_id].created_at)) {
      result[vote.category_id] = vote;
    }
    return result;
  }, {});

  const votesWithTitles = await Promise.all(
    Object.values(lastVotesByCategory).map(async (vote) => {
      try {
        const projectData = await fetchProjectDetails(vote.project_id);
        return {
          category_id: vote.category_id,
          project_id: vote.project_id,
          title: projectData.title || "Título indisponível",
          created_at: vote.created_at,
        };
      } catch (error) {
        return {
          category_id: vote.category_id,
          project_id: vote.project_id,
          title: "Erro ao buscar título",
          created_at: vote.created_at,
        };
      }
    })
  );

  return votesWithTitles;
}
