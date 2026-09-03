import { createClient } from "@/lib/supabase/server";

export interface TemplateEditavel {
  id: string;
  titulo: string;
  descricao: string | null;
  campos: TemplateCampo[];
  publicado: boolean;
}

export interface TemplateCampo {
  id: string;
  label: string;
  tipo: "texto" | "textarea" | "numero" | "data";
  placeholder?: string;
}

export interface TemplatePreenchido {
  id: string;
  template_id: string;
  utilizador_id: string;
  titulo: string;
  valores: Record<string, string>;
  criado_em: string;
  atualizado_em: string;
}

export async function getTemplates(): Promise<TemplateEditavel[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("templates")
    .select("*")
    .eq("publicado", true)
    .order("titulo", { ascending: true });
  if (error) return [];
  return data ?? [];
}

export async function getMeusTemplatesPreenchidos(
  utilizadorId: string,
): Promise<TemplatePreenchido[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("templates_preenchidos")
    .select("*")
    .eq("utilizador_id", utilizadorId)
    .order("atualizado_em", { ascending: false });
  if (error) return [];
  return data ?? [];
}
