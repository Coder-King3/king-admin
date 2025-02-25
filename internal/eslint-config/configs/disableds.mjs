export function disableds() {
  const filesDts = ['**/*.d.ts']
  const filesJs = ['**/*.js', '**/*.mjs', '**/*.cjs']
  return [
    {
      files: filesDts,
      name: 'king/disableds/dts',
      rules: {
        '@typescript-eslint/triple-slash-reference': 'off',
        'import/no-duplicates': 'off',
        'no-restricted-syntax': 'off',
        'unused-imports/no-unused-vars': 'off'
      }
    },
    {
      files: filesJs,
      name: 'king/disableds/js',
      rules: {
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-require-imports': 'off'
      }
    }
  ]
}
