import supabase from "@/lib/supabase";

export default class ProgramingRepository {
  constructor() {
    this.supabase = null;
    this.formattedDate = this.adjustToBrazilianTime(new Date().toISOString());
  }

  async init() {
    this.supabase = supabase;
  }

  adjustToBrazilianTime(utcTimestamp) {
    const date = new Date(utcTimestamp);
    date.setHours(date.getHours() - 3);
    return date.toISOString().replace("T", " ").slice(0, -5);
  }

  async findProgramming() {
  	const { data: programing, error } = await this.supabase
      .from("programing")
      .select("first_stage, last_stage, end_event, edition")
      .eq("active", true)
      .single();

    if (error || !programing) {
      return {
        first_stage: null,
        last_stage: null,
        end_event: null,
        edition: null
      }
    }

    return {
      first_stage: programing.first_stage ? this.adjustToBrazilianTime(programing.first_stage) : null,
      last_stage: programing.last_stage ? this.adjustToBrazilianTime(programing.last_stage) : null,
      end_event: programing.end_event ? this.adjustToBrazilianTime(programing.end_event) : null,
      edition: programing.edition
    };
  }
}