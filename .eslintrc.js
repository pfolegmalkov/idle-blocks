module.exports = {
  root: true,
  extends: [
    '@react-native-community',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:jest/recommended',
    'plugin:sonarjs/recommended',
  ],
  plugins: ['@propertyfinder/rules', '@typescript-eslint', 'jest'],
  parser: '@typescript-eslint/parser',
  rules: {
    'sonarjs/cognitive-complexity': 'error',
    'sonarjs/prefer-immediate-return': 'off',
    'sonarjs/no-identical-expressions': 'error',
    '@typescript-eslint/no-empty-interface': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'error',
    'eslint-comments/no-unused-disable': 'error',
    'no-bitwise': 'error',
    'no-console': ['error', {allow: ['info', 'error']}],
    eqeqeq: 'error',
    '@typescript-eslint/no-unused-vars': 'error',
    'jest/no-disabled-tests': 'error',
    'react-native/no-inline-styles': 'error',
    '@typescript-eslint/no-non-null-assertion': 'error',
    radix: 'error',
    'no-shadow': 'off',
    'react/react-in-jsx-scope': 'off',
    '@typescript-eslint/no-shadow': 'error',
    '@typescript-eslint/no-unnecessary-type-constraint': 'off',
    '@propertyfinder/rules/export-name-validation': [
      'error',
      {
        rootFolder: __dirname.split('/').pop(),
        enforcePascalCaseOn:
          '(enum|component|navigator|store|factory|type|interface|template|provider|context|view|service|desktop|mobile|error)$',
        ignoreCustomExtensionInNameOn: ['.web', '.android', '.ios'],
        enforcePrefixOnExtension: [
          {
            extension: 'hook',
            prefix: 'use',
          },
          {
            extension: 'mock',
            prefix: 'mock',
          },
        ],
        ignoreFolderInNameOnExtension: [
          {
            extension: 'hook',
            folderName: 'hooks',
          },
          {
            extension: 'stub',
            folderName: 'stubs',
          },
        ],
        formatWithSeparatorForExtension: [
          {
            extension: 'constant',
            case: 'uppercase', // uppercase || lowercase
            separator: '_',
          },
        ],
      },
    ],
    'no-restricted-properties': [
      2,
      {
        object: 'StyleSheet',
        property: 'create',
        message: 'Please use styled from styled-components/native',
      },
    ],
  },
};
