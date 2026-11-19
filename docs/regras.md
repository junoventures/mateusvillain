# Regras do projeto

O que todo mundo segue ao trabalhar neste repositório.

## Segredos e chaves

- **Nunca faça commit de chaves, tokens ou senhas.** Eles ficam só em `.env.local`, na sua máquina.
- O Git ignora `.env` e `.env.*`. A única exceção é o [`.env.example`](../.env.example), que lista as variáveis **sem valor** e serve de modelo.
- Ao precisar de uma variável nova, adicione o nome dela, sem valor, ao `.env.example`.
- Nos arquivos de configuração versionados, como os de MCP, cite a variável (`${PENPOT_ACCESS_TOKEN}`) e nunca o valor.
- Não cole chaves em chats, issues ou PRs. Se uma chave vazar, gere outra no serviço e apague a antiga.

## Git e commits

- Faça os commits **direto na `main`**, sem branch separada.
- Faça push para o `origin`, que é o nosso fork. O original (`upstream`) é só leitura. Veja [Repositório e fork](repositorio-e-fork.md).
- Rode `git pull` antes de começar, porque a sincronização mensal pode ter trazido mudanças.
- Escreva as mensagens no padrão [Conventional Commits](../wiki/conventional-commits.md), em português: `tipo(escopo): descrição`. Exemplos do histórico:
  - `chore(mcp): usa o MCP remoto do Penpot com chave de acesso`
  - `ci: sincroniza o fork com mateusvillain/library todo mês`
  - `docs(wiki): adiciona guia de versionamento semântico`

## Tokens de design

- A **fonte da verdade** são os arquivos JSON em [`tokens/`](../tokens/), exportados do Figma ou do Penpot.
  - `tokens/primitives/` guarda valores brutos: cores, espaçamentos, tipografia.
  - `tokens/semantic/` guarda a intenção de uso: action, text, background etc.
- `src/styles/tokens.css` e `src/styles/tokens.json` são **gerados** pelo `npm run tokens`. Não edite esses arquivos à mão nem faça commit deles: o Git já os ignora.

## Componentes

- Cada componente fica em `src/components/<nome>/`, com `<nome>.css` e `<nome>.stories.js`.
- No CSS, use **só variáveis de token** (`var(--…)`), nunca valores soltos de cor, espaçamento ou fonte.
- Importe o CSS novo em [`src/index.css`](../src/index.css).
- Documente as variantes como `args` no arquivo de stories.

O passo a passo completo está no [README](../README.md#fluxo-para-um-novo-componente).

## Publicação no npm

- Antes da primeira publicação, troque `@seu-usuario` pelo seu usuário do npm no `package.json`.
- Escolha a versão seguindo o [SemVer](../wiki/semver.md).
- O passo a passo está em [Publicar no npm](../wiki/publicar-no-npm.md).
