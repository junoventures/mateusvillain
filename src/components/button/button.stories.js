/**
 * Stories em HTML puro: cada story devolve uma string de HTML.
 * Os "args" viram controles no painel do Storybook (parecido com o painel
 * de propriedades do Figma/Penpot).
 *
 * A página de documentação fica em Button.mdx.
 */

/* Ícones de exemplo (traço de 2px, herdam a cor do texto). */
const ICONS = {
  plus: '<path d="M12 5v14M5 12h14" />',
  arrow: '<path d="M5 12h14M13 6l6 6-6 6" />',
  trash: '<path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3" />',
};

const icon = (name, position) =>
  `<svg class="ds-button__icon ds-button__icon--${position}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${ICONS[name]}</svg>`;

const createButton =({ label, variant, size, disabled, iconStart, iconEnd, iconOnly }) => {
  const classes = ['ds-button', `ds-button--${variant}`];
  if (size !== 'md') classes.push(`ds-button--${size}`);
  if (iconOnly) classes.push('ds-button--icon-only');

  const content = iconOnly
    ? icon(iconOnly, 'only')
    : [iconStart && icon(iconStart, 'start'), label, iconEnd && icon(iconEnd, 'end')]
        .filter(Boolean)
        .join('');

  const attrs = [
    'type="button"',
    `class="${classes.join(' ')}"`,
    iconOnly ? `aria-label="${label}"` : '',
    disabled ? 'disabled' : '',
  ].filter(Boolean);

  return `<button ${attrs.join(' ')}>${content}</button>`;
};

const iconOptions = [null, 'plus', 'arrow', 'trash'];

export default {
  title: 'Componentes/Button',
  render: createButton,
  argTypes: {
    label: {
      control: 'text',
      description: 'Texto do botão. No botão só com ícone, vira o `aria-label`',
    },
    variant: {
      control: 'inline-radio',
      options: ['primary', 'secondary', 'outline', 'danger'],
      description: 'Estilo visual',
    },
    size: {
      control: 'inline-radio',
      options: ['sm', 'md', 'lg'],
      description: 'Tamanho',
    },
    iconStart: { control: 'select', options: iconOptions, description: 'Ícone antes do texto' },
    iconEnd: { control: 'select', options: iconOptions, description: 'Ícone depois do texto' },
    iconOnly: { control: 'select', options: iconOptions, description: 'Mostra só o ícone' },
    disabled: { control: 'boolean', description: 'Desabilita a interação' },
  },
  args: {
    label: 'Botão',
    variant: 'primary',
    size: 'md',
    iconStart: null,
    iconEnd: null,
    iconOnly: null,
    disabled: false,
  },
};

const row = (items) =>
  `<div style="display: flex; flex-wrap: wrap; gap: 12px; align-items: center;">${items.join('')}</div>`;

export const Primary = {};

export const Secondary = {
  args: { variant: 'secondary' },
};

export const Outline = {
  args: { variant: 'outline', label: 'Cancelar' },
};

export const Danger = {
  args: { variant: 'danger', label: 'Excluir' },
};

export const Disabled = {
  args: { disabled: true },
};

export const Variantes = {
  render: (args) =>
    row([
      createButton({ ...args, variant: 'primary', label: 'Salvar' }),
      createButton({ ...args, variant: 'secondary', label: 'Voltar' }),
      createButton({ ...args, variant: 'outline', label: 'Cancelar' }),
      createButton({ ...args, variant: 'danger', label: 'Excluir' }),
    ]),
};

export const Tamanhos = {
  render: (args) =>
    row([
      createButton({ ...args, size: 'sm', label: 'Small' }),
      createButton({ ...args, size: 'md', label: 'Medium' }),
      createButton({ ...args, size: 'lg', label: 'Large' }),
    ]),
};

export const ComIcone = {
  name: 'Com ícone',
  render: (args) =>
    row([
      createButton({ ...args, iconStart: 'plus', label: 'Adicionar' }),
      createButton({ ...args, variant: 'secondary', iconEnd: 'arrow', label: 'Continuar' }),
      createButton({ ...args, variant: 'danger', iconStart: 'trash', label: 'Excluir' }),
    ]),
};

export const SomenteIcone = {
  name: 'Só ícone',
  render: (args) =>
    row(
      ['sm', 'md', 'lg'].map((size) =>
        createButton({ ...args, size, iconOnly: 'plus', label: 'Adicionar item' }),
      ),
    ),
};

export const IconesPorTamanho = {
  name: 'Ícones por tamanho',
  render: (args) =>
    row(
      ['sm', 'md', 'lg'].map((size) =>
        createButton({ ...args, size, iconStart: 'plus', label: 'Adicionar' }),
      ),
    ),
};

/*
 * Botão que abre e fecha um conteúdo: anuncia o estado com aria-expanded
 * e aponta o alvo com aria-controls. Devolve um elemento DOM (e não uma
 * string) para poder ter o comportamento de clique.
 */
export const AbreEFecha = {
  name: 'Abre e fecha',
  render: (args) => {
    const wrapper = document.createElement('div');
    wrapper.innerHTML = `
      ${createButton({ ...args, variant: 'secondary', iconEnd: null, label: 'Mostrar detalhes' })}
      <div id="detalhes-pedido" hidden style="margin-top: 12px; font-family: var(--font-family-sans);">
        Pedido nº 1234 · Entrega prevista em 3 dias úteis.
      </div>`;
    const button = wrapper.querySelector('button');
    const panel = wrapper.querySelector('#detalhes-pedido');
    button.setAttribute('aria-expanded', 'false');
    button.setAttribute('aria-controls', 'detalhes-pedido');
    button.addEventListener('click', () => {
      const open = button.getAttribute('aria-expanded') === 'true';
      button.setAttribute('aria-expanded', String(!open));
      button.textContent = open ? 'Mostrar detalhes' : 'Ocultar detalhes';
      panel.hidden = open;
    });
    return wrapper;
  },
};

export const Estados = {
  render: (args) =>
    row([
      createButton({ ...args, label: 'Padrão' }),
      createButton({ ...args, label: 'Desabilitado', disabled: true }),
    ]),
};
