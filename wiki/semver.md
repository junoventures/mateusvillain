# SemVer (Versionamento Semântico)

Um guia rápido para entender os números de versão.

## O que é?

**SemVer** é um padrão para numerar versões. Só de olhar o número, quem usa a biblioteca sabe se a atualização é segura ou se vai precisar ajustar alguma coisa.

Toda versão tem três números:

```
1 . 4 . 2
│   │   └── PATCH: correções
│   └────── MINOR: novidades
└────────── MAJOR: mudanças que quebram algo
```

## Quando aumentar cada número

| Número | Quando aumentar | Exemplo na biblioteca | Commit relacionado |
|---|---|---|---|
| **PATCH** | Corrigiu algo sem mudar como se usa | Ajustou a cor do hover do botão | `fix` |
| **MINOR** | Adicionou algo novo, e o que existia continua funcionando | Criou o componente Card ou a variante `outline` | `feat` |
| **MAJOR** | Mudou ou removeu algo, e quem usa precisa adaptar | Renomeou `.ds-button--danger` para `.ds-button--critical` | qualquer um com `!` |

Ao aumentar um número, **os da direita voltam a zero**:

- `1.4.2` → patch → `1.4.3`
- `1.4.2` → minor → `1.5.0`
- `1.4.2` → major → `2.0.0`

## E as versões 0.x?

Enquanto a versão começa com **0** (como `0.1.0`), a biblioteca é considerada **em desenvolvimento**: qualquer coisa pode mudar a qualquer momento.

Quando ela estiver estável e pronta para outros projetos usarem com confiança, publique a `1.0.0`.

Especificação oficial: [semver.org/lang/pt-BR](https://semver.org/lang/pt-BR/)
