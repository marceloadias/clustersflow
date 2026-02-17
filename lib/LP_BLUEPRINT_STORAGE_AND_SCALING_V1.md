# LP_BLUEPRINT_STORAGE_AND_SCALING_V1 — Blueprint Canônico + Artefatos Publicados (Escala 10k)

## 1) Objetivo
AI BUILDER edita um **Blueprint canônico (JSON)** no SaaS.
HTML/assets publicados são **artefatos** (output/preview) com **CFX embutido** contendo `cache_key` e `build_id`.
Isso escala para **10.000 usuários** sem travar o editor.

## 2) Por que NÃO usar HTML publicado como fonte de verdade
HTML publicado:
- é resultado do compilador, não contrato editável
- pode ser alterado fora do sistema
- reimport/parsing é caro e instável
- cria inconsistência e bugs

Regra Ouro: editor reabre a LP a partir do **Blueprint**, não do HTML.

## 3) Modelo Blueprint (alto nível)
Inclui:
- identidade (`project_id`, `lp_id`, `locale`, `lp_type`)
- estrutura (`folds[]`, `blocks[]`, layout/slots)
- design tokens (`tokens`)
- módulos (`modules_used[]`)
- fontes (preview Google Fonts no editor; build local)
- mídias (internas e externas; affiliate external-only)
- conteúdo/SEO (tabelas, referências, schema)

## 4) Versionamento
- `revision` incremental
- overlays/patches para melhorias
- `cache_key` derivado de template/tokens/conteúdo/módulos/fontes/mídias

## 5) Fluxo abrir/editar/salvar
- abrir: carrega Blueprint do SaaS
- cache local: acelera e suporta offline (não substitui fonte)
- salvar: patches com locking otimista

## 6) Consistência com publicado (via CFX)
Editor consulta URL publicada apenas para ler CFX e comparar:
- `cache_key`, `build_id`
Se mismatch: alerta + ações (republicar/manter/nova revisão).

## 7) Build/Publish via fila de jobs
Publicação é job assíncrono:
- não trava editor
- logs/status
- validação pós-deploy

## 8) Concorrência e conflitos
Optimistic locking por `revision/etag`.
Em conflito: aplicar patch se possível ou criar nova revisão.

## 9) Escalabilidade 10k
- editor client-heavy
- backend stateless para JSON
- CDN/host serve assets
- rate limit e fila de builds

## 10) Retenção/custo
- blueprint leve (longa retenção)
- outputs versionados (manter N)
- GC de outputs antigos mantendo auditoria essencial

## 11) Checklist do Cluster
- publicado ≠ fonte
- preview é real
- mismatch detectado
- evitar multi-aba
- build é assíncrono
