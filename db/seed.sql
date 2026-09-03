-- ============================================================
-- SEED de exemplo para a plataforma eSystem Apoio
-- ------------------------------------------------------------
-- Serve como amostra do que se pode criar em cada peça.
-- A skill /esystem-apoio corre isto uma vez, logo a seguir
-- ao schema.sql, para a founder poder navegar e apagar/editar.
-- Todas as inserções são idempotentes (não duplicam se correres duas vezes).
-- ============================================================

-- ─────────────── MENSAGENS DO DIA (3) ───────────────

insert into public.mensagens_dia (data, titulo, mensagem, tarefa, publicada) values
(current_date,
 'Abre o teu manual.',
 'Começas onde muitas ficaram presas. A tua caixa de ferramentas está pronta. Escolhe uma peça e mexe-lhe.',
 'Vai ao repositório e abre a primeira ferramenta que te chamar a atenção.',
 true),
(current_date + 1,
 'Escreve como falas.',
 'Ninguém quer o teu manual. Querem-te ouvir a ti. Se escreveres como falas, quem lê sente que estás na sala.',
 'Grava uma nota de voz de 60 segundos a explicar o teu método. Transcreve. Publica.',
 true),
(current_date + 2,
 'Fecha uma coisa.',
 'Não abras nada novo hoje. Fecha uma que já está a meio.',
 'Escolhe uma tarefa parada há mais de 3 dias e leva-a até ao fim.',
 true)
on conflict (data) do nothing;

-- ─────────────── FERRAMENTAS (3) ───────────────

insert into public.ferramentas (titulo, descricao, categoria, duracao_minutos, publicada)
select
  'Diagnóstico de posicionamento em 7 perguntas',
  'Um guião curto para percebes onde estás na tua mensagem. Fazes-te as 7 perguntas em sequência, escreves à mão, e no fim tens uma frase-síntese do teu posicionamento atual.',
  'Estratégia',
  20,
  true
where not exists (select 1 from public.ferramentas where titulo = 'Diagnóstico de posicionamento em 7 perguntas');

insert into public.ferramentas (titulo, descricao, categoria, duracao_minutos, publicada)
select
  'Guião de primeira mentoria 1:1',
  'A estrutura da primeira sessão com uma nova cliente. 4 blocos: contexto, objetivo, primeiro passo, combinado. Deixa espaço para ela falar mais do que tu.',
  'Facilitação',
  60,
  true
where not exists (select 1 from public.ferramentas where titulo = 'Guião de primeira mentoria 1:1');

insert into public.ferramentas (titulo, descricao, categoria, duracao_minutos, publicada)
select
  'Ritual de fecho de semana',
  'Sexta à tarde. 15 minutos. 3 perguntas: o que fechei, o que ficou aberto, o que decido para segunda. Escreves a decisão numa folha e deixas em cima da mesa.',
  'Ritmo',
  15,
  true
where not exists (select 1 from public.ferramentas where titulo = 'Ritual de fecho de semana');

-- ─────────────── TEMPLATES (3) ───────────────

insert into public.templates (titulo, descricao, campos, publicado)
select
  'Proposta de mentoria em 4 blocos',
  'Formulário curto para escreveres uma proposta de mentoria em ~10 minutos. Preenches, guardas, envias.',
  '[
    {"nome":"nome_cliente","label":"Nome da cliente","tipo":"texto"},
    {"nome":"objetivo","label":"Objetivo da mentoria (em 1 frase)","tipo":"textarea"},
    {"nome":"entregas","label":"O que ela leva no fim","tipo":"textarea"},
    {"nome":"investimento","label":"Investimento","tipo":"texto"}
  ]'::jsonb,
  true
where not exists (select 1 from public.templates where titulo = 'Proposta de mentoria em 4 blocos');

insert into public.templates (titulo, descricao, campos, publicado)
select
  'Guião de call de descoberta',
  'Estrutura para uma call de 30 minutos com uma potencial cliente. Preenches enquanto ela fala, guardas para reveres depois.',
  '[
    {"nome":"nome","label":"Nome","tipo":"texto"},
    {"nome":"contexto","label":"Contexto (em que ponto está)","tipo":"textarea"},
    {"nome":"dor","label":"Dor principal (nas palavras dela)","tipo":"textarea"},
    {"nome":"resultado","label":"Resultado que ela quer","tipo":"textarea"},
    {"nome":"proximo_passo","label":"Próximo passo combinado","tipo":"texto"}
  ]'::jsonb,
  true
where not exists (select 1 from public.templates where titulo = 'Guião de call de descoberta');

insert into public.templates (titulo, descricao, campos, publicado)
select
  'Retrospetiva mensal da founder',
  'Ficha para fazeres no último dia do mês. Escreves à vontade, guardas, tens histórico.',
  '[
    {"nome":"mes","label":"Mês","tipo":"texto"},
    {"nome":"vitorias","label":"3 vitórias","tipo":"textarea"},
    {"nome":"pedras","label":"3 pedras no caminho","tipo":"textarea"},
    {"nome":"aprendizagem","label":"A aprendizagem que fica","tipo":"textarea"},
    {"nome":"decisao","label":"Uma decisão para o próximo mês","tipo":"texto"}
  ]'::jsonb,
  true
where not exists (select 1 from public.templates where titulo = 'Retrospetiva mensal da founder');

-- Nota: a peça "Casos" é privada por utilizador (auth.uid()).
-- Não faz sentido semear casos genéricos — cada utilizador cria os seus
-- assim que entra pela primeira vez na peça.
