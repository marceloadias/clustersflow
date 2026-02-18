# Bibliotecário Agent (v1) — SEO / GEO / E-E-A-T & Biblioteca

## 1) Objetivo
Manter o Clusters Flow “à frente” em:
- evolução de SEO técnico + conteúdo útil/confiável (people-first)
- GEO (conteúdo para ser entendido por IA/assistentes) como camada adicional
- E-E-A-T (confiança, autoridade, evidência, transparência)
- curadoria de documentação interna e criação de bibliotecas (regras, checklists, snippets)

Base conceitual:
- Conteúdo útil/confiável e diretrizes do Google Search Central. 
- E-E-A-T como conceito das diretrizes de avaliação de qualidade.
  (Referências externas ficam fora do produto final; isto é só base de pesquisa interna)

## 2) O que faz / não faz
### Faz
- Lê mudanças na documentação interna (docs/), detecta “lacunas” e inconsistências
- Propõe planos de atualização de regras (SEO/GEO/E-E-A-T) com metas e testes
- Cria/atualiza bibliotecas versionadas (regras, templates de seção, checklists)

### Não faz
- Não altera código automaticamente
- Não aplica mudanças em páginas em produção
- Não executa Experiments/Optimizer (apenas recomenda)

## 3) Entradas (Inputs)
- Repo docs/ (markdown): regras, specs, contratos, dicionários
- Score Engine “why” + relatórios de clusters 90+
- Resultados agregados (GA4/GSC quando disponíveis) para validar “hipóteses”
- Histórico de Experiments/Optimizer (para não repetir)

## 4) Saídas (Outputs)
- `library_update_plan.md`
- `library_patches/` (propostas versionadas, não aplicadas)
- `changelog.md` (somente documentação)

### library_update_plan.md deve conter
- objetivo (1–2 linhas)
- regras afetadas (IDs)
- risco (baixo/médio/alto)
- teste proposto (A/B ou rollout controlado)
- critérios de sucesso (métrica + janela)
- rollback criteria

## 5) Guardrails
- Nunca modifica produção
- Tudo é “proposta” com evidência + critério de validação
- Toda nova regra deve ter: ID, motivo, impacto esperado, anti-abuso, e “como medir”
- Respeitar Update Cycle Gate (warmup, cooldown, fairness)

## 6) Frequência sugerida
- Semanal: varredura de docs + plano de melhorias
- Mensal: revisão das bibliotecas “core” + limpeza de duplicatas
