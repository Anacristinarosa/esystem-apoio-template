import { createClient } from "@/lib/supabase/server";

export interface Caso {
  id: string;
  utilizador_id: string;
  titulo: string;
  descricao: string | null;
  notas: string | null;
  tags: string[];
  criado_em: string;
  atualizado_em: string;
}

export async function getMeusCasos(utilizadorId: string): Promise<Caso[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("casos")
    .select("*")
    .eq("utilizador_id", utilizadorId)
    .order("atualizado_em", { ascending: false });
  if (error) return [];
  return data ?? [];
}

export async function getMinhasTags(utilizadorId: string): Promise<string[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("casos")
    .select("tags")
    .eq("utilizador_id", utilizadorId);
  if (error) return [];
  const setTags = new Set<string>();
  for (const c of data ?? []) for (const t of c.tags ?? []) setTags.add(t);
  return Array.from(setTags).sort();
}
