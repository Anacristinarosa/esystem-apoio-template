import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";
import { requerUtilizador } from "@/lib/auth";
import { PLATAFORMA } from "@/lib/config";
import { CasoForm } from "@/components/pecas/caso-form";

export const metadata = { title: "Novo caso" };

export default async function NovoCasoPage() {
  if (!PLATAFORMA.pecas.casos) notFound();
  await requerUtilizador();

  return (
    <div className="min-h-screen flex flex-col">
      <Nav autenticado />
      <main className="flex-1">
        <div className="max-w-2xl mx-auto px-6 py-10">
          <Link
            href="/casos"
            className="inline-flex items-center gap-2 text-sm text-gold-700 hover:text-gold-600 mb-10 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            Voltar
          </Link>

          <div className="mb-8">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 gold-divider" />
              <p className="text-[10px] tracking-[0.3em] uppercase text-gold-600">
                {PLATAFORMA.labels.casos}
              </p>
            </div>
            <h1 className="font-serif italic text-3xl sm:text-4xl gold-text-rich">
              Novo caso
            </h1>
          </div>

          <div className="rounded-2xl bg-cream-50 gold-border-rich gold-shadow p-6 sm:p-8">
            <CasoForm />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
