# CF_UI_CORE_V1 — UI Core (Bootstrap próprio do Clusters Flow)

## 1) Objetivo
Garantir UI/UX idêntico entre AI BUILDER e LP publicada:
- classes `cf-*`
- tokens `--cf-*`
- CSS compilável e mínimo por LP
- compatível com tema Dark (padrão) e Light (opcional)

## 2) Princípios
- consistente
- leve e previsível
- sem frameworks no output
- performance: CSS/JS por uso
- radius 10, tipografia Manrope

## 3) Design Tokens (tabela)
Cores: bg/surface/border/text/primary/accent + estados.
Tipografia: família, pesos, tamanhos.
Spacing/radius/shadow: escalas.
Z-index: base/sticky/modal/toast.
Breakpoints fixos.

## 4) Convenção de classes
Base: `cf-page`, `cf-section`, `cf-block`, `cf-container`
Layout: `cf-grid`, `cf-stack`, `cf-inline`
Componentes: `cf-btn`, `cf-card`, `cf-form`, `cf-table`, `cf-accordion`, `cf-modal`, `cf-video`
Estados: `is-*`, `has-*`

## 5) Componentes obrigatórios
container/grid/stack/button/card/badge/form/table/accordion/tabs/modal + estados hover/focus/disabled.

## 6) Temas
- Dark padrão
- Light opcional
- marca (azul) consistente nos dois; neutros mudam.

## 7) Compilar só o necessário (conceitual)
Build Agent inclui chunks conforme:
- `components_used`
- `modules_used`

## 8) Font Packaging + CFX
- preview: Google Fonts
- produção: fontes locais `assets/fonts/`
CFX embute: `ui_version`, `tokens_hash`, `components_used`, `modules_used`

## 9) Guardrails por foldtype
Mostrar/permitir apenas itens compatíveis por dobra.
Vídeo: somente externo e fora de elementos dinâmicos.

## 10) Checklist visual
mobile sem scroll horizontal (exceto tabelas), wrapper de table, sticky header/coluna, CTA claro, states acessíveis.
