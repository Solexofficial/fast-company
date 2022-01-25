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
    indent: [0, 2, { SwitchCase: 1, flatTernaryExpressions: true }],
    semi: [2, 'always'],
    quotes: ['error', 'single', { allowTemplateLiterals: true, avoidEscape: true }],
    'space-before-function-paren': ['error', { anonymous: 'always', named: 'never' }],
    'multiline-ternary': ['off']
  }
};
