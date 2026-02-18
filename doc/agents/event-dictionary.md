# Event Dictionary (v1) — Clusters Flow

## 1) Objetivo
Padronizar nomes e payload mínimo de eventos emitidos pelo Engine para:
- Auditor Agent
- Trends Agent
- WebPanel (UI, alertas, histórico)
- Logs/Supabase (auditoria sem spam)

**Regra:** eventos devem ser baratos. Evitar payload grande.

---

## 2) Convenções
- Nome: `dominio.subdominio.acao` (snake não; usar dot-case)
- Sempre incluir:
  - event_id (uuid/string)
  - occurred_at (ISO)
  - project_id
  - cluster_id (opcional)
  - actor ("system"|"agent:auditor"|"agent:trends"|"admin"|"user")
  - severity ("info"|"warn"|"critical") quando aplicável
  - dedupe_key (string) para evitar spam

---

## 3) Lista de Eventos (mínimo v1)

### 3.1 Auditor Agent
- `audit.run.started`
- `audit.run.completed`
- `audit.alert.raised`
- `audit.alert.cleared`
- `audit.recommendation.created`

Payload recomendado:
- category ("jobs"|"cache"|"providers"|"score"|"infra"|"sse")
- title
- evidence_refs[] (ids/refs curtos, sem dumps)
- threshold_ref (ex.: "cache.miss_rate.critical")
- cooldown_until (ISO)
- state ("open"|"closed") quando aplicável

---

### 3.2 Trends Agent
- `trends.run.started`
- `trends.run.completed`
- `trends.opportunity.created`
- `trends.opportunity.closed`
- `trends.candidate.created`

Payload recomendado:
- signal_type ("new_query"|"ctr_drop"|"ctr_gain"|"position_shift"|"segment_change"|"clarity_issue")
- hypothesis
- evidence_refs[] (refs curtos)
- expected_impact ("low"|"medium"|"high")
- constraints[] (strings curtas)

---

### 3.3 Engine / Jobs / Cache (apoio)
- `jobs.created`
- `jobs.started`
- `jobs.completed`
- `jobs.failed`
- `jobs.cancelled`

- `cache.hit`
- `cache.miss`
- `cache.build.started`
- `cache.build.completed`
- `cache.invalidate`
- `cache.purge`

- `providers.health.changed`
- `providers.fallback.used`

- `sse.stream.connected`
- `sse.stream.disconnected`

**Nota:** para eventos de alta frequência (cache.hit/miss) registrar somente agregados (ver Baseline Metrics).

---

## 4) Dedupe / Anti-spam
- `dedupe_key` obrigatório para:
  - audit.alert.raised / cleared
  - trends.opportunity.created / closed

Formato sugerido:
`{event_name}:{project_id}:{cluster_id|all}:{category|signal_type}:{primary_metric}`

Exemplo:
`audit.alert.raised:proj_123:cluster_9:cache:miss_rate`

---

## 5) Auditoria obrigatória (somente mudanças de estado)
- Somente registrar em `admin_actions_log` quando:
  - alert abriu/fechou
  - provider mudou status
  - recommendation/candidate foi criado
