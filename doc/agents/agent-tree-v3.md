Clusters Flow — Agent Tree (v3)

├─ A) Núcleo de Produção (Pipeline Base 01–09)
│  ├─ 01) SEO Pack
│  ├─ 02) Content Pack
│  ├─ 03) HTML Generator
│  ├─ 04) Validator / Guardrails
│  ├─ 05) Assets Pack
│  ├─ 06) Full Pipeline Orchestrator (01→05)
│  ├─ 07) Update Cycle (dados reais)
│  ├─ 08) Experiment Manager (A/B + rollout)
│  └─ 09) Optimizer (Recovery/Extreme + diff + rollback)
│
├─ B) Autonomia & Observabilidade (Diagnóstico / Sinais / Incidentes)
│  ├─ 10) Auditor Agent
│  ├─ 11) Trends Agent
│  ├─ 12) Incident Response Agent
│  └─ 13) Provider Health & Auto-Routing Agent
│
├─ C) Dados & Integrações (Conectores + Qualidade + Lake)
│  ├─ 14) Connectors Agent (GA4/GSC/GTM/Bing WMT/Clarity/Meta*)
│  ├─ 15) Data Quality Agent
│  ├─ 16) Metrics History / Data Lake Agent
│  └─ 17) Attribution Agent
│
├─ D) Release, Canais & Indexação (publicação controlada)
│  ├─ 18) Channels Agent (Draft/Preview/Production + promote/rollback)
│  ├─ 19) Diff & Guardrails Agent (compare + anti-break)
│  └─ 20) Sitemap/Indexing Agent (sitemap-index, retire, 410/301)
│
├─ E) Bibliotecas, Padrões & Governança (evolução contínua)
│  ├─ 21) Bibliotecário Agent
│  ├─ 22) Catalog Libraries Agent
│  ├─ 23) Policy/Compliance Agent
│  └─ 24) Template QA Agent
│
├─ F) Infra & DevOps (capacidade, estabilidade, performance)
│  ├─ 25) Infra Agent
│  ├─ 26) Backup/DR Agent
│  └─ 27) Performance/Load Agent
│
├─ G) Segurança & Proteção (camada dura)
│  ├─ 28) Access Control Agent
│  ├─ 29) Abuse Protection Agent
│  ├─ 30) Secrets Vault Agent
│  ├─ 31) Security Audit Agent
│  └─ 32) Emergency Access Agent
│
├─ H) Suporte ao Cliente & Operação do SaaS
│  ├─ 33) Onboarding Agent
│  ├─ 34) Support Triage Agent
│  ├─ 35) Customer Success Agent
│  ├─ 36) Billing & Plans Agent
│  ├─ 37) Notifications Agent
│  └─ 38) Knowledge Base Agent
│
├─ I) Paid Media & Ads Intelligence (Análise Google/Bing/Meta)
│  ├─ 39) Google Ads Analyst Agent
│  ├─ 40) Microsoft Ads (Bing) Analyst Agent
│  └─ 41) Meta Business Analyst Agent
│
└─ J) API Marketplace & Key Governance (Chaves + Consumo + Transparência)
   ├─ 42) Key Governance Agent
   ├─ 43) API Usage Metering Agent
   ├─ 44) API Plans & Billing Agent
   └─ 45) External Keys Manager Agent


Notas de Guardrails (imutáveis)
- Nenhum agente aplica mudanças globais destrutivas.
- Ações em produção devem passar por: validação → diff → promote com auditoria.
- Agentes de suporte não têm acesso a segredos; apenas referências e diagnósticos.
