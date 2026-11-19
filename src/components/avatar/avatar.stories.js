/**
 * Stories do Avatar em HTML puro: cada story devolve uma string de HTML.
 * A página de documentação fica em Avatar.mdx.
 *
 * Regra do nome acessível:
 *   - sozinho: role="img" + aria-label com o nome completo (ou alt na foto);
 *   - ao lado do nome visível: decorativo, com aria-hidden="true".
 * As iniciais também levam aria-hidden: o nome vem só do aria-label,
 * e o leitor de tela nunca lê "M V" soltos.
 */

/* Foto de exemplo: ilustração em SVG embutida, para não depender de rede. */
export const SAMPLE_PHOTO =
  'data:image/svg+xml,' +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128">' +
      '<rect width="128" height="128" fill="#c7d2fe"/>' +
      '<circle cx="64" cy="50" r="24" fill="#4338ca"/>' +
      '<path d="M20 128c4-28 22-42 44-42s40 14 44 42z" fill="#4338ca"/>' +
      '</svg>',
  );

export const initialsOf = (name) =>
  name
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => part[0])
    .filter((_, i, all) => i === 0 || i === all.length - 1)
    .join('')
    .toUpperCase();

export const createAvatar = ({ name, size = 'md', photo = false, decorative = false }) => {
  const classes = ['ds-avatar'];
  if (size !== 'md') classes.push(`ds-avatar--${size}`);

  if (photo) {
    // A foto carrega o nome no alt; decorativa, alt vazio e o contêiner oculto.
    const alt = decorative ? '' : name;
    const hidden = decorative ? ' aria-hidden="true"' : '';
    return `<span class="${classes.join(' ')}"${hidden}><img class="ds-avatar__img" src="${SAMPLE_PHOTO}" alt="${alt}" width="128" height="128"></span>`;
  }

  const a11y = decorative ? 'aria-hidden="true"' : `role="img" aria-label="${name}"`;
  return `<span class="${classes.join(' ')}" ${a11y}><span class="ds-avatar__initials" aria-hidden="true">${initialsOf(name)}</span></span>`;
};

export default {
  title: 'Componentes/Avatar',
  // Funções auxiliares exportadas para o Card; não são stories.
  excludeStories: ['createAvatar', 'initialsOf', 'SAMPLE_PHOTO'],
  render: createAvatar,
  argTypes: {
    name: { control: 'text', description: 'Nome completo. Gera as iniciais e o nome acessível' },
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg'], description: 'Tamanho' },
    photo: { control: 'boolean', description: 'Mostra a foto no lugar das iniciais' },
    decorative: {
      control: 'boolean',
      description: 'Use quando o nome já aparece ao lado: o avatar fica oculto do leitor de tela',
    },
  },
  args: {
    name: 'Mateus Villain',
    size: 'md',
    photo: false,
    decorative: false,
  },
};

const row = (items) =>
  `<div style="display: flex; flex-wrap: wrap; gap: 16px; align-items: center;">${items.join('')}</div>`;

export const Padrao = { name: 'Padrão' };

export const Tamanhos = {
  render: (args) => row(['sm', 'md', 'lg'].map((size) => createAvatar({ ...args, size }))),
};

export const ComFoto = {
  name: 'Com foto',
  args: { photo: true },
  render: (args) => row(['sm', 'md', 'lg'].map((size) => createAvatar({ ...args, size }))),
};

/* Ao lado do nome visível: o avatar é decorativo e o leitor de tela lê só o nome. */
export const ComNome = {
  name: 'Com nome',
  render: (args) => `
    <div style="display: flex; align-items: center; gap: 8px; font: var(--typography-label-md); color: var(--color-text-default);">
      ${createAvatar({ ...args, size: 'sm', decorative: true })}
      <span>${args.name}</span>
    </div>`,
};

export const Grupo = {
  render: () => `
    <ul aria-label="Pessoas no projeto" style="list-style: none; margin: 0; padding: 0; display: flex; gap: 8px;">
      ${['Mateus Villain', 'Ana Souza', 'Carlos Lima', 'Beatriz Rocha']
        .map((name) => `<li>${createAvatar({ name, size: 'md' })}</li>`)
        .join('')}
    </ul>`,
};
