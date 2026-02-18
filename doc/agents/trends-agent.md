# Trends Agent (v1) — Tendências & Oportunidades

## 1) Objetivo
Detectar **sinais de tendência e oportunidade** (mudança de intenção, novos termos, comportamento de usuário)
e sugerir ações futuras (experimentos/otimização), sempre com evidência.

**Regra de ouro:** não caça bug. Não faz auditoria de saúde do sistema.

---

## 2) Escopo (o que faz / não faz)
### Faz
- Identifica “sinais” em GSC/GA4/GTM/Bing/Clarity
- Gera “cards” de oportunidade (hipótese + evidência)
- Sugere candidatos a experimentos/optimizer (quando elegível)

### Não faz
- Não executa experimento
- Não altera conteúdo/HTML
- Não promove versão
- Não roda em cluster sem dados mínimos (economia)

---

## 3) Entradas (Inputs)
### 3.1 Obrigatórios (quando disponíveis)
- GSC: queries novas, CTR/posições, páginas com ganho/perda
- GA4: sessões, conversões, CVR, segmentos
- GTM: eventos de CTA, scroll-depth, form submits
- Clarity: scroll/click maps, rage clicks, dead clicks, abandonos
- Bing WMT: impressões/cliques/CTR (se ativado)

### 3.2 Internos de apoio
- Score Engine + histórico (para contextualizar qualidade)
- Experiments/Optimizer history (para evitar repetir hipóteses)
- Update Cycle Gate (eligibilidade/cooldown)

---

## 4) Saídas (Outputs)
### 4.1 Artefatos
- `trend_brief.md`
- `opportunity_cards.json`
- `experiment_candidates.json`

### 4.2 Estrutura (Schema)
#### opportunity_cards.json
- card_id (string)
- project_id (string)
- cluster_id (string|null)
- page_id ("LP"|"ELP"|null)
- signal_type ("new_query"|"ctr_drop"|"ctr_gain"|"position_shift"|"segment_change"|"clarity_issue"|"new_competitor_pattern")
- evidence (array {source, metric, delta, window, sample_size})
- hypothesis (string curta)
- suggested_action ("experiment"|"optimizer"|"content_adjustment"|"ux_adjustment"|"tracking_check")
- expected_impact ("low"|"medium"|"high")
- constraints (array strings)
- created_at (ISO)

#### experiment_candidates.json
- candidate_id (string)
- target (project_id/cluster_id/page_id)
- why_now (string)
- guardrails (array strings)
- requires_eligibility (true)
- eligibility_snapshot (obj com flags: update_eligible, cooldown_ok, traffic_ok, score_ok)

---

## 5) Regras de economia (anti-custo)
O Trends Agent só roda se:
- projeto tem integrações ativas (GSC/GA4/GTM etc) E
- existe dados mínimos na janela (ex.: 7d ou 28d) E
- cluster tem tráfego mínimo OU está marcado como “monitorável”

Caso contrário:
- gera apenas `trend_brief.md` vazio com “sem dados suficientes” (barato).

---

## 6) Sinais (heurísticas v1)
### GSC
- new_query: query com crescimento e sem histórico relevante (últimos 28d)
- ctr_drop: queda de CTR relevante com volume (impressões mínimas)
- position_shift: mudança de posição média relevante (ganho/perda)

### GA4/GTM
- segment_change: mudança de conversão por dispositivo/localidade/canal
- funnel_break: queda em evento-chave (cta_click → form_submit)

### Clarity
- clarity_issue: rage clicks/dead clicks concentrados em dobra/elemento
- scroll_drop: queda abrupta de scroll antes do CTA principal

---

## 7) Eventos gerados (Engine)
- trends.run.started
- trends.run.completed
- trends.opportunity.created (somente em mudança real)
- trends.candidate.created

---

## 8) Guardrails imutáveis
- Não aplicar mudança automaticamente
- Respeitar Update Cycle Gate + cooldown por cluster
- Isolamento por project_id/cluster_id
- Nenhuma ação global
- “Experiment candidates” só se score/traffic/eligibility estiverem OK
