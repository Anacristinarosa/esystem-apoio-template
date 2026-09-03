import Link from "next/link";
import { ArrowLeft, CalendarDays } from "lucide-react";
import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";
import { requerUtilizador } from "@/lib/auth";
import { getMensagemDeHoje, getMensagensPassadas } from "@/lib/data/pecas/mensagens";
import { PLATAFORMA } from "@/lib/config";
import { formatarData } from "@/lib/utils";
import { notFound } from "next/navigation";

export const metadata = { title: "Mensagem do dia" };

export default async function MensagemPage() {
  if (!PLATAFORMA.pecas.mensagemDia) notFound();
  await requerUtilizador();
  const hoje = await getMensagemDeHoje();
  const passadas = await getMensagensPassadas(10);

  return (
    <div className="min-h-screen flex flex-col">
      <Nav autenticado />
      <main className="flex-1">
        <div className="max-w-2xl mx-auto px-6 py-10">
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
                {PLATAFORMA.labels.mensagemDia}
              </p>
            </div>
            <h1 className="font-serif italic text-3xl sm:text-4xl gold-text-rich">
              {new Date().toLocaleDateString("pt-PT", { weekday: "long", day: "2-digit", month: "long" })}
            </h1>
          </div>

          {hoje ? (
            <div className="rounded-2xl bg-cream-50 gold-border-rich gold-shadow-lg p-8 mb-10">
              {hoje.titulo && (
                <h2 className="font-serif italic text-2xl gold-text-rich mb-4">
                  {hoje.titulo}
                </h2>
              )}
              <p className="text-base text-ink leading-relaxed whitespace-pre-wrap">
                {hoje.mensagem}
              </p>
              {hoje.tarefa && (
                <div className="mt-6 pt-6 border-t border-gold-200/60">
                  <p className="text-[10px] tracking-[0.3em] uppercase text-gold-600 mb-2">
                    A tua tarefa de hoje
                  </p>
                  <p className="text-ink font-medium whitespace-pre-wrap">
                    {hoje.tarefa}
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="rounded-2xl bg-cream-50 gold-border p-8 mb-10 text-center">
              <p className="text-ink-soft italic">
                Hoje não há mensagem nova. Volta amanhã.
              </p>
            </div>
          )}

          {passadas.length > 0 && (
            <div>
              <p className="text-[10px] tracking-[0.3em] uppercase text-gold-600 mb-4 flex items-center gap-2">
                <CalendarDays className="w-3.5 h-3.5" /> Mensagens anteriores
              </p>
              <div className="space-y-3">
                {passadas.map((m) => (
                  <div
                    key={m.id}
                    className="rounded-xl bg-cream-50 gold-border p-5"
                  >
                    <p className="text-xs text-ink-faint mb-2">
                      {formatarData(m.data)}
                    </p>
                    {m.titulo && (
                      <p className="font-serif italic text-lg text-ink mb-2">
                        {m.titulo}
                      </p>
                    )}
                    <p className="text-sm text-ink-soft leading-relaxed line-clamp-3">
                      {m.mensagem}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
