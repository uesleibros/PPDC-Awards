import supabase from "@/lib/supabase";

export default class MiscRepository {
  constructor() {
    this.supabase = null;
  }

  async init() {
    this.supabase = supabase;
  }

  async findAll(name) {
    const { data, error } = await this.supabase
      .from(name)
      .select('*')
      .order("created_at", { ascending: true });

    if (error)
      throw new Error(`Falha ao pegar as categorias: ${error.message}`);

    return data;
  }
}