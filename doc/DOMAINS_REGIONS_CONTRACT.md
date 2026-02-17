# Clusters Flow — Domains & Regions Contract (v1)

## 1) Objetivo

Definir a regra oficial de domínios, regiões e isolamento entre aplicações do Clusters Flow, garantindo:

* baixa latência por mercado (BR vs US)
* zero mistura de dados
* escala previsível por região
* liberdade para templates e regras específicas por marketplace

## 2) Aplicações oficiais (2 apps independentes)

### 2.1 Clusters Flow BR (pt-BR)

* Região: BR
* Idioma: pt-BR (fixo)
* Domínio: clustersflow.com.br
* UI (entrada): app.clustersflow.com.br

### 2.2 Clusters Flow US (en-US)

* Região: US
* Idioma: en-US (fixo)
* Domínio: clustersflow.com
* UI (entrada): app.clustersflow.com

## 3) Regra imutável: isolamento total

BR e US são duas aplicações independentes. Nada é compartilhado entre elas:

* contas/usuários
* projetos e clusters
* templates e bibliotecas (Template Registry)
* prompts e regras internas
* jobs/fila/agentes/execuções
* logs/auditoria/métricas
* banco de dados e storage

Cada região possui seu próprio Backend/Engine/DB/fila/Storage, operando de forma isolada.

## 4) Regra do subdomínio `app.*`

O subdomínio `app` é a porta de entrada oficial para:

* login
* UI/Builder
* chamadas para o Engine correspondente à região daquele domínio

Exemplos:

* app.clustersflow.com.br => UI/Builder BR => Engine BR
* app.clustersflow.com    => UI/Builder US => Engine US

## 5) DNS (checklist mínimo)

Para cada domínio:

* Criar subdomínio `app`
* Apontar `app` para o IP do VPS da região (A record)
* SSL obrigatório (Cloudflare ou no servidor)
* Manter BR e US com DNS e infraestrutura totalmente independentes

## 6) Templates e Marketplaces (regra)

* O app BR terá templates focados no mercado brasileiro (ex.: Mercado Livre BR).
* O app US terá templates focados no mercado americano (ex.: Amazon US).
* O Template Registry é separado por app/região e não deve ser sincronizado entre BR e US.

## 7) Futuro: Europa (regra)

Europa não entra como "multi-idioma dentro do app US".
Quando houver demanda real:

* Criar uma NOVA aplicação (ex.: Clusters Flow EU)
* Base do app: réplica do app US (core similar)
* Alterar apenas:

  * locale/idioma local (ex.: en-GB, de-DE, fr-FR)
  * template registry por país/marketplace
* Manter isolamento total (EU não compartilha DB/Jobs/Templates com US)

## 8) Regra de produto: projetos não atravessam região

* "Projeto nasce e permanece" na região onde foi criado.
* Migração de projeto entre regiões (se existir no futuro) deve ser:

  * controlada
  * auditada
  * tratada como operação especial (com regras próprias).
