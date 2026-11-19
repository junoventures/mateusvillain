# MCPs

MCPs são conectores que dão aos agentes de IA (Claude Code, VS Code, Cursor, Antigravity) acesso a ferramentas externas. Este projeto configura quatro.

## Onde fica a configuração

Cada editor lê um arquivo diferente, e os quatro precisam ser mantidos iguais:

| Editor | Arquivo |
|---|---|
| Claude Code | [`.mcp.json`](../.mcp.json) |
| VS Code | [`.vscode/mcp.json`](../.vscode/mcp.json) |
| Cursor | [`.cursor/mcp.json`](../.cursor/mcp.json) |
| Antigravity | [`.agents/mcp_config.json`](../.agents/mcp_config.json) |

Na primeira vez, o editor pede para você aprovar os MCPs do projeto.

## Os quatro MCPs

| MCP | Como ativar |
|---|---|
| **Figma** | Faça login na sua conta do Figma quando a ferramenta pedir |
| **Penpot** | Veja a seção abaixo |
| **Storybook** | Rode `npm run storybook`. O MCP fica em `http://localhost:6006/mcp` |
| **[Magoo](https://magoo.cc/pt-br)** | Nada a fazer: inicia sozinho. Traz diretrizes de interação e acessibilidade para componentes. Precisa de Node.js 20.19 ou superior |

## Penpot

Usamos o **MCP oficial do Penpot na nuvem**, no endereço `https://design.penpot.app/mcp/stream`. Ele precisa de uma chave de acesso pessoal.

### 1. Gerar a chave

No Penpot, gere a sua chave de MCP nas configurações da conta. Cada pessoa usa a própria chave.

### 2. Guardar a chave

Copie o [`.env.example`](../.env.example) para `.env.local` e cole a chave:

```bash
cp .env.example .env.local
```

```
PENPOT_ACCESS_TOKEN=sua-chave-aqui
```

O `.env.local` é ignorado pelo Git e nunca vai para o GitHub. Veja as [regras sobre segredos](regras.md#segredos-e-chaves).

### 3. Fazer a chave chegar ao editor

Os arquivos de MCP não guardam a chave. Eles só citam o nome da variável:

| Editor | Como a chave entra |
|---|---|
| Claude Code | Variável de ambiente `PENPOT_ACCESS_TOKEN` |
| Cursor | Variável de ambiente `PENPOT_ACCESS_TOKEN` |
| VS Code | O VS Code pede a chave numa caixa de senha na primeira conexão e guarda o valor |

O Claude Code e o Cursor não leem o `.env.local` sozinhos. Para a variável existir, adicione ao fim do seu `~/.zshrc` (ajuste o caminho da pasta):

```zsh
# Penpot MCP: carrega a chave do .env.local do projeto (não versionado)
if [ -f "$HOME/Documents/GitHub/mateusvillain/.env.local" ]; then
  export PENPOT_ACCESS_TOKEN="$(sed -n 's/^PENPOT_ACCESS_TOKEN=//p' "$HOME/Documents/GitHub/mateusvillain/.env.local" | tr -d "\"' ")"
fi
```

Depois, feche o editor por completo (Cmd+Q) e abra de novo.

### 4. Conectar o Penpot

1. Abra o arquivo de design no Penpot, em [design.penpot.app](https://design.penpot.app).
2. Clique no botão **MCP** da barra de ferramentas até aparecer **MCP connected**.
3. Deixe essa aba aberta enquanto usar o MCP. É por ela que o agente lê e edita o arquivo.

### Problemas comuns

| Mensagem | O que fazer |
|---|---|
| `ECONNREFUSED` ou o `penpot` aparece desconectado | A variável `PENPOT_ACCESS_TOKEN` não chegou ao editor. Confira o `~/.zshrc` e reinicie o editor com Cmd+Q |
| `No Penpot instance connected for user token` | O editor está conectado, mas nenhuma aba do Penpot está. Abra o arquivo e clique no botão **MCP**. Se já estiver conectado, confira se a chave do `.env.local` é a mesma gerada no Penpot |

### Antigravity

O [`.agents/mcp_config.json`](../.agents/mcp_config.json) ainda aponta para o servidor local antigo (`http://localhost:4401/mcp`), porque não foi confirmado se o Antigravity aceita variáveis de ambiente na URL. Para usar o Penpot no Antigravity:

- rode o servidor local com `npm run mcp:penpot`;
- no Penpot, abra **Plugins** (Ctrl/Cmd + Alt + P), instale `http://localhost:4400/manifest.json` e clique em **Connect to MCP server**;
- deixe o painel do plugin aberto.

Se o `npm run mcp:penpot` falhar com `ERR_PNPM_IGNORED_BUILDS`, rode assim:

```bash
pnpm_config_strict_dep_builds=false npm run mcp:penpot
```
