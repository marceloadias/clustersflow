# Auditor Agent (v1) — Auditoria & Saúde do Sistema

## 1) Objetivo
Detectar **problemas reais e atuais** no Clusters Flow com base em evidência:
- regressões de performance operacional (fila/jobs/locks)
- instabilidade de cache (miss alto, rebuild loop, dogpile)
- degradação de providers/modelos (health + fallback)
- regressão de score (regras determinísticas)
- gargalos de infra (CPU/RAM/Disk) e streaming (SSE)

**Regra de ouro:** sem “tendências” e sem opinião. Apenas diagnóstico com evidência e impacto.

---

## 2) Escopo (o que faz / não faz)
### Faz
- Auditoria recorrente por `project_id` e/ou `cluster_id`
- Gera alertas com severidade e cooldown
- Recomenda ações como “propostas” (sem executar)

### Não faz
- Não roda otimização/experimentos automaticamente
- Não promove versões (Draft/Preview/Production)
- Não altera nada globalmente
- Não depende de IA (deve ser majoritariamente determinístico)

---

## 3) Entradas (Inputs)
### 3.1 Dados internos (obrigatórios)
- Jobs/Queue: status, duração, retries, timeouts, cancelamentos
- Locks: TTL expirando, lock preso, concorrência indevida
- Page Cache: hit/miss, builds, invalidations, purge events, TTL
- Provider Health: active/degraded/deprecated/missing + eventos de fallback
- Score Engine (histórico): score por LP e explicação (why)
- Infra: CPU/RAM/Disk e limites operacionais
- SSE: quedas, reconnects, latência média

### 3.2 Dados externos (opcionais)
- GA4/GSC/GTM/Bing/Clarity (somente para confirmar impacto, não para “tendência”)

---

## 4) Saídas (Outputs)
### 4.1 Artefatos
- `audit_report.md`
- `alerts.json`
- `recommended_actions.json`

### 4.2 Estrutura (Schema)
#### alerts.json
- alert_id (string)
- project_id (string)
- cluster_id (string|null)
- severity ("info"|"warn"|"critical")
- category ("jobs"|"cache"|"providers"|"score"|"infra"|"sse")
- title (string)
- evidence (array de objetos {source, metric, value, threshold, window})
- impact (string curto)
- first_seen_at (ISO)
- last_seen_at (ISO)
- cooldown_until (ISO)
- suggested_next_step (string)

#### recommended_actions.json
- action_id (string)
- type ("suggest_investigation"|"suggest_invalidate_cache"|"suggest_rerun_job"|"suggest_provider_switch"|"suggest_optimizer_candidate"|"suggest_experiment_candidate")
- target (project_id/cluster_id/page_id)
- reason (string)
- guardrails (array de strings)
- requires_human_approval (true)

---

## 5) Thresholds (v1) — Padrões
> Tudo com “cooldown” para evitar spam.

### Jobs/Queue
- critical: taxa de falha > 8% em 2h OU > 15% em 24h
- warn: p95 duração job > 2.5x baseline 7d
- warn: retries médios > 2 por job (janela 6h)

### Locks
- critical: lock expirando repetidamente (>3 vezes em 30 min)
- warn: lock preso > TTL + 20%

### Cache
- critical: miss rate > 70% em 1h (com tráfego) OU rebuild loop detectado
- warn: invalidations repetidas no mesmo cluster (>5 em 1h)

### Providers
- critical: provider “missing” OU fallback acionando > 20% das runs em 1h
- warn: status “degraded” por > 30 min

### Score
- warn: queda de score >= 8 pontos em 72h
- critical: queda >= 15 pontos em 72h

### Infra
- warn: CPU > 85% por 10 min
- critical: CPU > 95% por 5 min
- warn: Disk > 80% / critical: > 90%
- warn: RAM > 85% / critical: > 95%

### SSE
- warn: disconnects > 10/min
- critical: stream indisponível > 3 min

---

## 6) Eventos gerados (Engine)
- audit.run.started
- audit.run.completed
- audit.alert.raised (somente em mudança de estado)
- audit.alert.cleared
- audit.recommendation.created

**Auditoria obrigatória:** todo alert/recommendation entra em `admin_actions_log` (somente registro, sem ação).

---

## 7) Frequência sugerida
- Infra/Queue/Providers: a cada 5–10 min
- Cache/Score regressão: a cada 30–60 min
- Relatório consolidado: 1x por dia por projeto

---

## 8) Guardrails imutáveis
- Isolamento por project_id/cluster_id
- Sem ações globais
- Sem auto-deploy
- Sem “inventar” correções: sempre evidência + threshold
