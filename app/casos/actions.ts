"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { requerUtilizador } from "@/lib/auth";

interface CasoInput {
  titulo: string;
  descricao: string;
  notas: string;
  tags: string[];
}

export async function criarCaso(input: CasoInput) {
  const user = await requerUtilizador();
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("casos")
    .insert({
      utilizador_id: user.id,
      titulo: input.titulo,
      descricao: input.descricao,
      notas: input.notas,
      tags: input.tags,
    })
    .select("id")
    .single();
  if (error) throw new Error(error.message);
  revalidatePath("/casos");
  redirect(`/casos/${data.id}`);
}

export async function atualizarCaso(id: string, input: CasoInput) {
  const user = await requerUtilizador();
  const supabase = await createClient();
  const { error } = await supabase
    .from("casos")
    .update({
      titulo: input.titulo,
      descricao: input.descricao,
      notas: input.notas,
      tags: input.tags,
      atualizado_em: new Date().toISOString(),
    })
    .eq("id", id)
    .eq("utilizador_id", user.id);
  if (error) throw new Error(error.message);
  revalidatePath("/casos");
  revalidatePath(`/casos/${id}`);
}

export async function apagarCaso(id: string) {
  const user = await requerUtilizador();
  const supabase = await createClient();
  const { error } = await supabase
    .from("casos")
    .delete()
    .eq("id", id)
    .eq("utilizador_id", user.id);
  if (error) throw new Error(error.message);
  revalidatePath("/casos");
  redirect("/casos");
}
