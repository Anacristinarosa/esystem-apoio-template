// ============================================================
// CONFIGURAÇÃO DA TUA PLATAFORMA
// ------------------------------------------------------------
// A skill /esystem-apoio preenche isto a partir do teu
// desenho da Missão 2 (ou perguntando-te ali mesmo).
// Edita à mão sempre que quiseres afinar textos.
// ============================================================

export const PLATAFORMA = {
  /** Nome que aparece no topo, no separador do browser e como título grande no login */
  nome: "eSystem",

  /** Iniciais (1-3 letras) para o logo pequeno */
  iniciais: "eS",

  /** Marca-mãe (chapéu pequeno acima do nome grande no login) — deixa string vazia para esconder */
  marcaMae: "A MINHA ESCOLA",

  /** Frase-âncora — aparece na landing pública, no primeiro ecrã */
  fraseAncora: "A tua caixa de ferramentas, sempre à mão.",

  /** Subtítulo curto — aparece na landing por baixo da frase-âncora */
  subtitulo: "Uma peça para cada momento — vais buscar o que precisas e sais.",

  /** Nome de quem tu és — a mentora/profissional atrás da plataforma */
  mentora: {
    nome: "A Mentora",
    email: "tu@teudominio.pt",
  },


  /**
   * As 4 peças possíveis desta plataforma. Ativa só as que fazem sentido para
   * o teu negócio — o dashboard mostra só as ativas. A skill /esystem-apoio
   * preenche isto contigo com base no que precisas.
   */
  pecas: {
    /** 1 mensagem por dia com tarefa concreta (voz da mentora à entrada) */
    mensagemDia: true,
    /** Biblioteca pesquisável de ferramentas (jogos, dinâmicas, guiões) */
    repositorio: false,
    /** Formulários que quem entra preenche, guarda e volta (orçamentos, propostas) */
    templates: false,
    /** Biblioteca privada de casos com filtros por tag */
    casos: false,
  },

  /**
   * Nomes que aparecem no dashboard para cada peça. Personaliza pela tua voz.
   */
  labels: {
    mensagemDia: "A mensagem de hoje",
    repositorio: "Ferramentas",
    templates: "Templates",
    casos: "Os meus casos",
  },
} as const;

export type PecaKey = keyof typeof PLATAFORMA.pecas;
