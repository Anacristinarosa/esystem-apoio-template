import { createClient } from "@/lib/supabase/server";

export interface UtilizadorResumo {
  id: string;
  email: string;
  nome: string | null;
  criada_em: string;
  ultima_entrada: string | null;
}

export async function getUtilizadores(): Promise<UtilizadorResumo[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("utilizadores_view")
    .select("*")
    .order("criada_em", { ascending: false });
  if (error) {
    console.error("getUtilizadores:", error);
    return [];
  }
  return data ?? [];
}
