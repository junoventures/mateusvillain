/**
 * Stories do Input (campo de texto de uma linha) em HTML puro.
 * Cada story devolve uma string de HTML, exceto a de validação, que devolve
 * um elemento DOM para ter comportamento.
 *
 * A página de documentação fica em Input.mdx.
 */

/* Ícone de erro (círculo com exclamação). Decorativo: o texto da mensagem
   e o aria-invalid já dizem que há erro. */
const ERROR_ICON =
  '<svg class="ds-input__error-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><circle cx="12" cy="12" r="9" /><path d="M12 7.5v5.5M12 16.5h.01" /></svg>';

let counter = 0;

const escape = (value) => String(value).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

const createInput = ({
  label,
  helper,
  placeholder,
  value,
  required,
  disabled,
  readOnly,
  error,
  id,
}) => {
  const fieldId = id || `ds-input-${++counter}`;
  const helperId = `${fieldId}-ajuda`;
  const errorId = `${fieldId}-erro`;
  const hasError = Boolean(error) && !disabled && !readOnly;

  // O erro vem primeiro na descrição: é o que a pessoa precisa resolver.
  const describedBy = [hasError && errorId, helper && helperId].filter(Boolean).join(' ');

  const attrs = [
    'type="text"',
    'class="ds-input__field"',
    `id="${fieldId}"`,
    `name="${fieldId}"`,
    placeholder ? `placeholder="${escape(placeholder)}"` : '',
    value ? `value="${escape(value)}"` : '',
    describedBy ? `aria-describedby="${describedBy}"` : '',
    hasError ? 'aria-invalid="true"' : '',
    required ? 'required' : '',
    disabled ? 'disabled' : '',
    readOnly ? 'readonly' : '',
  ].filter(Boolean);

  return `<div class="ds-input">
  <label class="ds-input__label" for="${fieldId}">${label}${required ? ' <span class="ds-input__required">(obrigatório)</span>' : ''}</label>
  <input ${attrs.join(' ')} />
  ${hasError ? `<p class="ds-input__error" id="${errorId}">${ERROR_ICON}<span><span class="ds-visually-hidden">Erro: </span>${error}</span></p>` : ''}
  ${helper ? `<p class="ds-input__helper" id="${helperId}">${helper}</p>` : ''}
</div>`;
};

/* Largura do desenho no Penpot (280px). O componente é fluido e ocupa
   a largura do contêiner. */
const frame = (html) => `<div style="max-width: 280px;">${html}</div>`;

export default {
  title: 'Componentes/Input',
  render: (args) => frame(createInput(args)),
  argTypes: {
    label: { control: 'text', description: 'Rótulo visível, ligado ao campo por `<label for>`' },
    helper: { control: 'text', description: 'Texto de ajuda abaixo do campo, ligado por `aria-describedby`' },
    placeholder: { control: 'text', description: 'Exemplo de preenchimento. Não substitui o rótulo' },
    value: { control: 'text', description: 'Valor inicial do campo' },
    error: {
      control: 'text',
      description: 'Mensagem de erro. Quando preenchida, liga `aria-invalid="true"` e mostra o ícone',
    },
    required: { control: 'boolean', description: 'Campo obrigatório: atributo `required` + "(obrigatório)" no rótulo' },
    disabled: { control: 'boolean', description: 'Desabilita o campo' },
    readOnly: { control: 'boolean', description: 'Somente leitura: dá para ler, selecionar e copiar, mas não editar' },
    id: { table: { disable: true } },
  },
  args: {
    label: 'Nome completo',
    helper: 'Como aparece no seu documento.',
    placeholder: 'Ex.: Maria da Silva',
    value: '',
    error: '',
    required: false,
    disabled: false,
    readOnly: false,
  },
};

export const Padrao = { name: 'Padrão' };

export const Preenchido = {
  args: { value: 'Maria da Silva' },
};

export const Obrigatorio = {
  name: 'Obrigatório',
  args: { required: true },
};

export const ComErro = {
  name: 'Com erro',
  args: {
    required: true,
    value: 'Maria',
    error: 'Digite o nome e o sobrenome, como em "Maria da Silva".',
  },
};

export const Desabilitado = {
  args: { disabled: true, helper: 'Disponível depois de escolher o tipo de cadastro.' },
};

export const SomenteLeitura = {
  name: 'Somente leitura',
  args: {
    label: 'CPF',
    value: '123.456.789-09',
    placeholder: '',
    readOnly: true,
    helper: 'O CPF não pode ser alterado. Fale com o suporte se estiver errado.',
  },
};

export const Estados = {
  render: (args) => `<div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 24px 32px;">
    ${createInput({ ...args, label: 'Padrão', value: '' })}
    ${createInput({ ...args, label: 'Preenchido', value: 'Maria da Silva' })}
    ${createInput({ ...args, label: 'Obrigatório', value: '', required: true })}
    ${createInput({ ...args, label: 'Com erro', value: 'Maria', error: 'Digite o nome e o sobrenome.' })}
    ${createInput({ ...args, label: 'Somente leitura', value: 'Maria da Silva', readOnly: true, helper: 'Não pode ser alterado aqui.' })}
    ${createInput({ ...args, label: 'Desabilitado', value: '', disabled: true })}
  </div>`,
};

/*
 * Validação no envio: o erro aparece só depois de tentar enviar, o foco vai
 * para o campo inválido e o valor digitado é preservado. Ao corrigir, o erro
 * some no próximo envio ou quando o campo perde o foco.
 */
export const Validacao = {
  name: 'Validação',
  render: () => {
    const wrapper = document.createElement('form');
    wrapper.noValidate = true;
    wrapper.style.cssText = 'display: flex; flex-direction: column; gap: 16px; max-width: 280px;';
    wrapper.innerHTML = `
      ${createInput({
        id: 'cadastro-nome',
        label: 'Nome completo',
        helper: 'Como aparece no seu documento.',
        placeholder: 'Ex.: Maria da Silva',
        required: true,
      })}
      <div><button type="submit" class="ds-button ds-button--primary">Enviar</button></div>
      <p id="cadastro-status" role="status" style="margin: 0; font: var(--typography-body-sm); color: var(--color-text-default);"></p>`;

    const field = wrapper.querySelector('input');
    const container = wrapper.querySelector('.ds-input');
    const helper = wrapper.querySelector('.ds-input__helper');
    const status = wrapper.querySelector('#cadastro-status');

    const messageFor = (value) => {
      const text = value.trim();
      if (!text) return 'Digite seu nome completo.';
      if (text.split(/\s+/).length < 2) return 'Digite o nome e o sobrenome, como em "Maria da Silva".';
      return '';
    };

    const setError = (message) => {
      container.querySelector('.ds-input__error')?.remove();
      if (message) {
        const p = document.createElement('p');
        p.className = 'ds-input__error';
        p.id = 'cadastro-nome-erro';
        p.innerHTML = `${ERROR_ICON}<span><span class="ds-visually-hidden">Erro: </span>${message}</span>`;
        container.insertBefore(p, helper);
        field.setAttribute('aria-invalid', 'true');
        field.setAttribute('aria-describedby', 'cadastro-nome-erro cadastro-nome-ajuda');
      } else {
        field.removeAttribute('aria-invalid');
        field.setAttribute('aria-describedby', 'cadastro-nome-ajuda');
      }
    };

    wrapper.addEventListener('submit', (event) => {
      event.preventDefault();
      const message = messageFor(field.value);
      setError(message);
      if (message) {
        status.textContent = '';
        field.focus();
      } else {
        status.textContent = `Cadastro enviado para ${field.value.trim()}.`;
      }
    });

    // Depois do primeiro erro, revalida ao sair do campo (não a cada tecla).
    field.addEventListener('blur', () => {
      if (field.getAttribute('aria-invalid') === 'true') setError(messageFor(field.value));
    });

    return wrapper;
  },
};
