"use client";

import { useTransition } from "react";
import { Trash2 } from "lucide-react";
import { apagarPreenchido } from "@/app/templates/actions";

export function ApagarPreenchidoBtn({ id }: { id: string }) {
  const [aApagar, setAApagar] = useTransition();

  return (
    <button
      type="button"
      onClick={() => {
        if (!confirm("Apagar este preenchimento?")) return;
        setAApagar(async () => {
          await apagarPreenchido(id);
        });
      }}
      className="inline-flex items-center gap-2 text-xs text-ink-soft hover:text-red-600 transition-colors"
      disabled={aApagar}
    >
      <Trash2 className="w-3.5 h-3.5" />
      {aApagar ? "A apagar..." : "Apagar"}
    </button>
  );
}
