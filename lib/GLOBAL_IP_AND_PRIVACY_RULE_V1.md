# GLOBAL_IP_AND_PRIVACY_RULE_V1 — Propriedade dos Templates e Privacidade do Usuário

## 1) Regra global imutável
- Todos os templates/presets/blocos (criados/gerados/editáveis/derivados) são **propriedade do sistema** e podem ser reutilizados sem autorização do usuário.
- **Dados do usuário não são compartilhados.**
Objetivo: aprender com erros e acertos.

## 2) Definições
Template do Sistema, Preset/Dobra, Componente, Dados do Usuário, Dados Derivados/Anonimizados.

## 3) O que o sistema pode reutilizar
- estrutura, layout, tokens genéricos
- componentes e padrões
- regras de performance/auditoria
- templates Gold versionados

## 4) O que nunca compartilhar
- conteúdo privado, uploads do usuário
- credenciais, tracking IDs, domínios privados
- métricas brutas identificáveis
- leads e dados de formulário
- assets externos com restrição

## 5) Separação de armazenamento
- Blueprints e dados em `projects/*` isolados por project_id
- Catálogo do sistema em `library/*`

## 6) Opt-out
Não existe opt-out para templates do sistema; usuário remove apenas seus dados.

## 7) Exemplos práticos
Hero vencedor vira template; copy/telefone/domínio ficam privados, etc.

## 8) Affiliate
componentes são do sistema; links/imagens do produto continuam externos.

## 9) Checklist do Cluster
mensagens claras sobre propriedade dos templates e privacidade dos dados.

## 10) Nota de conformidade
Privacidade e isolamento, sem prometer segurança absoluta.
