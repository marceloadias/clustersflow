# Connectors Agent (v1) — Integrações & Autenticação

## 1) Objetivo
Gerenciar conexões (auth, health, permissões e leitura) com:
- GA4, GSC, GTM
- Bing Webmaster Tools (Bing WMT)
- Microsoft Clarity
- Meta Business (opcional, quando habilitado)

Este agente **não otimiza**, **não altera campanhas**, **não escreve em produção**. Ele apenas conecta, valida e coleta (read-only, exceto handshake/refresh).

---

## 2) Escopo
### Faz
- Onboarding/handshake de integrações por `project_id`
- Health-check periódico e status (ok/degraded/invalid)
- Token refresh/renew quando aplicável
- Padroniza o output de dados (schema único por fonte)

### Não faz
- Não executa mudanças em Ads
- Não cria/edita tags no GTM sem ação explícita/admin
- Não expõe segredos no WebPanel

---

## 3) Entradas (Inputs)
- `project_id`
- `integration_target` (ga4|gsc|gtm|bing_wmt|clarity|meta)
- `credentials_ref` (referência no Secrets Vault / Key Governance)
- `requested_scopes` (lista)
- `mode` (connect|refresh|health|fetch)

---

## 4) Saídas (Outputs)
### Artefatos
- `connectors_status.json`
- `connectors_fetch_{source}.json`
- `connectors_audit.md` (somente mudanças de estado)

### Schema mínimo: connectors_status.json
- project_id
- integrations[]:
  - source
  - status (ok|degraded|invalid|missing)
  - last_checked_at
  - last_error_code (opcional)
  - last_error_hint (opcional, sem dados sensíveis)
  - scopes_granted[]
  - data_freshness_window (ex.: "24h")

---

## 5) Guardrails (imutáveis)
- Nunca armazenar/retornar tokens/chaves em texto
- WebPanel só recebe: status + refs + hints
- Qualquer “write” (ex.: GTM publish) só via Admin + audit + flag explícita
- Rate-limit por fonte e por project_id
- Falha repetida: backoff (5m → 15m → 1h)

---

## 6) Frequência sugerida
- health: 5–15 min (leve, só status)
- fetch: 1x/dia (ou dentro do Update Window), com data gate (volume mínimo)
