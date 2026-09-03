import Link from "next/link";
import { Sun, Wrench, FileEdit, FolderOpen } from "lucide-react";
import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";
import { PLATAFORMA, type PecaKey } from "@/lib/config";
import { requerUtilizador } from "@/lib/auth";

export const metadata = { title: "Dashboard" };

interface PecaCard {
  key: PecaKey;
  href: string;
  icone: typeof Sun;
  descricao: string;
}

const CARDS: PecaCard[] = [
  {
    key: "mensagemDia",
    href: "/mensagem",
    icone: Sun,
    descricao: "A mensagem de hoje e a tarefa concreta.",
  },
  {
    key: "repositorio",
    href: "/ferramentas",
    icone: Wrench,
    descricao: "Biblioteca pesquisável — vai buscar o que precisas.",
  },
  {
    key: "templates",
    href: "/templates",
    icone: FileEdit,
    descricao: "Formulários que preenches, guardas e voltas.",
  },
  {
    key: "casos",
    href: "/casos",
    icone: FolderOpen,
    descricao: "A tua biblioteca privada de casos.",
  },
];

export default async function DashboardPage() {
  const user = await requerUtilizador();
  const cardsAtivos = CARDS.filter((c) => PLATAFORMA.pecas[c.key]);

  const nome =
    (user.user_metadata as { nome?: string })?.nome ??
    user.email?.split("@")[0] ??
    "olá";

  return (
    <div className="min-h-screen flex flex-col">
      <Nav autenticado />
      <main className="flex-1">
        <div className="max-w-4xl mx-auto px-6 py-12">
          <div className="mb-10 text-center">
            <div className="flex items-center justify-center gap-3 mb-3">
              <div className="w-8 gold-divider" />
              <p className="text-[10px] tracking-[0.3em] uppercase text-gold-600">
                Olá, {nome}
              </p>
              <div className="w-8 gold-divider" />
            </div>
            <h1 className="font-serif italic text-3xl sm:text-4xl gold-text-rich">
              {PLATAFORMA.nome}
            </h1>
          </div>

          {cardsAtivos.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-ink-soft">
                A tua caixa de ferramentas está a ser preparada.
              </p>
            </div>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2">
              {cardsAtivos.map((c) => {
                const Icone = c.icone;
                return (
                  <Link
                    key={c.key}
                    href={c.href}
                    className="group block rounded-2xl bg-cream-50 gold-border-rich gold-shadow gold-glow-hover p-6 transition-all"
                  >
                    <div className="w-11 h-11 rounded-full bg-gold-foil gold-shadow flex items-center justify-center mb-4">
                      <Icone className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="font-serif italic text-2xl gold-text-rich mb-2">
                      {PLATAFORMA.labels[c.key]}
                    </h3>
                    <p className="text-sm text-ink-soft leading-relaxed">
                      {c.descricao}
                    </p>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
