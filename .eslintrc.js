/** @type {import("@types/eslint").Linter.BaseConfig} */
module.exports = {
  parser: '@typescript-eslint/parser',
  env: {
    browser: true,
    es2022: true,
    node: true
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier'
  ],
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ['tsconfig.eslint.json', 'tsconfig.json'],
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: ['@typescript-eslint'],
  rules: {
    '@typescript-eslint/ban-ts-comment': 'error',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/consistent-type-imports': 'warn',
    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        ignoreRestSiblings: true,
        varsIgnorePattern: '^_',
        argsIgnorePattern: '^_'
      }
    ],
    'no-unused-vars': 'off',
    'no-extra-boolean-cast': 'off',
    'no-constant-condition': ['error', { checkLoops: false }]
  },
  overrides: [
    {
      files: ['*.mdx'],
      extends: 'plugin:mdx/recommended'
    }
  ],
  ignorePatterns: [
    // dependencies
    'node_modules',
    '.pnp',
    '.pnp.js',
    'package.json',
    'yarn.lock',
    // testing
    'coverage',
    // compiled
    'cdn/',
    'dist/',
    // misc
    '.DS_Store',
    '*.pem',
    // debug
    'npm-debug.log*',
    'yarn-debug.log*',
    'yarn-error.log*',
    // env files
    '.env*',
    // typescript
    '*.tsbuildinfo',
    // chiller
    '.chiller'
  ]
}
