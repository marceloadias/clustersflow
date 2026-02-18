# Data Quality Agent (v1) — Qualidade, Consistência e Dedupe

## 1) Objetivo
Garantir que dados coletados (GA4/GSC/GTM/Bing/Clarity/Meta) e snapshots internos
sejam consistentes, deduplicados e utilizáveis por:
- Trends, Attribution, Update Cycle, Experiments e Optimizer
- Auditor (quando validar impacto)

---

## 2) Escopo
### Faz
- Valida schema, tipos, unidades, timezone e janelas
- Dedupe (mesmo snapshot repetido / mesma janela)
- Sanity checks (valores impossíveis, regressões absurdas, amostras pequenas)
- Marca datasets como: valid | warning | invalid (com motivo)

### Não faz
- Não “corrige” conteúdo de LP
- Não inventa dados ausentes
- Não altera fontes externas

---

## 3) Entradas (Inputs)
- `project_id`
- `dataset_ref` (ponteiro para snapshot/lote)
- `source` (ga4|gsc|gtm|bing_wmt|clarity|meta|internal)
- `window` (ex.: 1h|24h|7d|28d)
- `expected_schema_version`

---

## 4) Saídas (Outputs)
### Artefatos
- `dq_report.md`
- `dq_result.json`

### Schema mínimo: dq_result.json
- project_id
- dataset_ref
- status (valid|warning|invalid)
- checks[]:
  - check_id
  - severity (info|warn|critical)
  - message
  - evidence (metric/value/threshold/window)
- recommended_action (accept|quarantine|refetch)

---

## 5) Guardrails
- Nunca promover dataset invalid para Data Lake “gold”
- Quarentena automática em invalid (somente marcação, sem deletar)
- Alertar Auditor apenas em mudanças de estado (invalid → valid etc.)
- Exigir sample_size mínimo antes de “alerta”

---

## 6) Frequência sugerida
- Scheduled: 1–6h (dependendo do volume)
- On-demand: após fetch grande ou após incident de conectores
