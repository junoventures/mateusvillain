/**
 * Stories em HTML puro: cada story devolve uma string de HTML.
 * O switch é um <input type="checkbox" role="switch"> nativo dentro de um
 * <label>, então foco, Espaço, clique no rótulo e o estado "ligado/desligado"
 * no leitor de tela funcionam sem JavaScript.
 *
 * A página de documentação fica em Switch.mdx.
 */

let uid = 0;

const createSwitch = ({ label, checked, disabled, showStatus }) => {
  const id = `ds-switch-${++uid}`;
  const attrs = [
    'type="checkbox"',
    'role="switch"',
    'class="ds-switch__input"',
    `id="${id}"`,
    checked ? 'checked' : '',
    disabled ? 'disabled' : '',
  ].filter(Boolean);

  const status = showStatus
    ? `<span class="ds-switch__status ds-switch__status--off" aria-hidden="true">Desligado</span>` +
      `<span class="ds-switch__status ds-switch__status--on" aria-hidden="true">Ligado</span>`
    : '';

  return `<label class="ds-switch" for="${id}"><input ${attrs.join(' ')}><span class="ds-switch__track" aria-hidden="true"><span class="ds-switch__knob"></span></span><span class="ds-switch__label">${label}</span>${status}</label>`;
};

export default {
  title: 'Componentes/Switch',
  render: createSwitch,
  argTypes: {
    label: {
      control: 'text',
      description: 'Rótulo estável: descreve a configuração, não o estado',
    },
    checked: { control: 'boolean', description: 'Estado inicial (ligado)' },
    disabled: { control: 'boolean', description: 'Desabilita a interação' },
    showStatus: {
      control: 'boolean',
      description: 'Mostra "Ligado"/"Desligado" ao lado do rótulo, fora do nome acessível',
    },
  },
  args: {
    label: 'Notificações por e-mail',
    checked: false,
    disabled: false,
    showStatus: false,
  },
};

const column = (items) =>
  `<div style="display: flex; flex-direction: column; gap: 16px; align-items: flex-start;">${items.join('')}</div>`;

export const Padrao = { name: 'Padrão' };

export const Ligado = {
  args: { checked: true },
};

export const Desabilitado = {
  render: (args) =>
    column([
      createSwitch({ ...args, label: 'Notificações por e-mail', disabled: true }),
      createSwitch({ ...args, label: 'Notificações por e-mail', disabled: true, checked: true }),
    ]),
};

export const Estados = {
  render: (args) =>
    column([
      createSwitch({ ...args, label: 'Notificações por e-mail' }),
      createSwitch({ ...args, label: 'Notificações por e-mail', checked: true }),
      createSwitch({ ...args, label: 'Notificações por e-mail', disabled: true }),
      createSwitch({ ...args, label: 'Notificações por e-mail', disabled: true, checked: true }),
    ]),
};

export const ComTextoDeEstado = {
  name: 'Com texto de estado',
  args: { showStatus: true },
};

/*
 * Lista de configurações com efeito imediato. Cada switch tem o seu rótulo;
 * o grupo ganha um nome com <fieldset> e <legend>.
 */
export const Grupo = {
  render: (args) => `
    <fieldset style="border: 0; margin: 0; padding: 0; font: var(--typography-body-md); color: var(--color-text-default);">
      <legend style="font: var(--typography-label-lg); margin-bottom: 12px; padding: 0;">Notificações</legend>
      ${column([
        createSwitch({ ...args, label: 'Por e-mail', checked: true }),
        createSwitch({ ...args, label: 'Por SMS' }),
        createSwitch({ ...args, label: 'No aplicativo', checked: true }),
      ])}
    </fieldset>`,
};
