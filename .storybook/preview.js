// Carrega a biblioteca inteira (tokens + componentes) em todas as stories
import '../src/index.css';

/** @type { import('@storybook/html').Preview } */
const preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
      },
    },
    options: {
      storySort: {
        order: ['Introdução', 'Fundamentos', 'Componentes'],
      },
    },
  },
};

export default preview;
