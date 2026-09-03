import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";
import { requerMentora } from "@/lib/auth";
import { getTemplates } from "@/lib/data/pecas/templates";

export const metadata = { title: "Gerir templates" };

export default async function AdminTemplatesPage() {
  await requerMentora();
  const templates = await getTemplates();

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
              Templates
            </h1>
          </div>

          <div className="rounded-2xl bg-cream-50 gold-border p-6 mb-6">
            <p className="text-sm text-ink-soft leading-relaxed">
              Cada template tem um formulário definido em <code className="mx-1 px-1.5 py-0.5 rounded bg-gold-100 text-gold-800 text-xs font-mono">campos</code>
              (array JSON). Cada campo é <code className="mx-1 px-1.5 py-0.5 rounded bg-gold-100 text-gold-800 text-xs font-mono">{`{ id, label, tipo }`}</code>.
            </p>
            <p className="text-sm text-ink-soft leading-relaxed mt-3">
              Cria diretamente no Supabase (tabela <code className="mx-1 px-1.5 py-0.5 rounded bg-gold-100 text-gold-800 text-xs font-mono">templates</code>) ou pede ao Claude Code para gerar um.
            </p>
          </div>

          {templates.length === 0 ? (
            <p className="text-center text-ink-soft py-10 italic">
              Ainda não há templates.
            </p>
          ) : (
            <div className="space-y-3">
              {templates.map((t) => (
                <div
                  key={t.id}
                  className="rounded-xl bg-cream-50 gold-border p-5"
                >
                  <h3 className="font-serif italic text-lg text-ink mb-1">
                    {t.titulo}
                  </h3>
                  {t.descricao && (
                    <p className="text-xs text-ink-soft line-clamp-2 mb-2">
                      {t.descricao}
                    </p>
                  )}
                  <p className="text-[10px] tracking-[0.2em] uppercase text-gold-600">
                    {t.campos.length} campo{t.campos.length === 1 ? "" : "s"}
                  </p>
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
