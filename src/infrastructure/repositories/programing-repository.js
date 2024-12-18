import { createClient } from "@/lib/supabase-ssr";

export default class ProgramingRepository {
  constructor() {
    this.supabase = null;
    this.formattedDate = new Date().toISOString().split("T")[0];
  }

  async init() {
    this.supabase = await createClient();
  }

  async findProgramming() {
  	const { data: programing, error } = await this.supabase
      .from("programing")
      .select("first_stage, last_stage, end_event")
      .single();

    if (error || !programing)
      throw new Error("Nenhum registro encontrado.");

    return programing;
  }
}