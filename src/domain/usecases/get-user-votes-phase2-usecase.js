import VoteRepository from "@/infrastructure/repositories/vote-repository";

export async function getUserVotesPhase2(category_id) {
	const voteRepo = new VoteRepository();
	await voteRepo.init();

	const votes = await voteRepo.getUserVotesPhase2(category_id);
	return votes;
}