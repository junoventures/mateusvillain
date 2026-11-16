// Style Dictionary transforma os tokens exportados do Figma/Penpot
// (formato W3C DTCG: $value / $type) em variáveis CSS.
export default {
  source: ['tokens/**/*.json'],
  platforms: {
    css: {
      transformGroup: 'css',
      buildPath: 'src/styles/',
      files: [
        {
          destination: 'tokens.css',
          format: 'css/variables',
          options: {
            // Mantém a referência: --color-action-primary: var(--color-brand-600)
            outputReferences: true,
          },
        },
      ],
    },
    json: {
      transformGroup: 'css',
      buildPath: 'src/styles/',
      files: [
        {
          // Usado pelas páginas de documentação de tokens no Storybook
          destination: 'tokens.json',
          format: 'json/flat',
        },
      ],
    },
  },
};
