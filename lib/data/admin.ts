import { createAdminClient } from "@/lib/supabase/admin";

export interface UtilizadorResumo {
  id: string;
  email: string;
  nome: string | null;
  criada_em: string;
  ultima_entrada: string | null;
}

export async function getUtilizadores(): Promise<UtilizadorResumo[]> {
  // A view tem emails de todas as contas: só a chave de servidor a lê (a página já exige a mentora).
  const supabase = createAdminClient();
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
