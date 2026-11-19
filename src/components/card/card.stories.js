/**
 * Stories do Card em HTML puro: cada story devolve uma string de HTML.
 * A página de documentação fica em Card.mdx.
 *
 * O Card compõe Badge, Avatar e a aparência do Button. Não existe papel
 * ARIA "card": a semântica vem dos elementos internos (título, texto,
 * link e botões). O contêiner nunca recebe foco.
 */
import { createBadge } from '../badge/badge.stories';
import { createAvatar } from '../avatar/avatar.stories';

/* Capa de exemplo: ilustração em SVG embutida, para não depender de rede. */
const COVER_IMAGE =
  'data:image/svg+xml,' +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 320">' +
      '<rect width="640" height="320" fill="#e0e7ff"/>' +
      '<rect x="64" y="64" width="160" height="192" rx="16" fill="#a5b4fc"/>' +
      '<rect x="248" y="64" width="160" height="88" rx="16" fill="#818cf8"/>' +
      '<rect x="248" y="168" width="160" height="88" rx="16" fill="#c7d2fe"/>' +
      '<rect x="432" y="64" width="144" height="192" rx="16" fill="#6366f1"/>' +
      '</svg>',
  );

const slug = (text) =>
  text
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

let uid = 0;

/* Estrela do Favoritar: vazada quando desligado, preenchida quando ligado. */
const STAR =
  '<svg class="ds-button__icon ds-button__icon--start" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M12 3l2.8 5.7 6.2.9-4.5 4.4 1.1 6.2L12 17.3 6.4 20.2l1.1-6.2L3 9.6l6.2-.9z"/></svg>';

/**
 * Monta o card.
 *  type: 'link'        → destino único com o link "Ver mais" (padrão)
 *        'info'        → informativo, sem ações
 *        'actions'     → link + botão Favoritar independente
 *        'clickable'   → card inteiro clicável (link no título)
 *  cover: 'cor' | 'imagem' | 'imagem-informativa' | 'nenhuma'
 */
export const createCard = ({
  title,
  description,
  headingLevel = 3,
  badge = 'Novo',
  cover = 'cor',
  coverAlt = '',
  author = 'Mateus Villain',
  type = 'link',
}) => {
  const id = `card-${slug(title).slice(0, 40)}-${++uid}`;
  const href = `#${slug(title)}`;
  const level = Math.min(Math.max(Number(headingLevel) || 3, 2), 6);
  const h = `h${level}`;

  let coverHtml = '';
  if (cover === 'cor') coverHtml = '<div class="ds-card__cover"></div>';
  if (cover === 'imagem')
    coverHtml = `<div class="ds-card__cover"><img class="ds-card__cover-img" src="${COVER_IMAGE}" alt="" width="640" height="320"></div>`;
  if (cover === 'imagem-informativa')
    coverHtml = `<div class="ds-card__cover"><img class="ds-card__cover-img" src="${COVER_IMAGE}" alt="${coverAlt}" width="640" height="320"></div>`;

  const titleInner =
    type === 'clickable' ? `<a class="ds-card__link" href="${href}">${title}</a>` : title;

  const authorHtml = author
    ? `<p class="ds-card__author">${createAvatar({ name: author, size: 'sm', decorative: true })}<span><span class="ds-visually-hidden">Autoria: </span>${author}</span></p>`
    : '';

  const link = `<a class="ds-button ds-button--primary ds-button--sm" href="${href}">Ver mais<span class="ds-visually-hidden"> sobre ${title}</span></a>`;
  let actionsHtml = '';
  if (type === 'link') actionsHtml = link;
  if (type === 'actions')
    actionsHtml = `<div class="ds-card__actions">
        <button type="button" class="ds-button ds-button--secondary ds-button--sm" aria-pressed="false" data-favorite>${STAR}Favoritar<span class="ds-visually-hidden"> ${title}</span></button>
        ${link}
      </div>`;

  const footer =
    authorHtml || actionsHtml ? `<div class="ds-card__footer">${authorHtml}${actionsHtml}</div>` : '';

  const classes = ['ds-card'];
  if (type === 'clickable') classes.push('ds-card--clickable');

  return `<article class="${classes.join(' ')}" aria-labelledby="${id}">
    ${coverHtml}
    <div class="ds-card__body">
      ${badge ? createBadge({ variant: 'brand', label: badge }) : ''}
      <${h} class="ds-card__title" id="${id}">${titleInner}</${h}>
      <p class="ds-card__description">${description}</p>
      ${footer}
    </div>
  </article>`;
};

/*
 * Liga o botão Favoritar: alterna aria-pressed (o leitor de tela anuncia
 * "pressionado" ou "não pressionado") e preenche a estrela. O rótulo não
 * muda, como pede o padrão de botão alternável. O clique não abre o link.
 */
const withFavorite = (html) => {
  const wrapper = document.createElement('div');
  wrapper.innerHTML = html;
  wrapper.querySelectorAll('[data-favorite]').forEach((button) => {
    button.addEventListener('click', () => {
      const pressed = button.getAttribute('aria-pressed') === 'true';
      button.setAttribute('aria-pressed', String(!pressed));
      button.querySelector('svg').setAttribute('fill', pressed ? 'none' : 'currentColor');
    });
  });
  return wrapper;
};

export default {
  title: 'Componentes/Card',
  excludeStories: ['createCard'],
  render: (args) => createCard(args),
  argTypes: {
    title: { control: 'text', description: 'Título. Também completa o nome do link "Ver mais"' },
    description: { control: 'text', description: 'Resumo do conteúdo' },
    headingLevel: {
      control: 'inline-radio',
      options: [2, 3, 4, 5, 6],
      description: 'Nível do título (`<h2>` a `<h6>`), conforme a hierarquia da página',
    },
    badge: { control: 'text', description: 'Texto do selo. Vazio esconde o selo' },
    cover: {
      control: 'inline-radio',
      options: ['cor', 'imagem', 'imagem-informativa', 'nenhuma'],
      description: 'Capa: bloco de cor, imagem decorativa (`alt=""`), imagem informativa (com `alt`) ou sem capa',
    },
    coverAlt: { control: 'text', description: 'Texto alternativo da capa informativa' },
    author: { control: 'text', description: 'Nome de quem assina. Vazio esconde o autor' },
    type: {
      control: 'inline-radio',
      options: ['link', 'info', 'actions', 'clickable'],
      description: 'Comportamento: destino único, informativo, várias ações ou card inteiro clicável',
    },
  },
  args: {
    title: 'Biblioteca de componentes',
    description: 'Tokens, componentes e documentação para criar interfaces consistentes e acessíveis.',
    headingLevel: 3,
    badge: 'Novo',
    cover: 'cor',
    coverAlt: '',
    author: 'Mateus Villain',
    type: 'link',
  },
};

export const Padrao = { name: 'Padrão' };

export const ComImagem = {
  name: 'Com imagem',
  args: { cover: 'imagem' },
};

export const ImagemInformativa = {
  name: 'Imagem informativa',
  args: {
    cover: 'imagem-informativa',
    title: 'Painel de vendas',
    coverAlt: 'Painel com quatro blocos: vendas do mês, metas, clientes novos e devoluções',
    description: 'Resumo das vendas do mês, com metas, clientes novos e devoluções.',
  },
};

export const SemImagem = {
  name: 'Sem imagem',
  args: { cover: 'nenhuma' },
};

export const TituloLongo = {
  name: 'Título longo',
  args: {
    title:
      'Guia completo de acessibilidade para formulários, tabelas e componentes interativos em produtos digitais',
    description:
      'Como escrever rótulos, mensagens de erro e instruções que funcionam com teclado, leitor de tela e ampliação de até 400%.',
  },
};

export const Informativo = {
  args: {
    type: 'info',
    badge: '',
    cover: 'nenhuma',
    title: 'Horário de atendimento',
    description: 'Segunda a sexta, das 9h às 18h. Sábados, das 9h às 13h.',
    author: '',
  },
};

export const VariasAcoes = {
  name: 'Várias ações',
  args: { type: 'actions' },
  render: (args) => withFavorite(createCard(args)),
};

export const CardInteiroClicavel = {
  name: 'Card inteiro clicável',
  args: { type: 'clickable' },
};

/* Coleção: lista de cards com títulos e links que se distinguem. */
export const Colecao = {
  name: 'Coleção',
  render: (args) => `
    <ul role="list" style="--ds-card-max-width: none; list-style: none; margin: 0; padding: 0; display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 24px;">
      ${[
        ['Biblioteca de componentes', 'Tokens, componentes e documentação para criar interfaces consistentes e acessíveis.'],
        ['Guia de escrita', 'Como escrever rótulos, mensagens de erro e textos de ajuda claros.'],
        ['Tokens de cor', 'A paleta, os papéis semânticos e os contrastes calculados de cada combinação.'],
      ]
        .map(([title, description]) => `<li style="display: flex;">${createCard({ ...args, title, description })}</li>`)
        .join('')}
    </ul>`,
};
