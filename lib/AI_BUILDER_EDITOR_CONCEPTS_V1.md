# AI_BUILDER_EDITOR_CONCEPTS_V1 — Conceitos do Editor (Canvas + Mini-mapa + Barras)

## 1) Mini-mapa (lado direito)
- Exibir um mini-mapa vertical das dobras (folds)
- Usuário define quantas dobras terá; navega rapidamente entre elas
- No lado direito também ficam:
  - recomendações do sistema
  - notas da IA
  - mini-mapa de navegação

## 2) Paleta e Tipografia (barra inferior)
- Barra inferior com ícones:
  - T = Tipografia
  - Balde = Paleta (régua horizontal tipo gradiente)
- Paleta com favoritos (salvar cores/estilos numa régua)

## 3) Elementos por compatibilidade (barra esquerda)
- Lista de blocos por dobra (foldtype)
- Mostrar somente itens compatíveis com a dobra atual
- Pode sinalizar compatibilidade (cores/indicação visual)
  - compatíveis destacados
  - incompatíveis com aviso/desabilitado

## 4) Biblioteca em Persiana (barra superior)
- Biblioteca abre como persiana/shade descendo sobre o editor
- 3 estados: full / favorites strip / closed
- Favoritos aceleram edição sem poluir canvas

## 5) Layers (camadas)
- Gerenciador de camadas como Figma/Canvas
- Mais alto = render por cima
- drag reorder + lock/hide + group

## 6) Vídeo
- Vídeo permitido em dobras, inclusive junto ao FAQ
- Regra: vídeo sempre externo
- Regra: vídeo não fica “dentro” de elementos dinâmicos (acordeão/tabs/modal)
- Pode ficar abaixo do FAQ (slot suporte)

## 7) Performance visível
- Painel estilo PageInsight: gráfico torta de peso (HTML/CSS/JS/Mídias/Fontes/Componentes)
- Lista de elementos/pesos para educar usuário sem forçar

## 8) Autosave e histórico
- salvar por ação + intervalos
- cache local para quedas de conexão
- voltar do preview para canvas sem perder histórico
