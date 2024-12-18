import VoteRepository from "@/infrastructure/repositories/vote-repository";

export async function getGamesByVotesAndCategory(category_id, phase) {
  const voteRepo = new VoteRepository();
  await voteRepo.init();
  
  const votes = await voteRepo.getVotesByCategory(category_id, phase);

  console.log(votes)

  const voteCounts = {};
  votes.forEach(vote => {
    if (voteCounts[vote.project_id]) {
      voteCounts[vote.project_id] += 1;
    } else {
      voteCounts[vote.project_id] = 1;
    }
  });

  const filteredProjects = Object.keys(voteCounts).filter(
    (project_id) => voteCounts[project_id] >= 3
  );

  return filteredProjects;
}