# Revisão dos componentes com o Magoo

Revisão dos 8 componentes da biblioteca do Penpot (arquivo **Library**, página **Componentes**) com as orientações do [Magoo](https://magoo.cc/pt-br) v1.6.1, de Marcelo Sales, e os critérios de contraste da WCAG 2.2. Feita em novembro de 2026.

## Como ler esta revisão

- **Duas etapas.** A revisão original (abaixo, por componente) olhou o **design** no Penpot. Depois, todos os pontos foram resolvidos nos tokens, no Penpot e no código. A tabela **Resumo** mostra a situação atual; as seções por componente guardam o diagnóstico original.
- **O que o Magoo é:** uma biblioteca de orientações educacionais. Ela não testa nada nem certifica acessibilidade. Os componentes em código foram testados no Chrome (teclado, mouse e árvore de acessibilidade); um teste com leitor de tela real ainda é recomendado antes de publicar.
- **Contraste:** texto precisa de **4,5:1** (WCAG 1.4.3). Bordas e ícones que identificam um controle ou um estado precisam de **3:1** (WCAG 1.4.11). Elementos desabilitados são isentos.

## Resumo

| Componente | Orientação do Magoo | Penpot | Código e documentação | Teste no navegador |
|---|---|---|---|---|
| Button | Botão | ✅ 4 variantes × 3 tamanhos × 5 estados (pressionado e foco adicionados) | ✅ Alinhado ao Penpot: 32/40/48px, variante outline | 19/19 |
| Input | Input "text" | ✅ Hover, somente leitura, obrigatório e erro que explica a correção | ✅ | 28/28 |
| Checkbox | Checkbox | ✅ Marcado, desmarcado e misto × padrão, hover, foco e desabilitado | ✅ | 35/35 |
| Switch | Switch | ✅ Rótulo estável, marca no pino ligado, hover, foco e desabilitado | ✅ | 29/29 |
| Alert | Alertas | ✅ Variante com botão de fechar | ✅ `role="alert"`/`role="status"`, foco previsível ao fechar | 33/33 |
| Card | Cards | ✅ Anotação de acessibilidade; ⚠️ falta a variante com título longo | ✅ "Ver mais" é link com o título no nome acessível | 30/30 |
| Badge | Sem orientação (WCAG) | ✅ Rótulos em português | ✅ | 10/10 |
| Avatar | Sem orientação (WCAG) | ✅ Anotação de acessibilidade | ✅ Nome acessível ou decorativo; variante com foto | 11/11 |

**Tokens.** O Penpot já tinha 213 tokens, incluindo as cores de status. A pasta `tokens/` do repositório estava desatualizada e foi trocada pela exportação completa do Penpot. Quatro tokens foram corrigidos no Penpot para passar na WCAG:

| Token | Antes | Depois |
|---|---|---|
| `color.border.strong` | `neutral.300` (1,48:1) | `neutral.500` (4,83:1) |
| `color.control.track` | `neutral.300` (1,48:1) | `neutral.500` (4,83:1) |
| `color.feedback.warning.icon` | `amber.600` (3,07:1) | `amber.700` (4,84:1) |
| `color.feedback.success.icon` | `green.600` (3,15:1) | `green.700` (4,79:1) |

Com os tokens do Penpot, o danger (`red.600`, 4,83:1) e o hover do secondary (texto `brand.700` sobre `brand.100`, 6,41:1) também passam. A borda do somente leitura do Input usa `color.border.strong`.

**Correção desta revisão:** a primeira versão dizia que o Button do Penpot tinha só o estado padrão. Na verdade ele já tinha 36 variantes (4 variantes × 3 tamanhos × padrão, hover e desabilitado). Faltavam só pressionado e foco.

---

## Input

**Magoo:** *Input "text"*. **No Penpot:** 4 exemplos, que são desabilitado, erro, foco (com texto digitado) e padrão (vazio, com placeholder). Cada um tem rótulo, campo de 40px e texto de ajuda.

| Item do Magoo | Situação |
|---|---|
| Rótulo sempre visível, fora do campo | ✅ O rótulo fica acima do campo e não depende do placeholder |
| Estados vazio, preenchido e com erro | ✅ Vazio, erro e preenchido (no exemplo de foco) |
| Foco | ✅ Borda de 2px em `#6366f1`, com 4,47:1 |
| Desabilitado | ✅ Desenhado |
| Somente leitura | ⚠️ Não desenhado |
| Hover | ⚠️ Não desenhado |
| Obrigatoriedade informada antes da entrada | ⚠️ Não há indicação de campo obrigatório |
| Erro sem depender só da cor | ✅ A borda vermelha vem acompanhada de mensagem em texto. Um ícone de erro reforçaria |
| A mensagem de erro explica como corrigir | ⚠️ O exemplo diz "Mensagem de erro". Documente que a mensagem real diz o que fazer, como "Digite um e-mail com @" |
| Limite de caracteres informado antes | Documentar quando existir |

| Contraste | Valor | Resultado |
|---|---|---|
| Placeholder `#71717a` × branco | 4,83:1 | ✅ |
| Texto de ajuda `#52525b` × branco | 7,73:1 | ✅ |
| Mensagem de erro `#991b1b` × branco | 8,31:1 | ✅ |
| **Borda padrão `#d4d4d8` × branco** | **1,48:1** | ❌ A borda é o que mostra onde fica o campo, e precisa de 3:1 |
| Borda de erro `#dc2626` × branco | 4,83:1 | ✅ |
| Rótulo e texto do desabilitado `#a1a1aa` | 2,3 a 2,6:1 | Isento |

Para a implementação: rótulo ligado ao campo (`<label for>`), ajuda e erro ligados por `aria-describedby`, `aria-invalid="true"` no erro, `required` quando for obrigatório e o valor digitado preservado após o erro.

---

## Checkbox

**Magoo:** *Checkbox*. **No Penpot:** desmarcado e marcado, com caixa de 20px e rótulo "Aceito os termos".

| Item do Magoo | Situação |
|---|---|
| Rótulo ao lado do controle | ✅ |
| Marcado e desmarcado | ✅ |
| Foco | ⚠️ Não desenhado |
| Desabilitado | ⚠️ Não desenhado |
| Hover | ⚠️ Não desenhado |
| Estado misto, quando houver grupo com "selecionar todos" | ⚠️ Não desenhado (só necessário se for usado) |
| O rótulo também é clicável | Documentar: a área de toque inclui o rótulo |
| Grupo com título (`fieldset` e `legend`) | ⚠️ Não há exemplo de grupo |

| Contraste | Valor | Resultado |
|---|---|---|
| **Borda desmarcada `#d4d4d8` × branco** | **1,48:1** | ❌ Abaixo de 3:1: a caixa vazia quase some |
| Caixa marcada `#4f46e5` × branco | 6,29:1 | ✅ |
| Marca ✓ × caixa marcada | 6,29:1 | ✅ |

Área de toque: a caixa tem 20px, mas a linha inteira, com o rótulo, tem 24px de altura. Funciona se o rótulo for clicável.

---

## Switch

**Magoo:** *Switch*. **No Penpot:** desligado e ligado, com trilho de 40×24px, pino de 20px e rótulos "Desativado" e "Ativado".

| Item do Magoo | Situação |
|---|---|
| Estados ligado e desligado claros | ⚠️ A diferença depende da cor e da posição do pino. O pino branco sobre o trilho desligado tem só 1,48:1 |
| **O rótulo descreve a configuração, sem depender do estado** | ❌ Os rótulos são "Desativado" e "Ativado". O Magoo pede um rótulo estável, que diga o que é controlado, como "Notificações por e-mail", e avisa que trocar o rótulo junto com o estado confunde o leitor de tela |
| Foco | ⚠️ Não desenhado |
| Desabilitado | ⚠️ Não desenhado |
| Hover | ⚠️ Não desenhado |
| Sem estado misto | ✅ Só dois estados |
| Uso: configuração aplicada na hora | Documentar. Se a mudança precisar de confirmação, use Checkbox |

| Contraste | Valor | Resultado |
|---|---|---|
| **Trilho desligado `#d4d4d8` × branco** | **1,48:1** | ❌ Abaixo de 3:1 |
| **Pino × trilho desligado** | **1,48:1** | ❌ Abaixo de 3:1 |
| Trilho ligado `#4f46e5` × branco | 6,29:1 | ✅ |

Para a implementação: `<button role="switch" aria-checked>` ou `<input type="checkbox" role="switch">`, alternando com Espaço.

---

## Alert

**Magoo:** *Alertas*. **No Penpot:** erro, aviso, sucesso e informação, cada um com ícone, título e descrição.

| Item do Magoo | Situação |
|---|---|
| O tipo é compreensível sem depender só da cor ou do ícone | ✅ O título em texto ("Algo deu errado", "Atenção"…) diz o tipo |
| O texto diz o que aconteceu e o que fazer | ✅ No erro ("Verifique seu login no npm"). Nos outros, depende do conteúdo |
| Controle para fechar, quando for descartável | Não há variante descartável. Se houver, desenhar o botão de fechar com foco |
| Ações internas (links e botões) com foco | Não há exemplo com ação |
| Urgência e forma de anunciar | ⚠️ Documentar: erro crítico usa `role="alert"`; sucesso e informação usam `role="status"`, que não interrompe a leitura |
| O alerta não some sozinho rápido demais | Documentar |

| Contraste | Valor | Resultado |
|---|---|---|
| Textos (título e descrição) × fundo | 6,8 a 8,0:1 | ✅ |
| Ícone de erro `#dc2626` × fundo | 4,41:1 | ✅ |
| Ícone de informação `#2563eb` × fundo | 4,75:1 | ✅ |
| **Ícone de aviso `#d97706` × fundo** | **3,07:1** | ✅ No limite |
| **Ícone de sucesso `#16a34a` × fundo** | **3,15:1** | ✅ No limite |
| **Glifo branco × ícone de aviso** | **3,19:1** | ✅ No limite. O glifo tem 12px e fica difícil de ler |

O ícone é reforço, porque o título já comunica o tipo. Mesmo assim, aviso e sucesso estão no limite e escurecer um tom deixaria margem.

---

## Card

**Magoo:** *Cards*. **No Penpot:** capa (bloco lilás de 160px), selo "Novo", título, descrição, autor com avatar e botão "Ver mais".

| Item do Magoo | Situação |
|---|---|
| Título e resumo distinguem o card sem depender da imagem | ✅ |
| **Definir se o card é informativo, tem um destino ou várias ações** | ⚠️ Não documentado. "Ver mais" provavelmente leva a outra página, e então é **link**, não Button |
| **Nome da ação identifica o card** | ❌ "Ver mais" é genérico. Numa lista de cards, o leitor de tela ouve vários "Ver mais" iguais. Use "Ver Biblioteca de componentes" ou um `aria-label` com o título |
| Nível de título acompanha a página | ⚠️ Documentar que o título é um `<h2>`/`<h3>` conforme a página, não um nível fixo |
| Texto alternativo da capa | ⚠️ Documentar: capa decorativa não tem texto alternativo; capa informativa precisa de um |
| Títulos longos e telas pequenas | ⚠️ Desenhar uma variante com título longo |
| Card inteiro clicável | Se for, não colocar botão dentro de link, e o foco precisa mostrar a área toda |

| Contraste | Valor | Resultado |
|---|---|---|
| Título `#18181b` × branco | ~17:1 | ✅ |
| Descrição `#52525b` × branco | 7,73:1 | ✅ |
| Botão "Ver mais" | 6,29:1 | ✅ |
| Borda `#e4e4e7` × branco | 1,27:1 | ✅ Aceitável: o card não é um controle, e a borda é decorativa |

O botão do card tem 32px de altura e texto de 14px, como o Button do Penpot, e é diferente do Button em código.

---

## Badge

**Magoo:** sem orientação específica. Revisão pela WCAG. **No Penpot:** Info, Error, Warning, Success, Brand e neutro, com texto de 12px em peso 600 e 19px de altura.

| Item | Situação |
|---|---|
| Significado sem depender só da cor | ✅ O texto diz o tipo |
| Contraste de todas as variantes | ✅ 6,4 a 8,0:1 |
| Tamanho do texto | ⚠️ 12px é o mínimo prático. Evite frases longas |
| Não parecer clicável | ⚠️ Documentar que o Badge é só informativo. Se precisar de clique, use outro componente |
| Rótulos em inglês ("Info", "Error"…) | ⚠️ O resto da biblioteca está em português. Alinhe o idioma ou marque com `lang` |

---

## Avatar

**Magoo:** sem orientação específica. Revisão pela WCAG. **No Penpot:** 64px, 40px e 32px, com iniciais "MV" em `#4338ca` sobre `#e0e7ff`.

| Item | Situação |
|---|---|
| Contraste das iniciais | ✅ 6,41:1 |
| Nome acessível | ⚠️ Documentar: sozinho, o avatar precisa do nome completo (`role="img"` + `aria-label="Mateus Villain"`, ou `alt` numa foto). Ao lado do nome, como no Card, é decorativo e fica oculto com `aria-hidden="true"` |
| Variante com foto | ⚠️ Não desenhada |
| Avatar clicável (perfil) | Se existir, vira link ou botão, com foco e nome |

---

## O que ainda falta

1. **Penpot:** desenhar a variante do Card com título longo (o código já trata).
2. **Leitor de tela real:** testar com NVDA, VoiceOver e TalkBack. O teste automático lê a árvore de acessibilidade, mas não substitui a escuta.
3. **Toque:** o Switch e o Checkbox têm 24px de altura de linha (passam no mínimo de 24px da WCAG 2.5.8, mas ficam abaixo dos 44px recomendados para toque). Avaliar uma variante maior para telas de toque.
4. **Tokens:** para atualizar `tokens/` depois de mudar algo no Penpot, exporte de novo o conjunto `tokens` (pelo MCP do Penpot) mantendo a separação entre primitivos e semânticos.
