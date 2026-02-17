# AFFILIATE_MEDIA_POLICY_V1 — Política de Mídias para LPs Afiliadas (Amazon / Mercado Livre)

## 1) Objetivo
Garantir conformidade com políticas e direitos autorais em LPs afiliadas, mantendo **imagens de produto sempre na fonte de origem** (marketplace), evitando download, reprocessamento e redistribuição indevida.

## 2) Regra Ouro: “Produto = External-Only”
Em LPs do tipo **Affiliate (Amazon/Mercado Livre)**:
- Imagens de **produto** devem ser sempre carregadas por **link externo**.
- É proibido:
  - baixar a imagem
  - compactar/convertê-la (AVIF/WebP)
  - armazenar em `/assets/media/`
  - republicar sob o seu domínio

**Resultado:** `local_copy = false` sempre para imagens de produto.

## 3) Permitido vs Proibido (edição de imagem)
### Permitido (somente apresentação)
- tamanho (width/height)
- proporção/fit (contain/cover)
- alinhamento e espaçamento
- borda/radius/sombra
- layout (grid, carrossel, gallery)
- lazy-load / placeholders

### Proibido (alteração/distribuição)
- download e armazenamento local
- recorte/edição do conteúdo da imagem
- remoção de marca d’água
- compressão/conversão do arquivo
- gerar cópias no host da LP

## 4) Allowlist (conceitual)
Permitir links de imagem **apenas** para domínios oficiais/esperados do marketplace:
- `source = amazon` → allowlist de CDNs oficiais da Amazon
- `source = mercadolivre` → allowlist de CDNs oficiais do Mercado Livre

A lista real de domínios deve existir em um registry interno versionado.

## 5) Como o Builder armazena e referencia
Por imagem de produto:
- `external_url` (link completo)
- `source` (amazon / mercadolivre / outro)
- `product_id` (quando aplicável)
- `alt_text` (obrigatório)
- `presentation` (tamanho/fit/layout)

No HTML:
- `<img src="external_url" ...>` (sem cópia local)

## 6) Auditoria via CFX (obrigatória)
CFX registra:
- `media_type: product_external`
- `source: amazon | mercadolivre`
- `origin_url`
- `local_copy: false`
- `status: ok|fail`

## 7) Validações pós-build
Crítico:
- mixed content (HTTPS puxando HTTP)
- URL inválida/vazia

Importante:
- domínio fora da allowlist
- erro/timeout recorrente

Fallback obrigatório:
- placeholder + layout estável

## 8) Notificações do Cluster
- Crítico: URL inválida/mixed content
- Importante: domínio não permitido / falhas recorrentes
- Info: recomendações (lazy-load, dimensionamento, alt)

## 9) Exceções (mídias não-produto)
Mesmo em LP afiliada, mídias não-produto podem ser locais conforme política geral:
- ícones, ilustrações genéricas, backgrounds, elementos do template