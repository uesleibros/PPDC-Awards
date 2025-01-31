import ProgramingRepository from "@/infrastructure/repositories/programing-repository";

export async function checkEventStatus() {
	const programingRepo = new ProgramingRepository();
	await programingRepo.init();

	const programing = await programingRepo.findProgramming();
	const { first_stage, last_stage, end_event, edition } = programing;

	let first_stage_status = "não iniciado";
	let last_stage_status = "não iniciado";
	const event_ended = !!end_event && programingRepo.formattedDate >= end_event;

	if (programingRepo.formattedDate >= first_stage && (!last_stage || programingRepo.formattedDate < last_stage)) {
	  first_stage_status = "rolando";
	}

	if (programingRepo.formattedDate >= last_stage && (!end_event || programingRepo.formattedDate < end_event)) {
	  first_stage_status = "encerrado";
	  last_stage_status = "rolando";
	}

	if (programingRepo.formattedDate >= end_event) {
	  first_stage_status = "encerrado";
	  last_stage_status = "encerrado";
	}

	return {
	  first_stage_status,
	  last_stage_status,
	  event_ended,
	  edition
	};
}