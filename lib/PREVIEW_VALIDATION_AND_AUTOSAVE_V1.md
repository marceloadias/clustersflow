# PREVIEW_VALIDATION_AND_AUTOSAVE_V1 — Preview real + Contrato + Autosave + Auditoria

## 1) Objetivo
Publicar com previsibilidade e segurança:
Draft → Preview HTML real → Validação por agentes → Contrato (dobra + LP) → Aceite → Publish

## 2) Preview HTML real
Exibir:
- render real
- peso total
- gráfico torta (HTML/CSS/JS/Mídias/Fontes/CFX)
- lista de assets reais + modules_used/components_used

## 3) Botões
- Aceitar & Publicar (gera auditoria)
- Revisar (volta ao canvas sem perder histórico/estado/issues)

## 4) Contratos
- Fold Contract por dobra
- LP Contract unificado (tokens_hash/ui_version/cache_key/build_id/fonts/media policy)

## 5) Auditoria por agentes
Performance/Compliance/UX/SEO com severidades:
Crítico bloqueia; Importante recomenda; Info sugere.

## 6) Autosave anti-perda
- micro-save por ação
- intervalo curto
- cache local offline-safe
- sync pós-reconexão

## 7) Atualizações/otimizações com auditoria (não quebrar no ar)
- nunca sobrescrever produção
- nova versão + diff + motivo + autor + data
- validações antes de promote
- rollback isolado por LP/cluster

## 8) Integração com CFX
CFX embute: cache_key/build_id/ui_version/tokens_hash/components_used/modules_used
Editor detecta mismatch com publicado e alerta.

## 9) Checklist do Cluster
educar: preview = realidade; contrato; issues; mismatch; autosave.

## 10) Retenção/custo
blueprints leves; outputs versionados (N); GC de outputs antigos mantendo auditoria.
