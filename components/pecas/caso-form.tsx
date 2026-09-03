"use client";

import { useState, useTransition } from "react";
import { Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { criarCaso, atualizarCaso, apagarCaso } from "@/app/casos/actions";
import type { Caso } from "@/lib/data/pecas/casos";

interface Props {
  caso?: Caso;
}

export function CasoForm({ caso }: Props) {
  const [titulo, setTitulo] = useState(caso?.titulo ?? "");
  const [descricao, setDescricao] = useState(caso?.descricao ?? "");
  const [notas, setNotas] = useState(caso?.notas ?? "");
  const [tagsRaw, setTagsRaw] = useState((caso?.tags ?? []).join(", "));
  const [aGravar, setAGravar] = useTransition();
  const [aApagar, setAApagar] = useTransition();
  const [msg, setMsg] = useState<string | null>(null);

  async function submeter(e: React.FormEvent) {
    e.preventDefault();
    setMsg(null);
    const tags = tagsRaw
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
    setAGravar(async () => {
      try {
        if (caso) {
          await atualizarCaso(caso.id, { titulo, descricao, notas, tags });
          setMsg("Guardado.");
        } else {
          await criarCaso({ titulo, descricao, notas, tags });
        }
      } catch (err) {
        setMsg(err instanceof Error ? err.message : "Erro a guardar.");
      }
    });
  }

  return (
    <form onSubmit={submeter} className="space-y-6">
      <Input
        id="titulo"
        label="Título"
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
        required
      />

      <div>
        <label
          htmlFor="descricao"
          className="block text-[10px] tracking-[0.3em] uppercase text-gold-700 mb-2"
        >
          Descrição
        </label>
        <textarea
          id="descricao"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          rows={3}
          className="w-full px-4 py-3 rounded-md bg-cream-50 gold-border text-ink placeholder:text-ink-faint focus:outline-none focus:ring-2 focus:ring-gold-300 focus:border-gold-400 transition-all"
        />
      </div>

      <div>
        <label
          htmlFor="notas"
          className="block text-[10px] tracking-[0.3em] uppercase text-gold-700 mb-2"
        >
          Notas
        </label>
        <textarea
          id="notas"
          value={notas}
          onChange={(e) => setNotas(e.target.value)}
          rows={8}
          className="w-full px-4 py-3 rounded-md bg-cream-50 gold-border text-ink placeholder:text-ink-faint focus:outline-none focus:ring-2 focus:ring-gold-300 focus:border-gold-400 transition-all"
        />
      </div>

      <Input
        id="tags"
        label="Tags (separadas por vírgulas)"
        value={tagsRaw}
        onChange={(e) => setTagsRaw(e.target.value)}
        placeholder="ex: cliente, projeto ativo, revisão"
      />

      <div className="flex items-center justify-between gap-3 pt-2">
        <div className="flex items-center gap-3">
          <Button type="submit" disabled={aGravar}>
            {aGravar ? "A guardar..." : caso ? "Guardar alterações" : "Criar caso"}
          </Button>
          {msg && <p className="text-xs text-ink-soft">{msg}</p>}
        </div>

        {caso && (
          <button
            type="button"
            onClick={() => {
              if (!confirm("Apagar este caso?")) return;
              setAApagar(async () => {
                await apagarCaso(caso.id);
              });
            }}
            disabled={aApagar}
            className="inline-flex items-center gap-2 text-xs text-ink-soft hover:text-red-600 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
            {aApagar ? "A apagar..." : "Apagar"}
          </button>
        )}
      </div>
    </form>
  );
}
