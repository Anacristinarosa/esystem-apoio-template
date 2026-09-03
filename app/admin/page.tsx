import Link from "next/link";
import { Users, Sun, Wrench, FileEdit, ArrowRight } from "lucide-react";
import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";
import { AdicionarAluna } from "@/components/admin/adicionar-aluna";
import { requerMentora } from "@/lib/auth";
import { getUtilizadores } from "@/lib/data/admin";
import { PLATAFORMA } from "@/lib/config";
import { formatarData } from "@/lib/utils";

export const metadata = { title: "Painel da mentora" };

export default async function AdminPage() {
  await requerMentora();
  const utilizadores = await getUtilizadores();

  const atalhos: {
    key: string;
    ativo: boolean;
    href: string;
    label: string;
    icone: typeof Sun;
  }[] = [
    {
      key: "mensagemDia",
      ativo: PLATAFORMA.pecas.mensagemDia,
      href: "/admin/mensagens",
      label: "Gerir mensagens do dia",
      icone: Sun,
    },
    {
      key: "repositorio",
      ativo: PLATAFORMA.pecas.repositorio,
      href: "/admin/ferramentas",
      label: "Gerir ferramentas",
      icone: Wrench,
    },
    {
      key: "templates",
      ativo: PLATAFORMA.pecas.templates,
      href: "/admin/templates",
      label: "Gerir templates",
      icone: FileEdit,
    },
  ];
  const atalhosAtivos = atalhos.filter((a) => a.ativo);

  return (
    <div className="min-h-screen flex flex-col">
      <Nav autenticado />
      <main className="flex-1">
        <div className="max-w-5xl mx-auto px-6 py-12">
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 gold-divider" />
              <p className="text-[10px] tracking-[0.3em] uppercase text-gold-600">
                Painel da mentora
              </p>
            </div>
            <h1 className="font-serif italic text-4xl sm:text-5xl gold-text-rich">
              {PLATAFORMA.nome}
            </h1>
          </div>

          {atalhosAtivos.length > 0 && (
            <div className="flex flex-wrap gap-3 mb-10">
              {atalhosAtivos.map((a) => {
                const Icone = a.icone;
                return (
                  <Link
                    key={a.key}
                    href={a.href}
                    className="inline-flex items-center gap-3 px-5 py-3 rounded-xl bg-cream-50 gold-border gold-shadow hover:bg-gold-50 transition-all group"
                  >
                    <Icone className="w-4 h-4 text-gold-600" />
                    <span className="text-sm font-medium text-ink">{a.label}</span>
                    <ArrowRight className="w-3 h-3 text-ink-faint group-hover:text-gold-700 transition-colors" />
                  </Link>
                );
              })}
            </div>
          )}

          <AdicionarAluna />

          <div className="rounded-2xl bg-cream-50 gold-border-rich gold-shadow overflow-hidden mt-10">
            <div className="px-6 py-4 border-b border-gold-200 flex items-center gap-3">
              <Users className="w-4 h-4 text-gold-600" />
              <p className="text-[10px] tracking-[0.3em] uppercase text-gold-700 font-medium">
                Utilizadores ({utilizadores.length})
              </p>
            </div>
            <table className="w-full">
              <thead className="border-b border-gold-200">
                <tr>
                  <th className="px-6 py-3 text-left text-[10px] tracking-[0.2em] uppercase text-gold-600 font-medium">
                    Nome
                  </th>
                  <th className="px-6 py-3 text-left text-[10px] tracking-[0.2em] uppercase text-gold-600 font-medium">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-[10px] tracking-[0.2em] uppercase text-gold-600 font-medium">
                    Registo
                  </th>
                  <th className="px-6 py-3 text-left text-[10px] tracking-[0.2em] uppercase text-gold-600 font-medium">
                    Última entrada
                  </th>
                </tr>
              </thead>
              <tbody>
                {utilizadores.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="text-center text-ink-soft py-10">
                      Ainda não tens utilizadores registados.
                    </td>
                  </tr>
                ) : (
                  utilizadores.map((u) => (
                    <tr
                      key={u.id}
                      className="border-b border-gold-100 last:border-0 hover:bg-gold-50/40 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <span className="font-serif italic text-lg text-ink">
                          {u.nome ?? "—"}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-ink-soft">{u.email}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-xs text-ink-faint">
                          {formatarData(u.criada_em)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-xs text-ink-faint">
                          {u.ultima_entrada ? formatarData(u.ultima_entrada) : "—"}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
