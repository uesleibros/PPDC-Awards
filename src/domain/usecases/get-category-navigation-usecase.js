import CategoryRepository from "@/infrastructure/repositories/category-repository";
import { slugToTitle } from "@/utils/helpers";

export async function getCategoryNavigation(slug) {
  const categoryRepo = new CategoryRepository();
  await categoryRepo.init();

  const titleSlug = slugToTitle(decodeURIComponent(slug));

  const currentCategory = await categoryRepo.findCategoryBySlug(titleSlug);
  if (!currentCategory) throw new Error("Categoria não encontrada.");

  const previousCategory = await categoryRepo.findPreviousCategory(currentCategory.id);
  const nextCategory = await categoryRepo.findNextCategory(currentCategory.id);

  return {
    current: currentCategory,
    prev: previousCategory,
    next: nextCategory,
  };
}