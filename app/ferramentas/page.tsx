import Link from "next/link";
import { ArrowLeft, Wrench, ExternalLink, Clock } from "lucide-react";
import { notFound } from "next/navigation";
import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";
import { requerUtilizador } from "@/lib/auth";
import { getFerramentas, getCategoriasFerramentas } from "@/lib/data/pecas/ferramentas";
import { PLATAFORMA } from "@/lib/config";

export const metadata = { title: "Ferramentas" };

interface Props {
  searchParams: Promise<{ cat?: string }>;
}

export default async function FerramentasPage({ searchParams }: Props) {
  if (!PLATAFORMA.pecas.repositorio) notFound();
  await requerUtilizador();
  const { cat } = await searchParams;
  const categorias = await getCategoriasFerramentas();
  const ferramentas = await getFerramentas(cat);

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
                Biblioteca
              </p>
            </div>
            <h1 className="font-serif italic text-3xl sm:text-4xl gold-text-rich">
              {PLATAFORMA.labels.repositorio}
            </h1>
          </div>

          {categorias.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-8">
              <Link
                href="/ferramentas"
                className={`text-[10px] tracking-[0.2em] uppercase px-3 py-1.5 rounded-full border transition-all ${
                  !cat
                    ? "bg-gold-foil text-white border-transparent"
                    : "bg-cream-50 text-ink-soft gold-border hover:bg-gold-50"
                }`}
              >
                Todas
              </Link>
              {categorias.map((c) => (
                <Link
                  key={c}
                  href={`/ferramentas?cat=${encodeURIComponent(c)}`}
                  className={`text-[10px] tracking-[0.2em] uppercase px-3 py-1.5 rounded-full border transition-all ${
                    cat === c
                      ? "bg-gold-foil text-white border-transparent"
                      : "bg-cream-50 text-ink-soft gold-border hover:bg-gold-50"
                  }`}
                >
                  {c}
                </Link>
              ))}
            </div>
          )}

          {ferramentas.length === 0 ? (
            <div className="rounded-2xl bg-cream-50 gold-border p-10 text-center">
              <Wrench className="w-8 h-8 text-gold-500 mx-auto mb-3" />
              <p className="text-ink-soft italic">Ainda não há ferramentas aqui.</p>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2">
              {ferramentas.map((f) => (
                <div
                  key={f.id}
                  className="rounded-2xl bg-cream-50 gold-border-rich gold-shadow p-6"
                >
                  {f.categoria && (
                    <p className="text-[10px] tracking-[0.3em] uppercase text-gold-600 mb-2">
                      {f.categoria}
                    </p>
                  )}
                  <h3 className="font-serif italic text-xl text-ink mb-2">
                    {f.titulo}
                  </h3>
                  {f.descricao && (
                    <p className="text-sm text-ink-soft leading-relaxed mb-4 whitespace-pre-wrap">
                      {f.descricao}
                    </p>
                  )}
                  <div className="flex items-center justify-between">
                    {f.duracao_minutos ? (
                      <span className="inline-flex items-center gap-1.5 text-xs text-ink-faint">
                        <Clock className="w-3 h-3" /> {f.duracao_minutos} min
                      </span>
                    ) : (
                      <span />
                    )}
                    {f.material_url && (
                      <a
                        href={f.material_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs text-gold-700 hover:text-gold-600 font-medium"
                      >
                        Abrir <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
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
