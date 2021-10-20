module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: ['plugin:react/recommended', 'standard'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 12,
    sourceType: 'module'
  },
  plugins: ['react'],
  rules: {
    indent: ['error', 2, { SwitchCase: 1 }],
    semi: [2, 'always'],
    quotes: ['error', 'single', { allowTemplateLiterals: true }],
    'space-before-function-paren': ['error', 'never'],
    'multiline-ternary': ['off']
  }
};
