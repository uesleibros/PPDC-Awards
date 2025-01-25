import VoteRepository from "@/infrastructure/repositories/vote-repository";

export async function countGamesAboveThreeVotes(phase) {
  const voteRepo = new VoteRepository();
  await voteRepo.init();
  
  const votes = await voteRepo.findAll(phase);

  const voteCounts = {};
  votes.forEach(vote => {
    if (voteCounts[`${vote.project_id}${vote.category_id}`]) {
      voteCounts[`${vote.project_id}${vote.category_id}`] += 1;
    } else {
      voteCounts[`${vote.project_id}${vote.category_id}`] = 1;
    }
  });

  console.log(voteCounts)

  const projectsAboveThreeVotes = Object.values(voteCounts).filter(count => count >= 3);

  return {
    count: projectsAboveThreeVotes.length
  };
}