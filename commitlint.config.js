module.exports = {
  extends: ['@commitlint/config-angular'],
  rules: {
    'scope-case': () => [2, 'always', 'kebab-case'],
    'scope-validation': () => [2, 'always', ['client', 'node-api', 'mysql', 'go-api', 'root']],
  },
  plugins: [
    {
      rules: {
        'scope-validation': (parsed, when = 'always', scope = []) => {
          const isInvertedRule = when === 'never'

          let result = true

          if (parsed.scope) {
            parsed.scope.split(', ').forEach((word) => {
              if (!scope.includes(word)) {
                result = false
              }
            })
          } else {
            result = false
          }

          return [
            isInvertedRule ? !result : result,
            `Scope must be in [${scope.join(', ')}], f.e. (${scope[0]}, ${scope[1]}) or (${
              scope[0]
            })`,
          ]
        },
      },
    },
  ],
}
