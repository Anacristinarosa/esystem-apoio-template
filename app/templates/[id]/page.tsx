import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";
import { requerUtilizador } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import { PLATAFORMA } from "@/lib/config";
import { PreencherTemplateForm } from "@/components/pecas/preencher-template-form";
import type { TemplateEditavel } from "@/lib/data/pecas/templates";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function TemplatePreencherPage({ params }: Props) {
  if (!PLATAFORMA.pecas.templates) notFound();
  await requerUtilizador();
  const { id } = await params;

  const supabase = await createClient();
  const { data: template } = await supabase
    .from("templates")
    .select("*")
    .eq("id", id)
    .eq("publicado", true)
    .single();

  if (!template) notFound();
  const t = template as TemplateEditavel;

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

          <div className="mb-8">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 gold-divider" />
              <p className="text-[10px] tracking-[0.3em] uppercase text-gold-600">
                {PLATAFORMA.labels.templates}
              </p>
            </div>
            <h1 className="font-serif italic text-3xl sm:text-4xl gold-text-rich mb-3">
              {t.titulo}
            </h1>
            {t.descricao && (
              <p className="text-sm text-ink-soft leading-relaxed">{t.descricao}</p>
            )}
          </div>

          <div className="rounded-2xl bg-cream-50 gold-border-rich gold-shadow p-6 sm:p-8">
            <PreencherTemplateForm template={t} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
