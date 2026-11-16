# Git

Um guia rápido para quem está começando.

## O que é o Git?

O Git guarda o **histórico** do projeto. Funciona como os "pontos de salvamento" de um jogo, ou o histórico de versões do Figma: cada vez que você salva um ponto, ele vira um **commit**. Dá para ver o que mudou, quando mudou e voltar atrás se precisar.

O **GitHub** é o site onde esse histórico fica guardado online, para o time inteiro acessar.

## O fluxo básico

```
editar arquivos  →  git add  →  git commit  →  git push
   (trabalho)       (separar)    (salvar)       (enviar)
```

## Comandos essenciais

| Comando | O que faz |
|---|---|
| `git clone <link>` | Baixa um projeto do GitHub para o seu computador (só na primeira vez) |
| `git status` | Mostra o que mudou desde o último commit |
| `git add <arquivo>` | Separa um arquivo para entrar no próximo commit |
| `git add .` | Separa **todos** os arquivos alterados |
| `git commit -m "mensagem"` | Salva o que foi separado, com uma mensagem explicando a mudança |
| `git push` | Envia seus commits para o GitHub |
| `git pull` | Baixa as mudanças mais recentes do GitHub |
| `git log --oneline` | Lista os commits do projeto, um por linha |

### Trabalhando em uma branch

Uma **branch** é uma cópia paralela do projeto, onde você pode mexer sem afetar a versão principal (`main`).

| Comando | O que faz |
|---|---|
| `git switch -c minha-branch` | Cria uma branch nova e entra nela |
| `git switch main` | Volta para a branch principal |
| `git branch` | Lista as branches e mostra em qual você está |

### Exemplo do dia a dia

```bash
git pull                                   # pega as novidades
git status                                 # vê o que você mudou
git add .                                  # separa tudo
git commit -m "feat(button): adiciona variante outline"
git push                                   # envia para o GitHub
```

> A mensagem do commit segue um padrão. Veja [Conventional Commits](./conventional-commits.md).
