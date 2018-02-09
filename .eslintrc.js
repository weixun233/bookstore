// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  env: {
    browser: true,
  },
  extends: [
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    'plugin:vue/essential',
    // https://github.com/standard/standard/blob/master/docs/RULES-en.md
    'standard'
  ],
  // required to lint *.vue files
  plugins: [
    'vue'
  ],
  // add your custom rules here
  rules: {
    // allow async-await
    'generator-star-spacing': 'off',
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    "space-before-function-paren": [0, "always"],
    "no-unused-vars": [0, {"vars": "all", "args": "after-used"}],
    "no-trailing-spaces": 0,
    "prefer-promise-reject-errors": 0,
    "one-var": 0,
    "no-useless-return": 0,
    "no-extend-native": 0,
    "node": 0,
    "valid-typeof": 0,
    "indent": 0,
    "no-multi-spaces": 0
  }
}
