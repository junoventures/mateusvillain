# @seu-usuario/ui

Biblioteca de componentes em **HTML + CSS**, do Figma/Penpot ao npm.

## Comandos

| Comando | O que faz |
|---|---|
| `npm install` | Instala as dependências |
| `npm run tokens` | Converte `tokens/*.json` em `src/styles/tokens.css` (Style Dictionary) |
| `npm run storybook` | Gera os tokens e abre o Storybook em http://localhost:6006 |
| `npm run build` | Gera o CSS final em `dist/` |
| `npm publish --access public` | Publica no npm (roda o build antes) |

## Estrutura

```
tokens/                  ← JSON exportado do Figma/Penpot (fonte da verdade)
  primitives/            ← valores brutos (cores, espaçamentos, tipografia)
  semantic/              ← intenção de uso (action, text, background…)
src/
  index.css              ← entrada da biblioteca (importa tudo)
  styles/                ← tokens.css gerado + base.css
  components/<nome>/     ← <nome>.css + <nome>.stories.js
  docs/                  ← páginas MDX do Storybook
style-dictionary.config.js
```

## Fluxo para um novo componente

1. Exporte ou atualize os tokens em `tokens/` e rode `npm run tokens`.
2. Crie `src/components/<nome>/<nome>.css` usando só variáveis `var(--…)`.
3. Importe o CSS em `src/index.css`.
4. Crie `<nome>.stories.js` com as variantes como `args`.

## Antes de publicar

Troque `@seu-usuario` pelo seu usuário do npm no `package.json`.
