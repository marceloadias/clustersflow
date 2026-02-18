# Agent Tree (v2) — Clusters Flow

## Objetivo
Mapa completo de agentes para cobrir:
- Operação (produção)
- Autonomia (auditoria/tendências/incidentes)
- Dados e integrações
- Release/validação
- Bibliotecas e governança
- Infra/DevOps
- Segurança
- Suporte ao cliente (SaaS)

---

## Árvore (v2)

### A) Núcleo de Produção (Pipeline Base 01–09)
01) SEO Pack  
02) Content Pack  
03) HTML Generator  
04) Validator / Guardrails  
05) Assets Pack  
06) Full Pipeline Orchestrator (01→05)  
07) Update Cycle (dados reais)  
08) Experiment Manager (A/B + rollout)  
09) Optimizer (Recovery/Extreme + diff + rollback)

### B) Autonomia & Observabilidade
10) Auditor Agent  
11) Trends Agent  
12) Incident Response Agent  
13) Provider Health & Auto-Routing Agent

### C) Dados & Integrações
14) Connectors Agent (GA4/GSC/GTM/Bing/Clarity/Meta*)  
15) Data Quality Agent  
16) Metrics History / Data Lake Agent  
17) Attribution Agent (ganhos ↔ mudanças ↔ experimentos)

### D) Release, Canais & Indexação
18) Channels Agent (Draft/Preview/Production)  
19) Diff & Guardrails Agent  
20) Sitemap/Indexing Agent (sitemap + retire + 410/301)

### E) Bibliotecas, Padrões & Governança
21) Bibliotecário Agent  
22) Catalog Libraries Agent  
23) Policy/Compliance Agent  
24) Template QA Agent

### F) Infra & DevOps
25) Infra Agent  
26) Backup/DR Agent  
27) Performance/Load Agent

### G) Segurança & Proteção
28) Access Control Agent  
29) Abuse Protection Agent  
30) Secrets Vault Agent  
31) Security Audit Agent  
32) Emergency Access Agent

### H) Suporte ao Cliente & Operação SaaS
33) Onboarding Agent  
34) Support Triage Agent  
35) Customer Success Agent  
36) Billing & Plans Agent  
37) Notifications Agent  
38) Knowledge Base Agent

---

## Notas de Guardrails
- Nenhum agente aplica mudanças globais destrutivas.
- Ações em produção devem passar por: validação → diff → promote com auditoria.
- Agentes de suporte não têm acesso a segredos; apenas referências e diagnósticos.
