# SCSS_PIPELINE_V1 — SCSS como fonte do CF-UI Core + CSS final por LP

## 1) Objetivo
Usar SCSS como fonte interna do CF-UI Core para gerar `assets/style.css` final:
- tokens + componentes padronizados
- CSS mínimo por página (“compile only used”)

## 2) Estrutura recomendada
`cf-ui/core` (tokens/base/typography)
`cf-ui/chunks` (grid/buttons/forms/tables/accordion/video...)
`cf-ui/modules` (modal/popup/sticky/animações safe)
`cf-ui/themes` (dark + light opcional)
`cf-ui/build/entry.scss` (gerado pelo Build Agent)

## 3) Tokens
Tokens em SCSS (maps) exportados como CSS variables `--cf-*`.

## 4) Chunks obrigatórios
base/grid/typography/buttons/forms/cards/tables/accordion/video/tabs (opcional)
modules: modal/popup/sticky-cta/animations-safe

## 5) “Compile only used”
Build Agent monta `entry.scss` baseado em:
- `components_used`
- `modules_used`
e compila → `assets/style.css`.

## 6) Output
Padrão v1: 1 arquivo `assets/style.css`.

## 7) Guardrails
- nesting limitado
- sem frameworks no output
- classes somente `cf-*`
- tema tokenizado (dark padrão, light opcional)

## 8) Integração com Font Packaging + CFX
- fontes locais no build
- CFX embute `ui_version/tokens_hash/components_used/modules_used`

## 9) Checklist operacional
ler blueprint → gerar entry.scss → compilar → empacotar fontes/mídias → embutir CFX → validar mobile/performance.
