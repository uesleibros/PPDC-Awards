import VoteRepository from "@/infrastructure/repositories/vote-repository";

export async function classifyGameCategories(project_id) {
  const voteRepo = new VoteRepository();
  await voteRepo.init();

  const votes = await voteRepo.fetchVotesByProjectId(project_id);

  const categoryCounts = votes.reduce((acc, vote) => {
    acc[vote.category_id] = (acc[vote.category_id] || 0) + 1;
    return acc;
  }, {});

  return Object.keys(categoryCounts)
    .filter(category_id => categoryCounts[category_id] >= 3)
    .map(category_id => ({ category_id, votes: categoryCounts[category_id] }));
}