import MiscRepository from "@/infrastructure/repositories/misc-repository";

export async function getMiscAll(name) {
	const miscRepo = new MiscRepository();
	await miscRepo.init();

	const data = miscRepo.findAll(name);
	return data;
}