import Link from "next/link";
import { ArrowLeft, FolderOpen, Plus } from "lucide-react";
import { notFound } from "next/navigation";
import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";
import { requerUtilizador } from "@/lib/auth";
import { getMeusCasos, getMinhasTags } from "@/lib/data/pecas/casos";
import { PLATAFORMA } from "@/lib/config";
import { formatarData } from "@/lib/utils";

export const metadata = { title: "Os meus casos" };

interface Props {
  searchParams: Promise<{ tag?: string }>;
}

export default async function CasosPage({ searchParams }: Props) {
  if (!PLATAFORMA.pecas.casos) notFound();
  const user = await requerUtilizador();
  const { tag } = await searchParams;
  const todos = await getMeusCasos(user.id);
  const tags = await getMinhasTags(user.id);
  const casos = tag ? todos.filter((c) => c.tags?.includes(tag)) : todos;

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

          <div className="flex items-center justify-between mb-8">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 gold-divider" />
                <p className="text-[10px] tracking-[0.3em] uppercase text-gold-600">
                  Privados
                </p>
              </div>
              <h1 className="font-serif italic text-3xl sm:text-4xl gold-text-rich">
                {PLATAFORMA.labels.casos}
              </h1>
            </div>
            <Link
              href="/casos/novo"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-gold-foil text-white gold-shadow hover:opacity-90 transition-opacity text-sm font-medium"
            >
              <Plus className="w-4 h-4" /> Novo caso
            </Link>
          </div>

          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-8">
              <Link
                href="/casos"
                className={`text-[10px] tracking-[0.2em] uppercase px-3 py-1.5 rounded-full border transition-all ${
                  !tag
                    ? "bg-gold-foil text-white border-transparent"
                    : "bg-cream-50 text-ink-soft gold-border hover:bg-gold-50"
                }`}
              >
                Todos
              </Link>
              {tags.map((t) => (
                <Link
                  key={t}
                  href={`/casos?tag=${encodeURIComponent(t)}`}
                  className={`text-[10px] tracking-[0.2em] uppercase px-3 py-1.5 rounded-full border transition-all ${
                    tag === t
                      ? "bg-gold-foil text-white border-transparent"
                      : "bg-cream-50 text-ink-soft gold-border hover:bg-gold-50"
                  }`}
                >
                  {t}
                </Link>
              ))}
            </div>
          )}

          {casos.length === 0 ? (
            <div className="rounded-2xl bg-cream-50 gold-border p-10 text-center">
              <FolderOpen className="w-8 h-8 text-gold-500 mx-auto mb-3" />
              <p className="text-ink-soft italic mb-4">
                {tag ? "Nenhum caso com esta tag." : "A tua biblioteca está vazia."}
              </p>
              {!tag && (
                <Link
                  href="/casos/novo"
                  className="inline-flex items-center gap-2 text-sm text-gold-700 hover:text-gold-600 font-medium"
                >
                  Criar o primeiro caso →
                </Link>
              )}
            </div>
          ) : (
            <div className="grid gap-3 sm:grid-cols-2">
              {casos.map((c) => (
                <Link
                  key={c.id}
                  href={`/casos/${c.id}`}
                  className="block rounded-xl bg-cream-50 gold-border-rich gold-shadow p-5 hover:bg-gold-50/40 transition-all"
                >
                  <h3 className="font-serif italic text-xl text-ink mb-2 line-clamp-1">
                    {c.titulo}
                  </h3>
                  {c.descricao && (
                    <p className="text-sm text-ink-soft leading-relaxed line-clamp-2 mb-3">
                      {c.descricao}
                    </p>
                  )}
                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-1.5">
                      {(c.tags ?? []).slice(0, 3).map((t) => (
                        <span
                          key={t}
                          className="text-[9px] tracking-[0.14em] uppercase px-2 py-0.5 rounded-full bg-gold-100 text-gold-800"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                    <p className="text-[10px] text-ink-faint">
                      {formatarData(c.atualizado_em)}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
