/**
 * Stories em HTML puro: cada story devolve uma string de HTML.
 * Os "args" viram controles no painel do Storybook (parecido com o painel
 * de propriedades do Figma/Penpot).
 */
const createButton = ({ label, variant, size, disabled }) => {
  const classes = ['ds-button', `ds-button--${variant}`];
  if (size !== 'md') classes.push(`ds-button--${size}`);

  return `<button class="${classes.join(' ')}"${disabled ? ' disabled' : ''}>${label}</button>`;
};

export default {
  title: 'Componentes/Button',
  tags: ['autodocs'],
  render: createButton,
  argTypes: {
    label: { control: 'text', description: 'Texto do botão' },
    variant: {
      control: 'inline-radio',
      options: ['primary', 'secondary', 'danger'],
      description: 'Estilo visual',
    },
    size: {
      control: 'inline-radio',
      options: ['sm', 'md', 'lg'],
      description: 'Tamanho',
    },
    disabled: { control: 'boolean', description: 'Desabilita a interação' },
  },
  args: {
    label: 'Botão',
    variant: 'primary',
    size: 'md',
    disabled: false,
  },
};

export const Primary = {};

export const Secondary = {
  args: { variant: 'secondary' },
};

export const Danger = {
  args: { variant: 'danger', label: 'Excluir' },
};

export const Disabled = {
  args: { disabled: true },
};

export const Tamanhos = {
  render: (args) => `
    <div style="display: flex; gap: 12px; align-items: center;">
      ${createButton({ ...args, size: 'sm', label: 'Small' })}
      ${createButton({ ...args, size: 'md', label: 'Medium' })}
      ${createButton({ ...args, size: 'lg', label: 'Large' })}
    </div>
  `,
};
