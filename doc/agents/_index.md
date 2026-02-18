# Agents Index — Clusters Flow

Este índice lista todos os agentes (01–45) com:
- **Modo padrão**: Always-On | Scheduled | On-Demand
- **Função**: 1 linha
- **Doc**: link para o contrato (quando existir)

> Notas de Guardrails (imutáveis)
- Nenhum agente aplica mudanças globais destrutivas.
- Ações em produção devem passar por: validação → diff → promote com auditoria.
- Agentes de suporte não têm acesso a segredos; apenas referências e diagnósticos.

---

## A) Núcleo de Produção (Pipeline Base 01–09)

| ID | Agente | Modo padrão | Função | Doc |
|---:|---|---|---|---|
| 01 | SEO Pack | On-Demand | Estrutura SEO/metadata/slug rules para a LP | (add) |
| 02 | Content Pack | On-Demand | Gera conteúdo e seções (LP/ELP) conforme regras | (add) |
| 03 | HTML Generator | On-Demand | Monta HTML/CSS final (template + conteúdo) | (add) |
| 04 | Validator / Guardrails | On-Demand | Valida regras ouro, mobile, links, tabelas, refs | (add) |
| 05 | Assets Pack | On-Demand | Baixa/otimiza/registries de mídia e manifest | (add) |
| 06 | Full Pipeline Orchestrator | On-Demand | Orquestra 01→05 como 1 job | (add) |
| 07 | Update Cycle | Scheduled | Coleta dados reais e gera plano de update por projeto | (add) |
| 08 | Experiment Manager | On-Demand | A/B controlado + rollout por % | (add) |
| 09 | Optimizer | On-Demand | Recovery/Extreme com diff e rollback | (add) |

---

## B) Autonomia & Observabilidade (10–13)

| ID | Agente | Modo padrão | Função | Doc |
|---:|---|---|---|---|
| 10 | Auditor Agent | Scheduled | Diagnostica saúde (jobs/cache/providers/infra/score) | (add) |
| 11 | Trends Agent | On-Demand | Detecta oportunidades (GSC/GA4/GTM/Clarity) | (add) |
| 12 | Incident Response Agent | On-Demand | Abre incident, RCA e plano de mitigação | `incident-response-agent.md` |
| 13 | Provider Health & Auto-Routing | Always-On | Ping/health dos providers + fallback | (add) |

---

## C) Dados & Integrações (14–17)

| ID | Agente | Modo padrão | Função | Doc |
|---:|---|---|---|---|
| 14 | Connectors Agent | Always-On (health) / Scheduled (fetch) | Conecta e valida GA4/GSC/GTM/Bing/Clarity/Meta | `connectors-agent.md` |
| 15 | Data Quality Agent | Scheduled | Dedupe + sanity checks + quarentena de dataset | `data-quality-agent.md` |
| 16 | Metrics History / Data Lake | Scheduled | Snapshots, retenção e base histórica | (add) |
| 17 | Attribution Agent | Scheduled/On-Demand | Atribui ganhos ↔ mudanças ↔ experimentos | (add) |

---

## D) Release, Canais & Indexação (18–20)

| ID | Agente | Modo padrão | Função | Doc |
|---:|---|---|---|---|
| 18 | Channels Agent | On-Demand | Draft/Preview/Production + promote/rollback | (add) |
| 19 | Diff & Guardrails Agent | On-Demand | Compara versões e bloqueia quebra de layout | (add) |
| 20 | Sitemap/Indexing Agent | Scheduled + On-Demand | sitemap-index + retire/deindex (410/301) | (add) |

---

## E) Bibliotecas, Padrões & Governança (21–24)

| ID | Agente | Modo padrão | Função | Doc |
|---:|---|---|---|---|
| 21 | Bibliotecário Agent | Scheduled (semanal) | Planos/metas SEO/GEO/E-E-A-T + bibliotecas | (add) |
| 22 | Catalog Libraries Agent | Scheduled/On-Demand | Registries versionados (templates/locales/tokens) | (add) |
| 23 | Policy/Compliance Agent | Scheduled | Retenção, auditoria, requisitos LGPD/GDPR (alto nível) | (add) |
| 24 | Template QA Agent | On-Demand | QA visual e regressões antes de promote | (add) |

---

## F) Infra & DevOps (25–27)

| ID | Agente | Modo padrão | Função | Doc |
|---:|---|---|---|---|
| 25 | Infra Agent | Scheduled | Capacidade, topologia, runbooks, upgrades | (add) |
| 26 | Backup/DR Agent | Scheduled | Backup diário + restore drill semanal | (add) |
| 27 | Performance/Load Agent | On-Demand | Stress/perf tests pós-release grande | (add) |

---

## G) Segurança & Proteção (28–32)

| ID | Agente | Modo padrão | Função | Doc |
|---:|---|---|---|---|
| 28 | Access Control Agent | Always-On | Cloudflare Access + API Keys + allowlist | (add) |
| 29 | Abuse Protection Agent | Always-On | Rate limit + negative cache + lockout | (add) |
| 30 | Secrets Vault Agent | Always-On | Criptografia/rotação de credenciais | (add) |
| 31 | Security Audit Agent | Scheduled | Hardening e verificações semanais | (add) |
| 32 | Emergency Access Agent | Off by default / On-Demand | Break-glass (TTL + TOTP + allowlist + audit) | (add) |

---

## H) Suporte ao Cliente & Operação SaaS (33–38)

| ID | Agente | Modo padrão | Função | Doc |
|---:|---|---|---|---|
| 33 | Onboarding Agent | On-Demand | Setup guiado do projeto + checklist Go/No-Go | `onboarding-agent.md` |
| 34 | Support Triage Agent | On-Demand | Triagem, diagnóstico seguro e escalonamento | `support-triage-agent.md` |
| 35 | Customer Success Agent | Scheduled | Health score do cliente + churn signals | (add) |
| 36 | Billing & Plans Agent | Scheduled + On-Demand | Limites, budgets, allow/deny de execuções | `billing-plans-agent.md` |
| 37 | Notifications Agent | Scheduled/On-Demand | E-mail/webhook/in-app alerts (estado e consumo) | (add) |
| 38 | Knowledge Base Agent | Scheduled | FAQ/tutoriais e atualização contínua | (add) |

---

## I) Paid Media & Ads Intelligence (39–41)

| ID | Agente | Modo padrão | Função | Doc |
|---:|---|---|---|---|
| 39 | Google Ads Analyst Agent | On-Demand (com volume mínimo) | Diagnóstico Google Ads + recomendações (sem executar) | (add) |
| 40 | Microsoft Ads Analyst Agent | On-Demand (com volume mínimo) | Diagnóstico Bing Ads + recomendações (sem executar) | (add) |
| 41 | Meta Business Analyst Agent | On-Demand (com volume mínimo) | Diagnóstico Meta Ads + pixel/CAPI sinais | (add) |

---

## J) API Marketplace & Key Governance (42–45)

| ID | Agente | Modo padrão | Função | Doc |
|---:|---|---|---|---|
| 42 | Key Governance Agent | Always-On | Separa chaves internas vs externas + policy/scope | (add) |
| 43 | API Usage Metering Agent | Always-On (agregado) | Mede uso por agent/job/provider/key_origin | (add) |
| 44 | API Plans & Billing Agent | Scheduled + On-Demand | Créditos/limites para “APIs do Clusters Flow” | (add) |
| 45 | External Keys Manager Agent | On-Demand | Health/status/replace de chaves do cliente | (add) |
