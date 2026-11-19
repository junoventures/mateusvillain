/**
 * Stories do Checkbox. Cada story devolve um elemento DOM (e não só uma
 * string), porque o estado misto só existe pela propriedade `indeterminate`,
 * que precisa ser definida em JavaScript: não há atributo HTML para ele.
 *
 * A página de documentação fica em Checkbox.mdx.
 */

let uid = 0;
const nextId = (prefix) => `${prefix}-${++uid}`;

/* Devolve o HTML de uma linha (caixa + rótulo) e, se houver, do texto de ajuda. */
const checkboxHTML = ({ label, name, value, checked, disabled, invalid, hint, error, indeterminate }) => {
  const id = nextId('cb');
  const message = error || hint;
  const messageId = message ? `${id}-msg` : '';

  const attrs = [
    'type="checkbox"',
    'class="ds-checkbox__input"',
    `id="${id}"`,
    name ? `name="${name}"` : '',
    value ? `value="${value}"` : '',
    checked ? 'checked' : '',
    disabled ? 'disabled' : '',
    invalid || error ? 'aria-invalid="true"' : '',
    messageId ? `aria-describedby="${messageId}"` : '',
    indeterminate ? 'data-indeterminate' : '',
  ].filter(Boolean);

  const row = `<label class="ds-checkbox"><input ${attrs.join(' ')} /><span class="ds-checkbox__label">${label}</span></label>`;
  if (!message) return row;

  const cls = error ? 'ds-checkbox__hint ds-checkbox__hint--error' : 'ds-checkbox__hint';
  return `<div class="ds-checkbox-field">${row}<p class="${cls}" id="${messageId}">${message}</p></div>`;
};

/* Converte HTML em elemento e aplica o estado misto onde foi pedido. */
const toElement = (html) => {
  const wrapper = document.createElement('div');
  wrapper.innerHTML = html;
  wrapper.querySelectorAll('[data-indeterminate]').forEach((input) => {
    input.indeterminate = true;
    input.removeAttribute('data-indeterminate');
  });
  return wrapper.childElementCount === 1 ? wrapper.firstElementChild : wrapper;
};

const createCheckbox = (args) => toElement(checkboxHTML(args));

export default {
  title: 'Componentes/Checkbox',
  render: createCheckbox,
  argTypes: {
    label: { control: 'text', description: 'Rótulo. É o nome acessível do checkbox' },
    checked: { control: 'boolean', description: 'Marcado (atributo `checked`)' },
    indeterminate: {
      control: 'boolean',
      description: 'Estado misto (propriedade `indeterminate`, definida em JavaScript)',
    },
    disabled: { control: 'boolean', description: 'Desabilita a interação (atributo `disabled`)' },
    hint: { control: 'text', description: 'Texto de ajuda, ligado por `aria-describedby`' },
    error: {
      control: 'text',
      description: 'Mensagem de erro. Também aplica `aria-invalid="true"`',
    },
  },
  args: {
    label: 'Aceito os termos',
    checked: false,
    indeterminate: false,
    disabled: false,
    hint: '',
    error: '',
  },
};

const stack = (items) =>
  `<div style="display: flex; flex-direction: column; align-items: flex-start; gap: 16px;">${items.join('')}</div>`;

export const Padrao = { name: 'Padrão' };

export const Marcado = {
  args: { checked: true },
};

export const Misto = {
  args: { indeterminate: true, label: 'Selecionar todos' },
};

export const Desabilitado = {
  args: { disabled: true },
};

export const ComAjuda = {
  name: 'Com ajuda',
  args: {
    label: 'Receber novidades por e-mail',
    hint: 'No máximo uma mensagem por semana.',
  },
};

export const ComErro = {
  name: 'Com erro',
  args: {
    error: 'Marque esta opção para continuar.',
  },
};

export const Estados = {
  render: () =>
    toElement(
      stack([
        checkboxHTML({ label: 'Desmarcado' }),
        checkboxHTML({ label: 'Marcado', checked: true }),
        checkboxHTML({ label: 'Misto', indeterminate: true }),
        checkboxHTML({ label: 'Desabilitado', disabled: true }),
        checkboxHTML({ label: 'Desabilitado e marcado', disabled: true, checked: true }),
        checkboxHTML({ label: 'Com erro', invalid: true }),
      ]),
    ),
};

export const RotuloLongo = {
  name: 'Rótulo longo',
  render: () =>
    toElement(
      `<div style="max-width: 320px;">${checkboxHTML({
        label:
          'Autorizo o uso dos meus dados para envio de ofertas personalizadas, conforme a política de privacidade.',
      })}</div>`,
    ),
};

export const Grupo = {
  render: () =>
    toElement(`
      <fieldset class="ds-checkbox-group">
        <legend class="ds-checkbox-group__legend">Notificações</legend>
        ${checkboxHTML({ label: 'E-mail', name: 'notificacoes', value: 'email', checked: true })}
        ${checkboxHTML({ label: 'SMS', name: 'notificacoes', value: 'sms' })}
        ${checkboxHTML({ label: 'Push no celular', name: 'notificacoes', value: 'push' })}
      </fieldset>`),
};

/*
 * "Selecionar todos": o pai fica misto quando só parte dos filhos está
 * marcada. Regra de alternância: clicar no pai misto marca todos; clicar
 * no pai marcado desmarca todos.
 */
export const SelecionarTodos = {
  name: 'Selecionar todos',
  render: () => {
    const el = toElement(`
      <fieldset class="ds-checkbox-group">
        <legend class="ds-checkbox-group__legend">Coberturas</legend>
        ${checkboxHTML({ label: 'Selecionar todas' })}
        <div class="ds-checkbox-group__children">
          ${checkboxHTML({ label: 'Queijo', name: 'coberturas', value: 'queijo', checked: true })}
          ${checkboxHTML({ label: 'Tomate', name: 'coberturas', value: 'tomate' })}
          ${checkboxHTML({ label: 'Cebola', name: 'coberturas', value: 'cebola' })}
        </div>
      </fieldset>`);
    const [parent, ...children] = el.querySelectorAll('.ds-checkbox__input');

    const sync = () => {
      const marked = children.filter((c) => c.checked).length;
      parent.checked = marked === children.length;
      parent.indeterminate = marked > 0 && marked < children.length;
    };
    parent.addEventListener('change', () => {
      children.forEach((c) => (c.checked = parent.checked));
      sync();
    });
    children.forEach((c) => c.addEventListener('change', sync));
    sync();
    return el;
  },
};

export const GrupoComErro = {
  name: 'Grupo com erro',
  render: () => {
    const errorId = nextId('grupo-erro');
    return toElement(`
      <fieldset class="ds-checkbox-group" aria-describedby="${errorId}">
        <legend class="ds-checkbox-group__legend">Como prefere ser contatado?</legend>
        ${checkboxHTML({ label: 'E-mail', name: 'contato', value: 'email', invalid: true })}
        ${checkboxHTML({ label: 'Telefone', name: 'contato', value: 'telefone', invalid: true })}
        <p class="ds-checkbox__hint ds-checkbox__hint--error" id="${errorId}">Escolha pelo menos uma opção.</p>
      </fieldset>`);
  },
};
