"use client";

import { useState, useTransition } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { criarPreenchido, atualizarPreenchido } from "@/app/templates/actions";
import type { TemplateEditavel, TemplatePreenchido } from "@/lib/data/pecas/templates";

interface Props {
  template: TemplateEditavel;
  preenchido?: TemplatePreenchido;
}

export function PreencherTemplateForm({ template, preenchido }: Props) {
  const [titulo, setTitulo] = useState(preenchido?.titulo ?? template.titulo);
  const [valores, setValores] = useState<Record<string, string>>(
    preenchido?.valores ?? {},
  );
  const [aGravar, setAGravar] = useTransition();
  const [msg, setMsg] = useState<string | null>(null);

  function atualizar(nome: string, valor: string) {
    setValores((v) => ({ ...v, [nome]: valor }));
  }

  async function submeter(e: React.FormEvent) {
    e.preventDefault();
    setMsg(null);
    setAGravar(async () => {
      try {
        if (preenchido) {
          await atualizarPreenchido(preenchido.id, titulo, valores);
          setMsg("Guardado.");
        } else {
          await criarPreenchido(template.id, titulo, valores);
        }
      } catch (err) {
        setMsg(err instanceof Error ? err.message : "Erro a guardar.");
      }
    });
  }

  const campos = Array.isArray(template.campos) ? template.campos : [];

  return (
    <form onSubmit={submeter} className="space-y-6">
      <Input
        id="titulo"
        label="Título do preenchimento"
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
        required
      />

      {campos.map((c) => {
        const nome = (c as unknown as { nome: string }).nome ?? c.id;
        const valor = valores[nome] ?? "";
        if (c.tipo === "textarea") {
          return (
            <div key={nome} className="w-full">
              <label
                htmlFor={nome}
                className="block text-[10px] tracking-[0.3em] uppercase text-gold-700 mb-2"
              >
                {c.label}
              </label>
              <textarea
                id={nome}
                value={valor}
                onChange={(e) => atualizar(nome, e.target.value)}
                rows={4}
                className="w-full px-4 py-3 rounded-md bg-cream-50 gold-border text-ink placeholder:text-ink-faint focus:outline-none focus:ring-2 focus:ring-gold-300 focus:border-gold-400 transition-all"
              />
            </div>
          );
        }
        return (
          <Input
            key={nome}
            id={nome}
            label={c.label}
            type={c.tipo === "numero" ? "number" : c.tipo === "data" ? "date" : "text"}
            value={valor}
            onChange={(e) => atualizar(nome, e.target.value)}
          />
        );
      })}

      <div className="flex items-center gap-3 pt-2">
        <Button type="submit" disabled={aGravar}>
          {aGravar ? "A guardar..." : preenchido ? "Guardar alterações" : "Guardar preenchimento"}
        </Button>
        {msg && <p className="text-xs text-ink-soft">{msg}</p>}
      </div>
    </form>
  );
}
