# Clusters Flow — Project Region Contract (v1)

## 1) Objetivo

Definir o contrato oficial para região de projeto no Clusters Flow, garantindo:

* isolamento total entre BR e US
* previsibilidade de execução (jobs, agentes, logs)
* consistência de templates e marketplaces por região
* base para expansão (EU como app separado)

## 2) Definições

### 2.1 `app_region`

Região da aplicação (instância do Clusters Flow).
Valores válidos:

* BR (Clusters Flow BR / pt-BR / clustersflow.com.br)
* US (Clusters Flow US / en-US / clustersflow.com)

### 2.2 `project_region`

Região do PROJETO dentro de uma aplicação.
Regra: `project_region` deve ser igual a `app_region`.

Exemplos:

* App BR => todo projeto é BR
* App US => todo projeto é US

## 3) Regra imutável: projeto não atravessa região

* Um projeto nasce em uma região e permanece naquela região.
* Não existe "projeto global" nem "projeto multi-região".
* Não existe sincronização automática de projetos entre BR e US.

## 4) Regras de criação de projeto

Ao criar um projeto:

* `project_region` é atribuído automaticamente com base no domínio/app atual:

  * app.clustersflow.com.br => project_region=BR
  * app.clustersflow.com    => project_region=US
* O projeto herda obrigatoriamente:

  * idioma fixo da região (BR=pt-BR, US=en-US)
  * Template Registry da região
  * marketplaces permitidos da região

## 5) Regras de templates e marketplaces por região

* BR: templates e regras focadas no mercado brasileiro (ex.: Mercado Livre BR).
* US: templates e regras focadas no mercado americano (ex.: Amazon US).
* Um projeto BR nunca usa templates US, e vice-versa.

## 6) Execução (Jobs/Agentes) por região

* Jobs, agentes, filas, logs e auditoria pertencem 100% à região do projeto.
* Um job de projeto BR sempre executa no Engine BR.
* Um job de projeto US sempre executa no Engine US.
* Nunca executar jobs cruzados entre regiões.

## 7) Migração entre regiões (futuro)

Se existir no futuro, migração será uma operação especial:

* NÃO automática
* auditada e registrada
* com regras próprias (processo controlado)
* recomendação comercial: operação paga (por custo/risco)

## 8) Checklist de validação (aceite)

Um projeto é válido somente se:

* `project_region` == `app_region`
* idioma do projeto == idioma fixo do app
* Template Registry pertence à mesma região
* marketplaces do projeto estão dentro do allowlist da região
* todos os jobs e logs do projeto estão no Engine/DB/Storage da mesma região
