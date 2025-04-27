# Gerador de arquivo de TP da Infnet

Esse projeto visa gerar automaticamente o arquivo pdf solicitado pelos professores da Infnet nos TPs (testes de performance), com base no que você possui no CodeSandbox.

## Versão web

https://infnet.ronaldarndt.dev/

## Como rodar

Primeiramente você precisa ter uma conta no CodeSandbox e ter feitos as questões por lá, nomeando-as conforme o padrão da instituição (DRx-TPx.x).

Depois é só seguir os passos

1. Conseguir uma chave de API do codesandbox seguindo os passos descritos aqui https://codesandbox.io/docs/sdk
2. Atualizar o arquivo `config.json` colocando a chave de API no campo "codesandboxToken" e atualizando os demais conforme sua necessidade
3. Ter o Bun instalado no seu pc (https://bun.sh/)
4. Rodar o comando `bun install` uma única vez na raiz do projeto
5. Rodar o comando `bun generate` sempre que quiser gerar o pdf

Prontinho! Você terá um arquivo `nome_sobrenome_DRx_TPx.pdf` lhê esperando.
