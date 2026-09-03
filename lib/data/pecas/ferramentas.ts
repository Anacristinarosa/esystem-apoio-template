import { createClient } from "@/lib/supabase/server";

export interface Ferramenta {
  id: string;
  titulo: string;
  descricao: string | null;
  categoria: string | null;
  duracao_minutos: number | null;
  material_url: string | null;
  publicada: boolean;
  criada_em: string;
}

export async function getFerramentas(filtroCategoria?: string): Promise<Ferramenta[]> {
  const supabase = await createClient();
  let query = supabase
    .from("ferramentas")
    .select("*")
    .eq("publicada", true)
    .order("titulo", { ascending: true });
  if (filtroCategoria) query = query.eq("categoria", filtroCategoria);
  const { data, error } = await query;
  if (error) return [];
  return data ?? [];
}

export async function getCategoriasFerramentas(): Promise<string[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("ferramentas")
    .select("categoria")
    .eq("publicada", true)
    .not("categoria", "is", null);
  if (error) return [];
  const setCat = new Set<string>();
  for (const r of data ?? []) if (r.categoria) setCat.add(r.categoria);
  return Array.from(setCat).sort();
}

export async function getTodasFerramentas(): Promise<Ferramenta[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("ferramentas")
    .select("*")
    .order("titulo", { ascending: true });
  if (error) return [];
  return data ?? [];
}
