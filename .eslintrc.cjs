module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'eslint:recommended', // Uses the recommended rules from ESLint
    'plugin:@typescript-eslint/recommended', // Uses the recommended rules from @typescript-eslint
  ],
  parserOptions: {
    ecmaVersion: 2020, // Allows for the parsing of modern ECMAScript features
    sourceType: 'module', // Allows the use of imports
    project: './tsconfig.json', // Connect ESLint to your TypeScript config
    createDefaultProgram: true, // Required when using TypeScript project references
  },
  overrides: [
    {
      files: ['**/*.test.ts'],
      parserOptions: {
        project: './tsconfig.test.json', // Connect ESLint to your test TypeScript config
      },
    },
  ],
  rules: {
    // e.g., "@typescript-eslint/explicit-function-return-type": "off",
    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
  },
  env: {
    node: true, // Defines global variables that are predefined
    es2021: true, // Sets the ECMAScript environmental features
  },
}
