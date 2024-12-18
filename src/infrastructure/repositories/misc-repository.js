import { createClient } from "@/lib/supabase-ssr";

export default class MiscRepository {
  constructor() {
    this.supabase = null;
  }

  async init() {
    this.supabase = await createClient();
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