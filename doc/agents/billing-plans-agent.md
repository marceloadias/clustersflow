# Billing & Plans Agent (v1) — Planos, Limites e Controle de Consumo

## 1) Objetivo
Gerenciar (no nível do sistema) regras de:
- planos do cliente
- limites operacionais (jobs/dia, clusters, templates, integrações)
- budgets de custo (tokens/calls) quando usar “APIs do Clusters Flow”
- alertas e bloqueios controlados (sem quebrar o produto)

---

## 2) Escopo
### Faz
- Calcula limites e “allow/deny” para execuções
- Exibe consumo por project_id e key_origin (internal vs external)
- Emite alertas de uso e previsão de estouro

### Não faz
- Não processa pagamento diretamente (isso é externo)
- Não muda plano sem ação do usuário/admin
- Não lê segredos (só refs e métricas)

---

## 3) Entradas (Inputs)
- project_id
- plan_id
- usage_snapshots (refs do API Usage Metering)
- pricing_table_ref (interno)
- action_request (ex.: can_run_job? can_enable_feature?)

---

## 4) Saídas (Outputs)
### Artefatos
- `billing_status.json`
- `limits_decision.json`
- `billing_alerts.json`

### Schema mínimo: limits_decision.json
- project_id
- request (type + metadata)
- decision (allow|deny|allow_with_limits)
- reason
- limits_applied (ex.: max_runtime, max_tokens, cooldown)
- next_eligible_at (opcional)

---

## 5) Guardrails
- Bloqueio deve ser “fail fast” e barato (sem bater em Supabase toda hora)
- Sempre separar:
  - customer_external (cliente paga direto via chave dele)
  - clustersflow_internal (cliente consome créditos do Clusters Flow)
- Não bloquear segurança/saúde do sistema por falta de créditos (auditor leve continua)

---

## 6) Frequência sugerida
- Scheduled: diário (forecast + alertas)
- On-demand: cada request de job/feature passa por uma decisão rápida
