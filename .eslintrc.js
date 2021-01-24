module.exports = {
  env: {
    es2021: true,
  },
  extends: [
    'airbnb',
    'prettier',
    'prettier/react',
  ],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'react',
    'prtettier',
  ],
  rules: {
    'prettier/prettier': 'error',
    'react/jsx-filename-extensions': [
      'warn',
      {
        extensions: ['.js', '.jsx']
      }
    ],
    'import/prefer-default-export': 'off'
  },
};
