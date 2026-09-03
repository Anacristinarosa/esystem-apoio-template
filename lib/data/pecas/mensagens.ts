import { createClient } from "@/lib/supabase/server";

export interface MensagemDia {
  id: string;
  data: string;
  titulo: string | null;
  mensagem: string;
  tarefa: string | null;
  publicada: boolean;
  criada_em: string;
}

export async function getMensagemDeHoje(): Promise<MensagemDia | null> {
  const supabase = await createClient();
  const hoje = new Date().toISOString().split("T")[0];
  const { data, error } = await supabase
    .from("mensagens_dia")
    .select("*")
    .eq("data", hoje)
    .eq("publicada", true)
    .single();
  if (error) return null;
  return data;
}

export async function getMensagensPassadas(limite = 20): Promise<MensagemDia[]> {
  const supabase = await createClient();
  const hoje = new Date().toISOString().split("T")[0];
  const { data, error } = await supabase
    .from("mensagens_dia")
    .select("*")
    .eq("publicada", true)
    .lt("data", hoje)
    .order("data", { ascending: false })
    .limit(limite);
  if (error) return [];
  return data ?? [];
}

export async function getTodasMensagens(): Promise<MensagemDia[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("mensagens_dia")
    .select("*")
    .order("data", { ascending: false });
  if (error) return [];
  return data ?? [];
}
