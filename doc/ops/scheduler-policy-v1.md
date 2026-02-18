# Scheduler Policy v1 — Fairness, Gates, Cooldowns e Anti-Dogpile

## Objetivo
Definir a política do Scheduler do Clusters Flow para:
- ser justo entre projetos/clusters (fair scheduling)
- respeitar gates (warmup, elegibilidade, cooldown)
- impedir dogpile (vários jobs competindo pelo mesmo recurso)
- limitar custo e carga automaticamente

---

## 1) Tipos de fila
- queue:user_jobs (criação/edição solicitada pelo usuário)
- queue:scheduled (auditorias, snapshots, backups)
- queue:on_demand (incidentes, trends, ads analysis, QA sob gatilho)
- queue:admin (ações administrativas controladas)

**Regra:** sempre priorizar `user_jobs` (com limites) para não travar o produto.

---

## 2) Fair Scheduler (round-robin + aging)
### 2.1 Unidades de fairness
- Primário: `project_id`
- Secundário: `cluster_id`

### 2.2 Algoritmo (conceitual)
- Round-robin entre projetos elegíveis
- Aging: projetos que esperam mais tempo ganham prioridade progressiva
- Cooldown: após executar um job “pesado” para um cluster, impor cooldown

---

## 3) Gates (condições para rodar)
### 3.1 Update Cycle Gate (projeto)
- updates_enabled=true
- projeto online (Production)
- warmup mínimo (48–72h OU thresholds de dados)
- somente 1 projeto executa update cycle por vez (single-project updates)

### 3.2 Cluster Gate
- update_eligible=true (após warmup e dados mínimos)
- cooldown_ok=true (ex.: 72h após promote/optimizer)
- health_ok=true (sem incident critical aberto)

### 3.3 Data Gate (para agents data-driven)
- Trends/Ads/Attribution exigem volume mínimo (definir thresholds por integração)

---

## 4) Cooldowns (padrão v1)
- cluster promote → cooldown 72h (exceto hotfix)
- experiment winner promoted → cooldown 72h
- optimizer run (Recovery/Extreme) → cooldown 72h
- ads analysis → cooldown 12–24h por conta (evitar custo e repetição)
- bibliotecário → semanal

---

## 5) Anti-Dogpile (locks e dedupe)
- Lock por:
  - cache_key (build/refresh)
  - project_id (update cycle)
  - cluster_id (optimizer/experiments)
- Dedupe por:
  - job_fingerprint (mesmo input+mesma versão+mesmo alvo) em janela curta
- Backoff:
  - falha repetida → aumentar intervalo (ex.: 5m → 15m → 1h)

---

## 6) Budgets e auto-pauses
### 6.1 Circuit breakers (infra)
- CPU/RAM/Disk/queue acima do limite → pausar scheduled/on_demand não críticos

### 6.2 Budget financeiro (IA/API)
- budget diário por project_id e por key_origin (internal vs external)
- ao atingir:
  - bloquear agents de estratégia (trends/ads/bibliotecário/qa)
  - permitir apenas: segurança + auditor leve + jobs do usuário (se permitido)

---

## 7) Política de Ads Analysis (Google/Bing/Meta)
Rodar Ads Analysts somente se:
- integração ativa e saudável
- volume mínimo (exemplos):
  - Google Ads: gasto >= X/dia OU cliques >= Y/dia
  - Bing Ads: gasto/cliques >= limiar
  - Meta: gasto >= X/dia OU eventos >= Y
- caso contrário:
  - gerar “skipped: insufficient_volume” (sem custo)

---

## 8) Política de API Keys (internal vs external)
- Toda execução deve ter:
  - key_origin: customer_external | clustersflow_internal
  - billing_mode: customer_pays_direct | clustersflow_credits
- Jobs nunca podem “trocar” origem automaticamente.
- Support agents não podem ler secrets; apenas status/refs.

---

## 9) Notas de Guardrails (imutáveis)
- Nenhum agente aplica mudanças globais destrutivas.
- Ações em produção devem passar por: validação → diff → promote com auditoria.
- Agentes de suporte não têm acesso a segredos; apenas referências e diagnósticos.
