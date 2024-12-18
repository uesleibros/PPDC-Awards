import VoteRepository from "@/infrastructure/repositories/vote-repository";

export async function getUserVotesByPhase(author_id, phase) {
  const voteRepo = new VoteRepository();
  await voteRepo.init();

  const votes = await voteRepo.fetchVotesByPhase(author_id, phase);
  return votes;
}
