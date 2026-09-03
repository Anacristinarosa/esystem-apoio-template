import Link from "next/link";
import { ArrowLeft, FileEdit, Plus } from "lucide-react";
import { notFound } from "next/navigation";
import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";
import { requerUtilizador } from "@/lib/auth";
import { getTemplates, getMeusTemplatesPreenchidos } from "@/lib/data/pecas/templates";
import { PLATAFORMA } from "@/lib/config";
import { formatarData } from "@/lib/utils";

export const metadata = { title: "Templates" };

export default async function TemplatesPage() {
  if (!PLATAFORMA.pecas.templates) notFound();
  const user = await requerUtilizador();
  const templates = await getTemplates();
  const meus = await getMeusTemplatesPreenchidos(user.id);

  return (
    <div className="min-h-screen flex flex-col">
      <Nav autenticado />
      <main className="flex-1">
        <div className="max-w-4xl mx-auto px-6 py-10">
          <Link
            href="/dashboard"
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
              Preenche, guarda, volta.
            </h1>
          </div>

          {templates.length > 0 && (
            <div className="mb-10">
              <p className="text-[10px] tracking-[0.3em] uppercase text-gold-600 mb-4">
                Templates disponíveis
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                {templates.map((t) => (
                  <Link
                    key={t.id}
                    href={`/templates/${t.id}`}
                    className="group flex items-start gap-3 rounded-xl bg-cream-50 gold-border-rich gold-shadow p-5 hover:bg-gold-50/40 transition-all"
                  >
                    <div className="w-10 h-10 rounded-full bg-gold-foil flex items-center justify-center shrink-0">
                      <Plus className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-serif italic text-lg text-ink mb-1">
                        {t.titulo}
                      </h3>
                      {t.descricao && (
                        <p className="text-xs text-ink-soft leading-relaxed">
                          {t.descricao}
                        </p>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {meus.length > 0 ? (
            <div>
              <p className="text-[10px] tracking-[0.3em] uppercase text-gold-600 mb-4">
                Os teus preenchimentos
              </p>
              <div className="space-y-3">
                {meus.map((m) => (
                  <Link
                    key={m.id}
                    href={`/templates/preenchido/${m.id}`}
                    className="block rounded-xl bg-cream-50 gold-border p-5 hover:bg-gold-50/40 transition-all"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-serif italic text-lg text-ink mb-1">
                          {m.titulo}
                        </h3>
                        <p className="text-xs text-ink-faint">
                          Atualizado {formatarData(m.atualizado_em)}
                        </p>
                      </div>
                      <FileEdit className="w-4 h-4 text-gold-500" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ) : (
            templates.length === 0 && (
              <div className="rounded-2xl bg-cream-50 gold-border p-10 text-center">
                <FileEdit className="w-8 h-8 text-gold-500 mx-auto mb-3" />
                <p className="text-ink-soft italic">Ainda não há templates aqui.</p>
              </div>
            )
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
