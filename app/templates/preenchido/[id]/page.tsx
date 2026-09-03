import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";
import { requerUtilizador } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import { PLATAFORMA } from "@/lib/config";
import { PreencherTemplateForm } from "@/components/pecas/preencher-template-form";
import { ApagarPreenchidoBtn } from "@/components/pecas/apagar-preenchido-btn";
import type { TemplateEditavel, TemplatePreenchido } from "@/lib/data/pecas/templates";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function PreenchidoPage({ params }: Props) {
  if (!PLATAFORMA.pecas.templates) notFound();
  const user = await requerUtilizador();
  const { id } = await params;

  const supabase = await createClient();
  const { data: preenchido } = await supabase
    .from("templates_preenchidos")
    .select("*")
    .eq("id", id)
    .eq("utilizador_id", user.id)
    .single();

  if (!preenchido) notFound();

  const { data: template } = await supabase
    .from("templates")
    .select("*")
    .eq("id", preenchido.template_id)
    .single();

  if (!template) notFound();

  return (
    <div className="min-h-screen flex flex-col">
      <Nav autenticado />
      <main className="flex-1">
        <div className="max-w-2xl mx-auto px-6 py-10">
          <Link
            href="/templates"
            className="inline-flex items-center gap-2 text-sm text-gold-700 hover:text-gold-600 mb-10 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            Voltar
          </Link>

          <div className="mb-8 flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 gold-divider" />
                <p className="text-[10px] tracking-[0.3em] uppercase text-gold-600">
                  {(template as TemplateEditavel).titulo}
                </p>
              </div>
              <h1 className="font-serif italic text-3xl sm:text-4xl gold-text-rich">
                {(preenchido as TemplatePreenchido).titulo}
              </h1>
            </div>
            <ApagarPreenchidoBtn id={(preenchido as TemplatePreenchido).id} />
          </div>

          <div className="rounded-2xl bg-cream-50 gold-border-rich gold-shadow p-6 sm:p-8">
            <PreencherTemplateForm
              template={template as TemplateEditavel}
              preenchido={preenchido as TemplatePreenchido}
            />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
