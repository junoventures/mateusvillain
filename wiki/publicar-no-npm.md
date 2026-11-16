# Publicar no npm

Um guia rápido para colocar a biblioteca no ar.

## O que é o npm?

O **npm** é uma "loja" gratuita de pacotes de código. Quando você publica a biblioteca lá, qualquer pessoa ou projeto pode instalar com um comando:

```bash
npm install @seu-usuario/ui
```

## Antes de começar (só uma vez)

1. Crie uma conta em [npmjs.com](https://www.npmjs.com/signup).
2. Ative a **verificação em duas etapas (2FA)** em *Account → Two-Factor Authentication*. Sem ela, o npm não deixa publicar.

## Passo a passo

### 1. Dê um nome ao pacote

No arquivo `package.json`, troque `seu-usuario` pelo seu usuário do npm:

```json
"name": "@seu-usuario/ui"
```

O `@seu-usuario` é o **escopo**: funciona como uma pasta com o seu nome, então ninguém mais pode usar.

### 2. Faça login

```bash
npm login     # abre o navegador para você entrar
npm whoami    # mostra seu usuário se o login funcionou
```

### 3. Confira o que vai ser enviado

```bash
npm pack --dry-run
```

Devem aparecer só os arquivos da pasta `dist/` e o `package.json`.

### 4. Publique

```bash
npm publish --access public
```

O npm vai pedir o código do 2FA. Pronto: o pacote aparece em `npmjs.com/package/@seu-usuario/ui`.

> O `--access public` é necessário na primeira vez. Sem ele, o npm tenta publicar como pacote privado, que é pago.

## Publicando uma atualização

O npm não aceita publicar duas vezes a mesma versão. Antes de publicar de novo, aumente o número da versão:

| Comando | Exemplo | Quando usar |
|---|---|---|
| `npm version patch` | 0.1.0 → 0.1.1 | Correções (commits `fix`) |
| `npm version minor` | 0.1.0 → 0.2.0 | Novidades (commits `feat`) |
| `npm version major` | 0.1.0 → 1.0.0 | Mudanças que quebram algo (commits com `!`) |

Depois:

```bash
npm publish
git push --follow-tags
```

Veja também: [Conventional Commits](./conventional-commits.md), para entender os tipos de commit.

## Deu erro?

| Erro | O que fazer |
|---|---|
| `ENEEDAUTH` ou `401` | Você não está logado: rode `npm login` |
| `403 Forbidden` | O nome já existe ou o escopo não é seu: confira o `name` no `package.json` |
| `cannot publish over the previously published versions` | Rode `npm version patch` e publique de novo |
| `402 Payment Required` | Faltou o `--access public` |
