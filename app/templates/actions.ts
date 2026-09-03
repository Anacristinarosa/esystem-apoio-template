"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { requerUtilizador } from "@/lib/auth";

export async function criarPreenchido(templateId: string, titulo: string, valores: Record<string, string>) {
  const user = await requerUtilizador();
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("templates_preenchidos")
    .insert({ template_id: templateId, utilizador_id: user.id, titulo, valores })
    .select("id")
    .single();
  if (error) throw new Error(error.message);
  revalidatePath("/templates");
  redirect(`/templates/preenchido/${data.id}`);
}

export async function atualizarPreenchido(id: string, titulo: string, valores: Record<string, string>) {
  const user = await requerUtilizador();
  const supabase = await createClient();
  const { error } = await supabase
    .from("templates_preenchidos")
    .update({ titulo, valores, atualizado_em: new Date().toISOString() })
    .eq("id", id)
    .eq("utilizador_id", user.id);
  if (error) throw new Error(error.message);
  revalidatePath("/templates");
  revalidatePath(`/templates/preenchido/${id}`);
}

export async function apagarPreenchido(id: string) {
  const user = await requerUtilizador();
  const supabase = await createClient();
  const { error } = await supabase
    .from("templates_preenchidos")
    .delete()
    .eq("id", id)
    .eq("utilizador_id", user.id);
  if (error) throw new Error(error.message);
  revalidatePath("/templates");
  redirect("/templates");
}
