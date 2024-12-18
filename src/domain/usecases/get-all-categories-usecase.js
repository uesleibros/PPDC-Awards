import CategoryRepository from "@/infrastructure/repositories/category-repository";

export async function getAllCategories() {
	const categoryRepo = new CategoryRepository();
	await categoryRepo.init();

	const categories = await categoryRepo.findAll();
	return categories;
}