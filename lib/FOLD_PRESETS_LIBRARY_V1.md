# FOLD_PRESETS_LIBRARY_V1 — Presets de Dobra (Reuso sem Clone)

## 1) Objetivo
Permitir reuso de dobras entre projetos sem oferecer clone/export da LP inteira.

## 2) Definição
Fold Preset = dobra reutilizável (Hero/Proof/Offer/FAQ etc.) versionada.

## 3) O que salva
- estrutura, ordem, layout/slots
- configs de componentes
- tokens locais opcionais (via `--cf-*`)
- modules_used relevantes
- placeholders (slots) de conteúdo

## 4) O que NÃO salva
- integrações, credenciais, tracking IDs
- domínios/hosts/UTMs privadas
- conteúdo sensível
- em affiliate: não fixa produto; guarda apenas slots

## 5) Versionamento/compatibilidade
- preset_id/preset_version
- fold_type, cf_ui_version
- tokens_hash (se houver)
- components_used/modules_used

## 6) Fluxo
Salvar preset → categorizar/tag → favoritar → inserir em outra LP.

## 7) Integração com a Persiana
Aparece em “Meus Presets” + Recentes + Favoritos.

## 8) Guardrails ao inserir
validar fold_type, lp_type (affiliate vs normal), locale, módulos do plano.

## 9) Auditoria via CFX
registrar presets usados (id/version/fold_type/ui_version).

## 10) Retenção/custo
presets leves; limites por plano.

## 11) Checklist do Cluster
educar: “preset não é clone”, revisar slots, compatibilidade e módulos.
