import { createClient } from "@/lib/supabase-ssr";

export default class VoteRepository {
  constructor() {
    this.supabase = null;
  }

  async init() {
    this.supabase = await createClient();
  }

  async findAll(phase) {
    const { data, error } = await this.supabase
      .from("votes")
      .select("project_id")
      .eq("phase", phase);

    if (error) {
      throw new Error(`Erro ao buscar dados: ${error.message}`);
    }

    return data || [];
  }

  async fetchVotesByPhase(author_id, phase) {
    const { data, error } = await this.supabase
      .from("votes")
      .select("project_id, category_id, created_at")
      .eq("phase", phase)
      .eq("author_id", author_id)
      .order("created_at", { ascending: false });

    if (error) throw new Error(error.message);

    return data || [];
  }

  async fetchVotesByProjectId(project_id) {
    const { data: votes, error } = await this.supabase
      .from("votes")
      .select("category_id, project_id")
      .eq("project_id", project_id);

    if (error)
      throw new Error(`Erro ao buscar votos: ${error.message}`);

    return votes;
  }

  async getVotesByCategory(category_id, phase) {
    const { data, error } = await this.supabase
      .from("votes")
      .select("project_id")
      .eq("category_id", category_id)
      .eq("phase", phase);

    if (error) {
      throw new Error(`Erro ao buscar dados: ${error.message}`);
    }

    return data || [];
  }

  async existingVote(project_id, category_id, phase, author_id) {
    const { data: existingVote, error: voteError } = await this.supabase
      .from("votes")
      .select("id")
      .eq("project_id", project_id)
      .eq("category_id", category_id)
      .eq("phase", phase)
      .eq("author_id", author_id)
      .single();

    if (voteError && voteError.code !== "PGRST116")
      throw new Error(voteError.message);

    return !!existingVote;
  }

  async getVoteCount(project_id, phase) {
    const { data, error } = await this.supabase
      .from("votes")
      .select("id", { count: "exact" })
      .eq("project_id", project_id)
      .eq("phase", phase);

    if (error) throw new Error(`Erro ao contar votos: ${error.message}`);
    return data.count;
  }

  async insertVote(project_id, category_id, phase, author_id) {
    const { error: insertError } = await this.supabase
      .from("votes")
      .insert({
        project_id,
        category_id,
        phase,
        author_id
      });

    if (insertError)
      throw new Error(`Falha ao inserir voto: ${insertError.message}`);
  }

  async removeVote(project_id, category_id, phase, author_id) {
    const { error: deleteError } = await this.supabase
      .from("votes")
      .delete()
      .eq("project_id", project_id)
      .eq("category_id", category_id)
      .eq("phase", phase)
      .eq("author_id", author_id);

    if (deleteError)
      throw new Error(`Falha ao remover voto: ${deleteError.message}`);
  }
}