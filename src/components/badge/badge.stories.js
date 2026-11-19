/**
 * Stories do Badge em HTML puro: cada story devolve uma string de HTML.
 * A página de documentação fica em Badge.mdx.
 *
 * O Badge é um <span> sem papel nem foco: o leitor de tela lê o texto
 * junto com o conteúdo ao redor.
 */

export const createBadge = ({ label, variant = 'neutral', context = '' }) => {
  const classes = ['ds-badge'];
  if (variant && variant !== 'neutral') classes.push(`ds-badge--${variant}`);
  const prefix = context ? `<span class="ds-visually-hidden">${context} </span>` : '';
  return `<span class="${classes.join(' ')}">${prefix}${label}</span>`;
};

export default {
  title: 'Componentes/Badge',
  // Funções auxiliares exportadas para o Card; não são stories.
  excludeStories: ['createBadge'],
  render: createBadge,
  argTypes: {
    label: { control: 'text', description: 'Texto do selo. É ele que carrega o significado' },
    variant: {
      control: 'inline-radio',
      options: ['info', 'success', 'warning', 'error', 'brand', 'neutral'],
      description: 'Cor do selo. Reforça o texto, não o substitui',
    },
    context: {
      control: 'text',
      description: 'Prefixo só para leitores de tela (por exemplo, "Status:"), dentro de `.ds-visually-hidden`',
    },
  },
  args: {
    label: 'Novo',
    variant: 'brand',
    context: '',
  },
};

const row = (items) =>
  `<div style="display: flex; flex-wrap: wrap; gap: 12px; align-items: center;">${items.join('')}</div>`;

export const Padrao = { name: 'Padrão' };

export const Variantes = {
  render: () =>
    row([
      createBadge({ variant: 'info', label: 'Em análise' }),
      createBadge({ variant: 'success', label: 'Aprovado' }),
      createBadge({ variant: 'warning', label: 'Pendente' }),
      createBadge({ variant: 'error', label: 'Recusado' }),
      createBadge({ variant: 'brand', label: 'Novo' }),
      createBadge({ variant: 'neutral', label: 'Rascunho' }),
    ]),
};

/* Badge junto do conteúdo que ele qualifica, como numa lista de pedidos. */
export const EmContexto = {
  name: 'Em contexto',
  render: () => `
    <ul style="list-style: none; margin: 0; padding: 0; display: grid; gap: 12px; font: var(--typography-body-md); color: var(--color-text-default);">
      <li style="display: flex; gap: 8px; align-items: center;">Pedido nº 1234 ${createBadge({ variant: 'success', label: 'Entregue', context: 'Status:' })}</li>
      <li style="display: flex; gap: 8px; align-items: center;">Pedido nº 1235 ${createBadge({ variant: 'warning', label: 'Pagamento pendente', context: 'Status:' })}</li>
      <li style="display: flex; gap: 8px; align-items: center;">Pedido nº 1236 ${createBadge({ variant: 'error', label: 'Cancelado', context: 'Status:' })}</li>
    </ul>`,
};

export const TextoLongo = {
  name: 'Texto longo',
  args: { variant: 'info', label: 'Aguardando aprovação do financeiro' },
};
