import { createClient } from "@/lib/supabase-ssr";

export default class CategoryRepository {
  constructor() {
    this.supabase = null;
  }

  async init() {
    this.supabase = await createClient();
  }

  async findAll() {
    const { data: categories, error } = await this.supabase
      .from("categories")
      .select('*')
      .order("created_at", { ascending: true });

    if (error)
      throw new Error(`Falha ao pegar as categorias: ${error.message}`);

    return categories;
  }

  async findCategoryBySlug(slug) {
    const { data, error } = await this.supabase
      .from("categories")
      .select("*")
      .ilike("title", slug)
      .single();

    if (error) {
      throw new Error(`Erro ao buscar categoria: ${error.message}`);
    }

    return data;
  }

  async findPreviousCategory(currentId) {
    const { data, error } = await this.supabase
      .from("categories")
      .select("*")
      .lt("id", currentId)
      .order("created_at", { ascending: false })
      .limit(1)
      .single();

    if (error && error.code !== "PGRST116") {
      throw new Error(`Erro ao buscar categoria anterior: ${error.message}`);
    }

    return data || null;
  }

  async findNextCategory(currentId) {
    const { data, error } = await this.supabase
      .from("categories")
      .select("*")
      .gt("id", currentId)
      .order("created_at", { ascending: true })
      .limit(1)
      .single();

    if (error && error.code !== "PGRST116") {
      throw new Error(`Erro ao buscar próxima categoria: ${error.message}`);
    }

    return data || null;
  }

  async existingCategory(category_id) {
    const { data: existingCategory, error: categoryError } = await this.supabase
      .from("categories")
      .select("id")
      .eq("id", category_id)
      .single();

    if (categoryError && categoryError.code !== "PGRST116")
      throw new Error(categoryError.message);

    return !!existingCategory;
  }
}