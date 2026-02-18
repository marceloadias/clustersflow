# Agent Execution Plan v1 — Modos, Frequências, Budgets e Prioridades

## Objetivo
Definir como os agentes do Clusters Flow rodam sem:
- ficar caro (IA/CPU/IO)
- virar “autônomo demais” e causar overload
- derrubar o próprio sistema em picos (internos ou externos)

Este plano define:
- modos de execução (Always-On / Scheduled / On-Demand)
- frequências padrão e critérios mínimos de dados
- budgets de carga (CPU/RAM/queue) e budgets de custo (tokens/calls)
- ordem de prioridade em incidentes

---

## 1) Modos de Execução

### 1.1 Always-On (sempre ligado, porém ultra-leve)
**Regra:** só operações baratas + agregadas. Sem “loop de logs”.
- 28) Access Control Agent
- 29) Abuse Protection Agent
- 30) Secrets Vault Agent
- 13) Provider Health & Auto-Routing Agent (ping leve)
- 14) Connectors Agent (somente health/token refresh quando necessário)
- 43) API Usage Metering Agent (agregação 1–5 min)

**Proibido no Always-On:**
- IA pesada, scraping, análises longas, varreduras amplas, “rebuild” repetido

---

### 1.2 Scheduled (agenda fixa, com janelas e cooldown)
Roda em janelas controladas e deve respeitar:
- cool-down por cluster/projeto
- fairness scheduler (round-robin + aging)
- budgets de carga e de custo

Exemplos de Scheduled:
- 10) Auditor Agent
- 15) Data Quality Agent
- 16) Metrics History / Data Lake Agent
- 20) Sitemap/Indexing Agent
- 26) Backup/DR Agent
- 31) Security Audit Agent
- 21) Bibliotecário Agent

---

### 1.3 On-Demand (somente por gatilho real)
Roda apenas quando:
- ocorreu evento relevante OU
- usuário/admin solicitou explicitamente

Exemplos de On-Demand:
- 11) Trends Agent (precisa dados mínimos)
- 12) Incident Response Agent (apenas quando incidente “critical” abrir)
- 08) Experiment Manager (quando cluster elegível)
- 09) Optimizer (Recovery/Extreme e dentro do gate)
- 24) Template QA Agent (pré-promote / template novo)
- 39/40/41) Ads Analysts (apenas com integração ativa + volume mínimo)
- 33–38) Suporte/CS/KB (por ticket, sessão, rotina leve)

---

## 2) Frequências padrão (v1)

### 2.1 Monitoramento e estabilidade
- 13 Provider Health: a cada 2–5 min (ping leve); alert apenas em mudança de estado
- 43 Usage Metering: agregação a cada 1–5 min (sem evento por evento)
- 10 Auditor: a cada 15 min (leve) + 1x/dia (consolidado)

### 2.2 Dados
- 16 Data Lake Snapshots: 5 min (agregado) + 1h + diário
- 15 Data Quality: 1–6h (dependendo de volume)
- 17 Attribution: 1x/dia ou pós-promote/experimento (janela curta)

### 2.3 Release/Indexação
- 20 Sitemap/Indexing: 1x/dia + “run” imediato após promote/retire

### 2.4 Segurança/Operação
- 31 Security Audit: semanal
- 26 Backup: diário + restore drill semanal (leve)

### 2.5 Estratégia
- 21 Bibliotecário: semanal (plano e bibliotecas)

### 2.6 Paid Media (quando habilitado)
- 39 Google Ads Analyst: 1x/dia (ou 2x/dia) com volume mínimo
- 40 Microsoft Ads Analyst: 1x/dia com volume mínimo
- 41 Meta Business Analyst: 1x/dia com volume mínimo

---

## 3) Critérios mínimos de dados (para permitir rodar)
Para evitar gasto sem retorno, um agente pode “pular” com status:
`skipped: insufficient_data`

Regras comuns:
- Trends (11): exige janela >= 7d e volume mínimo (ex.: GSC impressões >= 300 OU GA4 sessões >= 100)
- Ads Analysts (39/40/41): exige integração ativa + gasto/volume mínimo (definido no scheduler policy)
- Attribution (17): exige promote/experiment recente OU volume mínimo

---

## 4) Budgets e Circuit Breakers (anti-overload)

### 4.1 Budgets de carga (infra)
- CPU > 85% por 10 min  → pausar Scheduled não-críticos
- CPU > 95% por 5 min   → só segurança + jobs do usuário (pipeline) continuam
- RAM > 90%             → pausar tarefas pesadas e varreduras
- Disk > 90%            → bloquear novos assets/outputs não essenciais; avisar admin
- queue_length acima do limite → pausar Trends/Bibliotecário/QA temporariamente

### 4.2 Budgets de custo (IA/API)
- limite diário por project_id:
  - tokens/calls por provider
  - custo máximo por job
- ao atingir budget:
  - permitir apenas: segurança + auditoria leve + jobs explicitamente solicitados pelo usuário (se permitido)

---

## 5) Priority Ladder (quem continua em crise)
1) Segurança: 28/29/30 (+32 quando ativado)
2) Estabilidade: 13 + 10 (leve) + 43 (agregado)
3) Entrega: pipeline base 01–06 sob demanda do usuário
4) Otimização: 07–09 e 08 (somente se gate permitir)
5) Estratégia: 11/21/24/27 e Ads Analysts

---

## 6) Notas de Guardrails (imutáveis)
- Nenhum agente aplica mudanças globais destrutivas.
- Ações em produção devem passar por: validação → diff → promote com auditoria.
- Agentes de suporte não têm acesso a segredos; apenas referências e diagnósticos.
