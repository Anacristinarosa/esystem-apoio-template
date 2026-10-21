-- ============================================================
-- Schema da plataforma eSystem Apoio
-- Cola no SQL Editor do Supabase e corre uma vez.
-- Cria as tabelas de todas as 4 peças possíveis + RLS.
-- ============================================================

-- ─────────────── PEÇA 1: MENSAGEM DO DIA ───────────────

create table if not exists public.mensagens_dia (
  id uuid primary key default gen_random_uuid(),
  data date not null unique,
  titulo text,
  mensagem text not null,
  tarefa text,
  publicada boolean not null default true,
  criada_em timestamptz not null default now()
);

create index if not exists idx_mensagens_data on public.mensagens_dia(data);

alter table public.mensagens_dia enable row level security;

create policy "Utilizadores autenticados leem mensagens publicadas"
  on public.mensagens_dia for select
  using (auth.role() = 'authenticated' and publicada = true);

-- ─────────────── PEÇA 2: FERRAMENTAS ───────────────

create table if not exists public.ferramentas (
  id uuid primary key default gen_random_uuid(),
  titulo text not null,
  descricao text,
  categoria text,
  duracao_minutos integer,
  material_url text,
  publicada boolean not null default true,
  criada_em timestamptz not null default now()
);

create index if not exists idx_ferramentas_categoria on public.ferramentas(categoria);

alter table public.ferramentas enable row level security;

create policy "Utilizadores autenticados leem ferramentas publicadas"
  on public.ferramentas for select
  using (auth.role() = 'authenticated' and publicada = true);

-- ─────────────── PEÇA 3: TEMPLATES ───────────────

create table if not exists public.templates (
  id uuid primary key default gen_random_uuid(),
  titulo text not null,
  descricao text,
  campos jsonb not null default '[]'::jsonb,
  publicado boolean not null default true,
  criado_em timestamptz not null default now()
);

create table if not exists public.templates_preenchidos (
  id uuid primary key default gen_random_uuid(),
  template_id uuid not null references public.templates(id) on delete cascade,
  utilizador_id uuid not null references auth.users(id) on delete cascade,
  titulo text not null,
  valores jsonb not null default '{}'::jsonb,
  criado_em timestamptz not null default now(),
  atualizado_em timestamptz not null default now()
);

create index if not exists idx_preenchidos_utilizador on public.templates_preenchidos(utilizador_id);

alter table public.templates enable row level security;
alter table public.templates_preenchidos enable row level security;

create policy "Utilizadores autenticados leem templates publicados"
  on public.templates for select
  using (auth.role() = 'authenticated' and publicado = true);

create policy "Cada utilizador vê os próprios preenchidos"
  on public.templates_preenchidos for select
  using (auth.uid() = utilizador_id);

create policy "Cada utilizador cria os próprios preenchidos"
  on public.templates_preenchidos for insert
  with check (auth.uid() = utilizador_id);

create policy "Cada utilizador atualiza os próprios preenchidos"
  on public.templates_preenchidos for update
  using (auth.uid() = utilizador_id)
  with check (auth.uid() = utilizador_id);

create policy "Cada utilizador apaga os próprios preenchidos"
  on public.templates_preenchidos for delete
  using (auth.uid() = utilizador_id);

-- ─────────────── PEÇA 4: CASOS ───────────────

create table if not exists public.casos (
  id uuid primary key default gen_random_uuid(),
  utilizador_id uuid not null references auth.users(id) on delete cascade,
  titulo text not null,
  descricao text,
  notas text,
  tags text[] not null default '{}',
  criado_em timestamptz not null default now(),
  atualizado_em timestamptz not null default now()
);

create index if not exists idx_casos_utilizador on public.casos(utilizador_id);
create index if not exists idx_casos_tags on public.casos using gin(tags);

alter table public.casos enable row level security;

create policy "Cada utilizador vê os próprios casos"
  on public.casos for select
  using (auth.uid() = utilizador_id);

create policy "Cada utilizador cria os próprios casos"
  on public.casos for insert
  with check (auth.uid() = utilizador_id);

create policy "Cada utilizador atualiza os próprios casos"
  on public.casos for update
  using (auth.uid() = utilizador_id)
  with check (auth.uid() = utilizador_id);

create policy "Cada utilizador apaga os próprios casos"
  on public.casos for delete
  using (auth.uid() = utilizador_id);

-- ─────────────── VIEW PARA O PAINEL DA MENTORA ───────────────
-- (a mentora acede como utilizador normal; a proteção é feita
-- no /admin da app via NEXT_PUBLIC_MENTORA_EMAIL)

create or replace view public.utilizadores_view as
select
  u.id,
  u.email,
  (u.raw_user_meta_data ->> 'nome') as nome,
  u.created_at as criada_em,
  u.last_sign_in_at as ultima_entrada
from auth.users u
order by u.created_at desc;

-- Supabase, desde 30/10/2026: as tabelas novas já não recebem permissões sozinhas.
-- Estas linhas repõem o comportamento de antes (a proteção continua a ser feita pelo RLS de cada tabela).
grant usage on schema public to anon, authenticated, service_role;
grant all on all tables in schema public to anon, authenticated, service_role;
grant all on all sequences in schema public to anon, authenticated, service_role;
grant all on all routines in schema public to anon, authenticated, service_role;
alter default privileges in schema public grant all on tables to anon, authenticated, service_role;
alter default privileges in schema public grant all on sequences to anon, authenticated, service_role;
alter default privileges in schema public grant all on routines to anon, authenticated, service_role;
