# TEMPLATE_LIBRARY_SHADE_UI_V1 — Biblioteca em “Persiana/Shade”

## 1) Objetivo
Biblioteca de templates com identidade própria: uma “persiana” que desce sobre o editor, mantendo canvas visível.

## 2) Diferença vs modal comum
Não bloquear a tela inteira, não tirar contexto do canvas.

## 3) Gestos
Abrir via botão na barra superior.
Fechar por ESC, botão, ou arrastar handle para cima.

## 4) 3 estágios
1) Full: catálogo completo (scroll vertical no topo)
2) Partial: strip de favoritos (rápido)
3) Closed: recolhida (não renderiza grid)

## 5) Layout interno
Tabs/categorias, busca, filtros, cards com preview, ações inserir/favoritar.

## 6) Identidade visual
tema tokenizado, radius 10, blur/translucidez leve, sombra suave, handle central.

## 7) Performance
Closed: não renderiza catálogo
Partial: renderiza só favoritos
Full: paginação/virtualização conceitual

## 8) Compatibilidade por foldtype
Mostrar primeiro os itens compatíveis com a dobra atual; incompatíveis com aviso/disable.

## 9) Acessibilidade
ESC fecha, setas navegam, Enter insere, focus visível.

## 10) Checklist UX
Abrir/fechar rápido, inserir em 1 ação, não travar canvas, favoritos sempre à mão.
