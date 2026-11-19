# Repositório e fork

## De onde vem o código

Este projeto é um **fork** de [`mateusvillain/library`](https://github.com/mateusvillain/library), o repositório original, mantido pelo Mateus Villain.

A nossa cópia fica em [`junoventures/mateusvillain`](https://github.com/junoventures/mateusvillain). Só temos permissão de escrita aqui. No original, a nossa conta só tem acesso de leitura.

```
mateusvillain/library          ← original (só leitura para nós)
        │
        │  sincronização mensal automática
        ▼
junoventures/mateusvillain     ← nosso fork (onde fazemos push)
        │
        │  git pull / git push
        ▼
pasta local
```

## Remotes

Na pasta local, os remotes ficam assim:

| Remote | Aponta para | Uso |
|---|---|---|
| `origin` | `junoventures/mateusvillain` | Onde fazemos `git push` e `git pull` |
| `upstream` | `mateusvillain/library` | Só para buscar as novidades do original |

Para conferir: `git remote -v`.

Se você clonar o projeto do zero, adicione o `upstream`:

```bash
git clone https://github.com/junoventures/mateusvillain.git
cd mateusvillain
git remote add upstream https://github.com/mateusvillain/library.git
```

## Sincronização mensal com o original

O workflow [`.github/workflows/sync-upstream.yml`](../.github/workflows/sync-upstream.yml) traz as mudanças do original para a nossa `main`.

- **Quando roda:** todo dia 1 do mês, às 06:00 de Brasília (09:00 UTC).
- **Como rodar na hora:** no GitHub, abra **Actions** → **Sincronizar com o original** → **Run workflow**.
- **O que faz:** chama a API `merge-upstream` do GitHub. Se o original não tem nada novo, não faz nada. Se tem e não há conflito, faz um fast-forward ou cria um commit de merge na `main`.

### Se houver conflito

Quando o original e nós mudamos as mesmas linhas, a execução falha e o GitHub avisa por e-mail. Resolva à mão:

```bash
git pull                     # traz o que já está no nosso fork
git fetch upstream
git merge upstream/main      # resolva os conflitos que aparecerem
git push
```

### Depois de cada sincronização

A sincronização atualiza o GitHub, não a sua pasta local. Antes de começar a trabalhar, rode `git pull`.

### Se o agendamento parar

O GitHub desativa workflows agendados em repositórios públicos que ficam 60 dias sem atividade. Para reativar, abra a aba **Actions**, selecione o workflow e clique em **Enable workflow**.

## Mandar uma mudança para o original

Um push no nosso fork não chega ao repositório do Mateus. Para propor uma mudança a ele, abra um pull request do `junoventures/mateusvillain` para o `mateusvillain/library`:

```bash
gh pr create --repo mateusvillain/library --head junoventures:main
```
