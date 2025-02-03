import VoteRepository from "@/infrastructure/repositories/vote-repository";
import { detectCategoryIdExists } from "@/domain/usecases/detect-category-id-exists-usecase";
import { checkEventStatus } from "@/domain/usecases/check-status-programing-usecase";

export async function vote(project_id, category_id, phase, author_id) {
  const voteRepo = new VoteRepository();
  await voteRepo.init();

  await detectCategoryIdExists(category_id);
  await validateGame(project_id, category_id, false);
  await validatePhase(phase, project_id, voteRepo, false);

  const existingVote = await voteRepo.existingVote(project_id, category_id, phase, author_id);
  if (existingVote)
    throw new Error("Você já votou nesse jogo.");

  if (phase === "PHASE_2") {
    const alreadyLimitedQuotaPhase2 = await voteRepo.limitedVotesPhase2(category_id, author_id);
    if (alreadyLimitedQuotaPhase2)
      throw new Error("Você só pode votar em até 2 jogos por categoria.");
  }

  await voteRepo.insertVote(project_id, category_id, phase, author_id);
}

export async function removeVote(project_id, category_id, phase, author_id) {
  const voteRepo = new VoteRepository();
  await voteRepo.init();

  await detectCategoryIdExists(category_id);
  await validateGame(project_id, category_id, true, phase);
  await validatePhase(phase, project_id, voteRepo, true);

  const existingVote = await voteRepo.existingVote(project_id, category_id, phase, author_id);
  if (!existingVote)
    throw new Error("Você não tem voto registrado nesse jogo com essa categoria para remover.");

  await voteRepo.removeVote(project_id, category_id, phase, author_id);
}

async function validateGame(project_id, category_id, isRemoving, phase) {
  const req = await fetch(`https://pptgamespt.wixsite.com/crate/_functions/api/v3/projects/id/${project_id}`);
  if (!req.ok) {
    throw new Error("Projeto não encontrado.");
  }

  const game = await req.json();
  const isReleased = game.released;

  if (!isRemoving) {
    if (category_id === 2 && isReleased) {
      throw new Error("Você não pode votar em 'Mais Aguardado' para jogos já lançados.");
    }

    if (!isReleased && category_id !== 2) {
      throw new Error("Você não pode votar em outras categorias além de 'Mais Aguardado' para jogos não lançados.");
    }

    if (phase === "PHASE_1") {
      const releaseYear = new Date(game.publishedDate).getFullYear();
      const currentYear = new Date().getFullYear();
      if (currentYear - releaseYear > 3) {
        throw new Error("O jogo foi lançado há mais de 3 anos.");
      }
    }
  }
}

async function validatePhase(phase, project_id, voteRepo, isRemoving) {
  const validPhases = ["PHASE_1", "PHASE_2"];
  if (!validPhases.includes(phase)) {
    throw new Error("Fase inválida.");
  }

  if (phase === "PHASE_2") {
    const count = await voteRepo.getVoteCount(project_id, "PHASE_1");
    if (count < 3) {
      throw new Error("O jogo não está classificado para a fase 2.");
    }
  }

  const status = await checkEventStatus();
  const phaseStatusMapping = {
    PHASE_1: status.first_stage_status,
    PHASE_2: status.last_stage_status,
  };

  const currentPhaseStatus = phaseStatusMapping[phase];

  if (currentPhaseStatus !== "rolando") {
    throw new Error(`Não é possível ${isRemoving ? "remover o voto" : "votar"}, essa fase está listada como "${currentPhaseStatus}".`);
  }
}