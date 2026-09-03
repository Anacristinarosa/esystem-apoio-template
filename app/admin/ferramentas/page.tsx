import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";
import { requerMentora } from "@/lib/auth";
import { getTodasFerramentas } from "@/lib/data/pecas/ferramentas";

export const metadata = { title: "Gerir ferramentas" };

export default async function AdminFerramentasPage() {
  await requerMentora();
  const ferramentas = await getTodasFerramentas();

  return (
    <div className="min-h-screen flex flex-col">
      <Nav autenticado />
      <main className="flex-1">
        <div className="max-w-3xl mx-auto px-6 py-10">
          <Link
            href="/admin"
            className="inline-flex items-center gap-2 text-sm text-gold-700 hover:text-gold-600 mb-10 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Voltar ao painel
          </Link>

          <div className="mb-8">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 gold-divider" />
              <p className="text-[10px] tracking-[0.3em] uppercase text-gold-600">
                Gestão
              </p>
            </div>
            <h1 className="font-serif italic text-3xl gold-text-rich">
              Ferramentas
            </h1>
          </div>

          <div className="rounded-2xl bg-cream-50 gold-border p-6 mb-6">
            <p className="text-sm text-ink-soft leading-relaxed">
              Cria ferramentas no Supabase (tabela
              <code className="mx-1 px-1.5 py-0.5 rounded bg-gold-100 text-gold-800 text-xs font-mono">ferramentas</code>)
              ou pede ao Claude Code. Sobe PDFs no Storage → bucket
              <code className="mx-1 px-1.5 py-0.5 rounded bg-gold-100 text-gold-800 text-xs font-mono">materiais</code>
              e liga via <code className="mx-1 px-1.5 py-0.5 rounded bg-gold-100 text-gold-800 text-xs font-mono">material_url</code>.
            </p>
          </div>

          {ferramentas.length === 0 ? (
            <p className="text-center text-ink-soft py-10 italic">
              Ainda não há ferramentas.
            </p>
          ) : (
            <div className="grid gap-3 sm:grid-cols-2">
              {ferramentas.map((f) => (
                <div
                  key={f.id}
                  className="rounded-xl bg-cream-50 gold-border p-5"
                >
                  {f.categoria && (
                    <p className="text-[10px] tracking-[0.3em] uppercase text-gold-600 mb-1">
                      {f.categoria}
                    </p>
                  )}
                  <h3 className="font-serif italic text-lg text-ink mb-1">
                    {f.titulo}
                  </h3>
                  {f.descricao && (
                    <p className="text-xs text-ink-soft line-clamp-2">
                      {f.descricao}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
