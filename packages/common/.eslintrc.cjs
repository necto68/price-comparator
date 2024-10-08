const { resolve } = require('node:path');

const project = resolve(__dirname, 'tsconfig.json');

module.exports = {
  extends: [
    require.resolve('@vercel/style-guide/eslint/node'),
    require.resolve('@vercel/style-guide/eslint/typescript'),
  ],

  parserOptions: {
    project,
  },

  settings: {
    'import/resolver': {
      typescript: {
        project,
      },
    },
  },

  plugins: ['prettier'],

  rules: {
    'prettier/prettier': 'error',
  },
};
