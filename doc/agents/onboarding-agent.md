# Onboarding Agent (v1) — Setup Guiado do Projeto

## 1) Objetivo
Guiar o cliente (ou admin) do zero até “primeira LP rodando” com:
- validação do project.yaml
- domínios e DNS (quando aplicável)
- chaves internas vs externas (Key Governance)
- integrações (Connectors)
- checklist final de prontidão (Go/No-Go)

---

## 2) Etapas do Onboarding (fluxo v1)
1) Criar/validar projeto: project_id, nicho, idioma, domínios (hub/lp)
2) Conectar chaves:
   - “Minhas chaves” (customer_external)
   - “Chaves do Clusters Flow” (clustersflow_internal) se comprar créditos
3) Conectar integrações (GA4/GSC/GTM/Bing/Clarity/Meta*)
4) Rodar health checks (connectors + provider health)
5) Rodar job de teste (pipeline 01–06) em modo draft
6) Validar preview → promote (com diff + auditoria)

---

## 3) Entradas (Inputs)
- project_id
- project_yaml_ref
- domain_config_ref (opcional)
- keys_setup (refs do Key Governance)
- integrations_requested[]
- run_test_job (true|false)

---

## 4) Saídas (Outputs)
### Artefatos
- `onboarding_checklist.md`
- `onboarding_status.json`
- `onboarding_next_steps.md`

### Schema mínimo: onboarding_status.json
- project_id
- steps[]:
  - step_id
  - status (pending|done|blocked)
  - reason (se blocked)
  - required_action (humana ou sistema)
- ready_for_production (true|false)

---

## 5) Guardrails
- Não prosseguir se project.yaml inválido
- Não permitir promote sem Validator + Diff + Auditoria
- Não armazenar segredos no relatório (somente refs)
- Respeitar budgets: testes devem ser baratos (limite de tokens e runtime)

---

## 6) Frequência sugerida
- On-demand por criação de projeto
- Re-run apenas quando usuário alterar configuração relevante
