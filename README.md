# eSystem Apoio — Template

Plataforma de apoio ao dia a dia. Uma caixa de ferramentas viva onde quem entra vai buscar o que precisa naquele momento — sem jornada linear, sem estações.

Base para o eSystem tipo "Apoio ao Negócio do Profissional" do eFounder.

**Stack:** Next.js 16 · Supabase (auth, DB, storage) · Tailwind CSS · TypeScript

## As 4 peças (ativas por config)

A mentora escolhe quais peças ativa em `lib/config.ts` — o dashboard mostra só as ativas:

- **Mensagem do Dia** — 1 mensagem por dia da mentora com tarefa concreta (voz à entrada)
- **Repositório de Ferramentas** — biblioteca pesquisável com filtros (jogos, dinâmicas, guiões)
- **Templates Editáveis** — formulários que quem entra preenche e guarda (orçamentos, propostas, guiões)
- **Casos Guardados** — biblioteca privada de casos por utilizador, com filtros e notas

## Para a aluna/utilizador

- Login estilo eFounder — chapéu da marca-mãe, nome grande em serif itálico
- Dashboard com as peças ativas em cards (não há jornada, não há "próximo passo")

## Para a mentora (`/admin`)

- Gerir utilizadores
- CRUD para cada peça ativa (mensagens, ferramentas, templates, casos)

## Quick start (feito pela skill)

A skill `/esystem-apoio` faz tudo — clona este template, patcha textos, ativa peças, arranca. Se preferires manual:

```bash
npm install
cp .env.example .env.local
# preenche .env.local
npm run dev
```

Abre <http://localhost:3000>.

## Setup Supabase manual

1. Cria projeto em [supabase.com](https://supabase.com)
2. **Settings → API Keys** — copia Project URL, `anon` public, `service_role` secret
3. **SQL Editor** → cola `db/schema.sql`
4. **Storage** → cria bucket `materiais` (público)

## Deploy

```bash
vercel deploy --prod
```

E adiciona as env vars no Vercel Dashboard.
