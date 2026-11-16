# Conventional Commits

Um guia rápido para quem está começando.

## O que é?

É um **padrão para escrever a mensagem do commit**. Em vez de mensagens soltas como "ajustes" ou "agora vai", todo mundo segue o mesmo formato. Assim o histórico fica fácil de ler, e ferramentas conseguem gerar changelogs e versões automaticamente.

## O formato

```
tipo(escopo): descrição curta
```

- **tipo**: que tipo de mudança é (veja a tabela abaixo)
- **escopo** *(opcional)*: qual parte do projeto foi mexida, como `button` ou `tokens`
- **descrição**: o que foi feito, curto e no imperativo ("adiciona", "corrige", "remove")

## Tipos mais usados

| Tipo | Quando usar | Exemplo |
|---|---|---|
| `feat` | Algo **novo** | `feat(card): adiciona componente Card` |
| `fix` | **Correção** de um problema | `fix(button): corrige cor do hover` |
| `docs` | Só **documentação** | `docs: atualiza README` |
| `style` | Formatação do código, sem mudar o resultado | `style: ajusta indentação` |
| `refactor` | Reorganiza o código sem mudar o comportamento | `refactor(tokens): renomeia cores semânticas` |
| `chore` | Tarefas de manutenção (dependências, configuração) | `chore: atualiza Storybook` |

## Mudança que quebra compatibilidade

Se a mudança obriga quem usa a biblioteca a ajustar algo (por exemplo, renomear uma classe CSS), adicione um `!` depois do tipo:

```
feat(button)!: renomeia .ds-button--danger para .ds-button--critical
```

## Dicas

- **Um commit, uma ideia.** Mudou o botão e os tokens? Prefira dois commits.
- **Descrição curta**, de preferência com até 50 caracteres.
- **Na dúvida entre `feat` e `fix`:** se antes não existia, é `feat`; se existia e estava errado, é `fix`.

Para saber mais, veja a especificação oficial em [conventionalcommits.org/pt-br](https://www.conventionalcommits.org/pt-br/).
