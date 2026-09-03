import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";
import { requerMentora } from "@/lib/auth";
import { getTodasMensagens } from "@/lib/data/pecas/mensagens";
import { formatarData } from "@/lib/utils";

export const metadata = { title: "Gerir mensagens" };

export default async function AdminMensagensPage() {
  await requerMentora();
  const mensagens = await getTodasMensagens();

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
              Mensagens do dia
            </h1>
          </div>

          <div className="rounded-2xl bg-cream-50 gold-border p-6 mb-6">
            <p className="text-sm text-ink-soft leading-relaxed">
              Cria as mensagens diretamente no Supabase (Table Editor → tabela
              <code className="mx-1 px-1.5 py-0.5 rounded bg-gold-100 text-gold-800 text-xs font-mono">mensagens_dia</code>)
              ou pede ao Claude Code:
            </p>
            <pre className="mt-3 p-3 rounded-lg bg-code-bg text-code-fg text-xs font-mono overflow-x-auto" style={{ background: "#524A3E", color: "#F0E7D1" }}>
{`Insere uma mensagem do dia para amanhã (${new Date(Date.now() + 86400000).toISOString().split("T")[0]}) no meu Supabase. Título: "..." Mensagem: "..." Tarefa: "..."`}
            </pre>
          </div>

          {mensagens.length === 0 ? (
            <p className="text-center text-ink-soft py-10 italic">
              Ainda não há mensagens.
            </p>
          ) : (
            <div className="space-y-3">
              {mensagens.map((m) => (
                <div
                  key={m.id}
                  className="rounded-xl bg-cream-50 gold-border p-5"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="text-xs text-ink-faint mb-1">
                        {formatarData(m.data)}
                      </p>
                      {m.titulo && (
                        <p className="font-serif italic text-lg text-ink">
                          {m.titulo}
                        </p>
                      )}
                    </div>
                    <span
                      className={`text-[9px] tracking-[0.14em] uppercase px-2 py-0.5 rounded-full ${
                        m.publicada
                          ? "bg-success/10 text-success"
                          : "bg-ink-faint/10 text-ink-faint"
                      }`}
                    >
                      {m.publicada ? "Publicada" : "Rascunho"}
                    </span>
                  </div>
                  <p className="text-sm text-ink-soft leading-relaxed line-clamp-2">
                    {m.mensagem}
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
