# Incident Response Agent (v1) — Incidentes, RCA e Playbooks

## 1) Objetivo
Quando um incidente crítico acontece (infra, providers, jobs, cache),
este agente:
- cria um “caso” (incident)
- coleta evidências
- produz RCA (root cause analysis) curto
- sugere passos de mitigação (sem executar automaticamente)

---

## 2) Gatilhos (Triggers)
- `audit.alert.raised` severity=critical
- `providers.health.changed` para missing/degraded prolongado
- `jobs.failed` em cascata (acima de threshold)
- `cache.build.loop` detectado

---

## 3) Entradas (Inputs)
- incident_trigger_event (ref)
- project_id (obrigatório)
- cluster_id (opcional)
- window (padrão: últimas 2h / 24h)

---

## 4) Saídas (Outputs)
### Artefatos
- `incident_case.json`
- `rca_report.md`
- `mitigation_plan.md`

### Schema mínimo: incident_case.json
- incident_id
- severity (warn|critical)
- category (infra|providers|jobs|cache|security|data)
- project_id
- cluster_id (opcional)
- started_at / last_updated_at
- status (open|monitoring|resolved)
- evidence_refs[]
- suspected_root_causes[]
- suggested_actions[] (sempre requires_human_approval=true)

---

## 5) Guardrails (imutáveis)
- Nunca executa ações destrutivas
- Nunca altera produção sozinho
- Qualquer recomendação deve citar evidência + janela
- Sem spam: só atualiza caso quando há mudança de estado

---

## 6) Frequência sugerida
- On-demand apenas durante incident open
- “monitoring” reavalia a cada 15–30 min até resolver
