import CategoryRepository from "@/infrastructure/repositories/category-repository";

export async function detectCategoryIdExists(category_id) {
	const categoryRepo = new CategoryRepository();
	await categoryRepo.init();

	const existingCategory = await categoryRepo.existingCategory(category_id);
	if (!existingCategory)
		throw new Error("O ID de categoria escolhida não é válida.");
}