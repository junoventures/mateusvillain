/**
 * Stories do Alert. Cada story devolve um elemento DOM (e não uma string)
 * para que o botão de fechar e os exemplos dinâmicos funcionem.
 *
 * A página de documentação fica em Alert.mdx.
 */

/* Glifo de cada tipo, desenhado dentro de um círculo de 20×20. */
const GLYPHS = {
  error: '<path class="ds-alert__glyph" d="M7 7l6 6M13 7l-6 6" />',
  warning: '<path class="ds-alert__glyph" d="M10 5.5V11M10 14.5v.01" />',
  success: '<path class="ds-alert__glyph" d="M6 10.5l2.5 2.5L14 7.5" />',
  info: '<path class="ds-alert__glyph" d="M10 9v5.5M10 5.5v.01" />',
};

/* Nome do tipo, para quem não enxerga a cor nem o ícone (texto oculto). */
const TYPE_LABEL = { error: 'Erro', warning: 'Aviso', success: 'Sucesso', info: 'Informação' };

const icon = (type) =>
  `<svg class="ds-alert__icon" viewBox="0 0 20 20" aria-hidden="true" focusable="false"><circle cx="10" cy="10" r="10" fill="currentColor" />${GLYPHS[type]}</svg>`;

const closeIcon =
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true" focusable="false"><path d="M6 6l12 12M18 6L6 18" /></svg>';

/* Elementos que podem receber foco, para achar o "próximo elemento lógico". */
const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

/*
 * Fecha o alerta e leva o foco a um ponto previsível:
 *   1. o elemento indicado em data-return-focus (quem abriu o alerta); ou
 *   2. o próximo elemento focável depois do alerta; ou
 *   3. o anterior, se o alerta for o último da página.
 */
export const dismissAlert = (alert) => {
  const all = [...document.querySelectorAll(FOCUSABLE)].filter((el) => !alert.contains(el));
  const byId = alert.dataset.returnFocus && document.getElementById(alert.dataset.returnFocus);
  const after = all.find((el) => alert.compareDocumentPosition(el) & Node.DOCUMENT_POSITION_FOLLOWING);
  const before = all.filter((el) => alert.compareDocumentPosition(el) & Node.DOCUMENT_POSITION_PRECEDING).pop();
  const target = byId || after || before;
  alert.remove();
  target?.focus();
};

export const alertHTML = ({ type, title, description, dismissible, action, live, srType, returnFocus }) => {
  const role = live && live !== 'nenhum' ? ` role="${live}"` : '';
  const ret = returnFocus ? ` data-return-focus="${returnFocus}"` : '';
  const hidden = srType ? `<span class="ds-visually-hidden">${TYPE_LABEL[type]}: </span>` : '';
  const actionHTML = action ? ` <a class="ds-alert__action" href="#">${action}</a>` : '';
  const close = dismissible
    ? `<button type="button" class="ds-alert__close" aria-label="Fechar alerta">${closeIcon}</button>`
    : '';
  return `<div class="ds-alert ds-alert--${type}"${role}${ret}>${icon(type)}<div class="ds-alert__content"><p class="ds-alert__title">${hidden}${title}</p><p class="ds-alert__description">${description}${actionHTML}</p></div>${close}</div>`;
};

/* Liga o botão de fechar de todos os alertas dentro de "root". */
const wire = (root) => {
  root.addEventListener('click', (e) => {
    const btn = e.target.closest('.ds-alert__close');
    if (btn) dismissAlert(btn.closest('.ds-alert'));
    if (e.target.closest('a.ds-alert__action')) e.preventDefault();
  });
  return root;
};

const el = (html, style = 'display: flex; flex-direction: column; gap: 16px; max-width: 480px;') => {
  const wrapper = document.createElement('div');
  wrapper.setAttribute('style', `${style} font-family: var(--font-family-sans);`);
  wrapper.innerHTML = html;
  return wire(wrapper);
};

const createAlert = (args) => el(alertHTML(args));

const EXAMPLES = {
  error: { title: 'Algo deu errado', description: 'Não foi possível publicar o pacote. Verifique seu login no npm e tente de novo.' },
  warning: { title: 'Atenção', description: 'Sua sessão expira em 5 minutos. Salve o que estiver editando.' },
  success: { title: 'Tudo certo!', description: 'As alterações foram salvas.' },
  info: { title: 'Informação', description: 'Uma nova versão da biblioteca está disponível.' },
};

export default {
  title: 'Componentes/Alert',
  // Funções auxiliares exportadas para reúso; não são stories.
  excludeStories: ['dismissAlert', 'alertHTML'],
  render: createAlert,
  argTypes: {
    type: {
      control: 'inline-radio',
      options: ['error', 'warning', 'success', 'info'],
      description: 'Tipo do alerta: muda cores e ícone',
    },
    title: { control: 'text', description: 'Título: diz o tipo ou o que aconteceu, em poucas palavras' },
    description: { control: 'text', description: 'Descrição: o que aconteceu e o que a pessoa pode fazer' },
    dismissible: { control: 'boolean', description: 'Mostra o botão de fechar (definido no código)' },
    action: { control: 'text', description: 'Texto de uma ação interna (link). Vazio = sem ação' },
    live: {
      control: 'inline-radio',
      options: ['nenhum', 'status', 'alert'],
      description: 'Papel de anúncio: `alert` (urgente), `status` (não urgente) ou nenhum (alerta estático)',
    },
    srType: {
      control: 'boolean',
      description: 'Adiciona o nome do tipo em texto oculto antes do título ("Erro: …")',
    },
  },
  args: {
    type: 'error',
    ...EXAMPLES.error,
    dismissible: false,
    action: '',
    live: 'nenhum',
    srType: false,
  },
};

export const Erro = {};

export const Aviso = { args: { type: 'warning', ...EXAMPLES.warning } };

export const Sucesso = { args: { type: 'success', ...EXAMPLES.success } };

export const Informacao = { name: 'Informação', args: { type: 'info', ...EXAMPLES.info } };

export const Tipos = {
  render: (args) =>
    el(['error', 'warning', 'success', 'info'].map((type) => alertHTML({ ...args, type, ...EXAMPLES[type] })).join('')),
};

export const DescricaoLonga = {
  name: 'Descrição longa',
  args: {
    type: 'warning',
    title: 'Atenção',
    description:
      'O arquivo tem mais de 10 MB e pode demorar para ser enviado em conexões lentas. Se possível, compacte as imagens antes de enviar ou divida o conteúdo em partes menores.',
    dismissible: true,
  },
  render: (args) => el(`${alertHTML(args)}<button type="button" class="ds-button ds-button--secondary" style="align-self: flex-start;">Continuar</button>`),
};

export const ComAcao = {
  name: 'Com ação',
  args: {
    type: 'info',
    title: 'Informação',
    description: 'Uma nova versão da biblioteca está disponível.',
    action: 'Ver novidades',
  },
};

/*
 * Descartável: ao fechar, o foco vai para o próximo elemento lógico
 * (aqui, o botão "Continuar"), e não se perde no topo da página.
 */
export const Descartavel = {
  name: 'Descartável',
  args: { type: 'success', ...EXAMPLES.success, dismissible: true },
  render: (args) =>
    el(`${alertHTML(args)}<button type="button" id="alert-proximo" class="ds-button ds-button--primary" style="align-self: flex-start;">Continuar</button>`),
};

/*
 * Anúncio dinâmico: as regiões de anúncio (role="alert" e role="status")
 * já existem vazias quando a página carrega. O alerta é inserido dentro
 * delas, e o leitor de tela lê o conteúdo sem mover o foco.
 * Ao fechar, o foco volta para o botão que gerou o alerta.
 */
export const AnuncioDinamico = {
  name: 'Anúncio dinâmico',
  render: () => {
    const root = el(`
      <div style="display: flex; flex-wrap: wrap; gap: 12px;">
        <button type="button" id="gerar-erro" class="ds-button ds-button--secondary">Publicar com erro</button>
        <button type="button" id="gerar-sucesso" class="ds-button ds-button--primary">Salvar</button>
      </div>
      <div id="regiao-alert" role="alert"></div>
      <div id="regiao-status" role="status"></div>`);
    const show = (regionId, type, triggerId) => {
      root.querySelector(`#${regionId}`).innerHTML = alertHTML({
        type,
        ...EXAMPLES[type],
        dismissible: true,
        returnFocus: triggerId,
      });
    };
    root.querySelector('#gerar-erro').addEventListener('click', () => show('regiao-alert', 'error', 'gerar-erro'));
    root.querySelector('#gerar-sucesso').addEventListener('click', () => show('regiao-status', 'success', 'gerar-sucesso'));
    return root;
  },
};

export const TextoOculto = {
  name: 'Tipo em texto oculto',
  args: {
    type: 'error',
    title: 'Pagamento recusado',
    description: 'O banco não autorizou a compra. Tente outro cartão.',
    srType: true,
  },
};
