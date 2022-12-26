module.exports = {
  extends: ['@commitlint/config-angular'],
  rules: {
    'scope-case': () => [2, 'always', 'upper-case'],
    'scope-regexp-validation': () => [2, 'always', /^(FE|BE|root)-[0-9]+$/],
  },
  plugins: [
    {
      rules: {
        'scope-regexp-validation': (parsed, when = 'always', regExp) => {
          const isInvertedRule = when === 'never'

          const result = regExp.test(parsed.scope)

          return [
            isInvertedRule ? !result : result,
            `Scope must be match regex ${regExp}, f.e. FE-33`,
          ]
        },
      },
    },
  ],
}
