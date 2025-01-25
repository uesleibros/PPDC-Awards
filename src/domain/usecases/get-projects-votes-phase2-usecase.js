import VoteRepository from "@/infrastructure/repositories/vote-repository";
import { detectCategoryIdExists } from "@/domain/usecases/detect-category-id-exists-usecase";
import { checkEventStatus } from "@/domain/usecases/check-status-programing-usecase";

export default async function getProjectsVotesPhase2(projectIds, category_id) {
  const voteRepo = new VoteRepository();
  await voteRepo.init();

  await detectCategoryIdExists(category_id);
  const status = await checkEventStatus();

  if (!status.event_ended) {
    throw new Error("O evento não acabou.");
  }

  const votes = await Promise.all(
    projectIds.map(async (projectId) => {
      try {
        const voteCount = await voteRepo.getVoteCount(projectId, "PHASE_2", category_id);
        return {
          project_id: projectId,
          vote_count: voteCount,
        };
      } catch (error) {
        return {
          project_id: projectId,
          vote_count: 0,
        };
      }
    })
  );

  return votes;
}