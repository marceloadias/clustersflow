# SAAS_LIBRARY_STORAGE_AND_CACHE_V1 — Library separada do Runtime do SaaS

## 1) Objetivo
Biblioteca do sistema (templates/presets/assets/previews) no mesmo ambiente do SaaS, porém em storage separado para:
- performance
- cache agressivo
- escala (CDN)

## 2) Separação lógica
- App Runtime: Editor/API/Auth/Blueprints/jobs/logs
- Library Storage: read-only (catálogo, previews, assets do sistema)

## 3) Estrutura
- `library/*` (catálogo, templates, presets, previews, assets, versions)
- `projects/*` (blueprints, favoritos, presets do usuário, uploads, outputs)

## 4) Cache
- `library/*` com cache longo
- versionamento por `library_version` (hash/semver+hash)
- invalidação por versão (sem purge global)

## 5) Consumo pelo editor
read-only, lazy loading, thumbs primeiro, preview depois, busca via catálogo indexado.

## 6) Segurança
sem dados de usuário; allowlist de tipos; read-only; assinatura opcional.

## 7) Custo
CDN absorve tráfego estático; reduz hits no backend.

## 8) Integração com Persiana
biblioteca oficial vem de `library/*`; favoritos/recentes do usuário em `projects/*`.

## 9) Telemetria
library_hit/miss, 404, latência (agregado).

## 10) Checklist operacional
publicar nova versão, atualizar catálogo, manter versões antigas, monitorar, rollback por catálogo.
