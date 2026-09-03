import Link from "next/link";
import { ArrowLeft, Clock, ExternalLink } from "lucide-react";
import { notFound } from "next/navigation";
import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";
import { requerUtilizador } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import { PLATAFORMA } from "@/lib/config";
import type { Ferramenta } from "@/lib/data/pecas/ferramentas";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function FerramentaPage({ params }: Props) {
  if (!PLATAFORMA.pecas.repositorio) notFound();
  await requerUtilizador();
  const { id } = await params;

  const supabase = await createClient();
  const { data: ferramenta } = await supabase
    .from("ferramentas")
    .select("*")
    .eq("id", id)
    .eq("publicada", true)
    .single();

  if (!ferramenta) notFound();
  const f = ferramenta as Ferramenta;

  return (
    <div className="min-h-screen flex flex-col">
      <Nav autenticado />
      <main className="flex-1">
        <div className="max-w-2xl mx-auto px-6 py-10">
          <Link
            href="/ferramentas"
            className="inline-flex items-center gap-2 text-sm text-gold-700 hover:text-gold-600 mb-10 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            Voltar
          </Link>

          <div className="mb-8">
            {f.categoria && (
              <p className="text-[10px] tracking-[0.3em] uppercase text-gold-600 mb-2">
                {f.categoria}
              </p>
            )}
            <h1 className="font-serif italic text-3xl sm:text-4xl gold-text-rich mb-4">
              {f.titulo}
            </h1>
            <div className="flex items-center gap-4 text-xs text-ink-faint">
              {f.duracao_minutos && (
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="w-3 h-3" /> {f.duracao_minutos} min
                </span>
              )}
              {f.material_url && (
                <a
                  href={f.material_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-gold-700 hover:text-gold-600 font-medium"
                >
                  Abrir material <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
          </div>

          {f.descricao && (
            <div className="rounded-2xl bg-cream-50 gold-border-rich p-6 sm:p-8">
              <p className="text-sm text-ink leading-relaxed whitespace-pre-wrap">
                {f.descricao}
              </p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
