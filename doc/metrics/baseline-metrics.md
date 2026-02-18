# Baseline Metrics (v1) — Baselines, Janelas e Deltas

## 1) Objetivo
Definir como o sistema calcula:
- baseline (normal esperado)
- deltas (variação)
- p95/p99 (latência/tempo)
- regras de “só alertar com evidência”

Evitar alertas falsos e evitar logs caros.

---

## 2) Janelas padrão
- W1: 1h (curto prazo / incidentes)
- W2: 6h (estabilidade operacional)
- W3: 24h (dia)
- W4: 7d (baseline de referência)
- W5: 28d (tendências/SEO)

---

## 3) Baselines padrão (por métrica)

### 3.1 Jobs
- baseline_duration_p95_7d (por job_type)
- baseline_fail_rate_7d (por job_type)
- baseline_retry_avg_7d (por job_type)

Cálculo:
- p95 = percentil 95 das durações (últimos 7d)
- fail_rate = failed / (completed + failed) na janela
- retry_avg = média de retries na janela

---

### 3.2 Cache
- baseline_hit_rate_7d (por cluster)
- baseline_build_rate_7d (por cluster)

Cálculo:
- hit_rate = hit / (hit + miss)
- build_rate = builds / hora (ou / dia)

---

### 3.3 Providers
- baseline_fallback_rate_7d (por provider/model)
- baseline_error_rate_7d

---

### 3.4 Infra
- baseline_cpu_7d (média e p95)
- baseline_ram_7d
- baseline_disk_7d (tendência, não p95)
- baseline_sse_disconnect_rate_7d

---

## 4) Deltas (comparações)
### 4.1 Delta simples
- delta = valor_atual - baseline

### 4.2 Delta relativo (recomendado)
- delta_pct = (valor_atual - baseline) / baseline

Exemplos:
- job_p95_now > 2.5x baseline_p95_7d  => alerta warn
- fail_rate_2h > 15% e baseline_7d < 5% => alerta critical

---

## 5) Regras de evidência mínima (anti-ruído)
Antes de alertar, exigir:
- sample_size mínimo (ex.: >= 30 eventos na janela) OU
- volume/tráfego mínimo (ex.: GSC impressões >= 300 na janela)

Se não houver amostra suficiente:
- registrar “observação” (info) no relatório .md, sem alert.

---

## 6) Agregação (barato)
Eventos de alta frequência NÃO devem ser gravados 1 a 1:
- cache.hit/miss
- sse connect/disconnect muito frequente
- métricas de CPU a cada segundo

Em vez disso:
- agregadores por minuto (ou 5 min) geram snapshots:
  - cache_hit_count, cache_miss_count
  - cpu_avg, cpu_p95
  - sse_disconnect_count

---

## 7) Onde guardar (conceito)
- `metrics_snapshots` (por project_id/cluster_id, por janela/intervalo)
- `metrics_baselines` (valores baseline por métrica e dimensão)
- Retenção:
  - snapshots 1m/5m: curto (ex.: 7–14 dias)
  - snapshots diários: longo (ex.: 6–12 meses)
