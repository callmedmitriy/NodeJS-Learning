module.exports = {
    parser: '@typescript-eslint/parser',
    extends: ['eslint-config-airbnb-base'],
    parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'module'
    },
    settings: { 'import/resolver': { node: { extensions: ['.js', '.ts'] } } },
    env: { node: true },
    globals: {
        benchmark: true,
        chai: true,
        expect: true,
        suite: true
    },
    plugins: ['chai-friendly', 'sort-class-members', '@typescript-eslint', 'import'],
    rules: {
        // Style Guide
        'brace-style': ['warn', '1tbs', { allowSingleLine: false }],
        camelcase: ['warn', { properties: 'never' }],
        'comma-dangle': ['error', 'never'],
        curly: ['warn', 'all'],
        'func-names': 'off',
        'function-paren-newline': 'off',
        'implicit-arrow-linebreak': ['warn', 'beside'],
        indent: ['error', 4, { SwitchCase: 1 }],
        'max-len': ['error', 120, 4, {
            ignoreUrls: true,
            ignoreComments: true,
            ignoreRegExpLiterals: true,
            ignoreStrings: true,
            ignoreTemplateLiterals: true
        }],
        'multiline-comment-style': 'off',
        'no-multiple-empty-lines': ['warn', { max: 1, maxBOF: 0, maxEOF: 1 }],
        'no-negated-condition': 'warn',
        'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
        'no-underscore-dangle': 'off',
        'object-curly-newline': ['warn', { // TODO: delete after update airbnb config
            ObjectExpression: { minProperties: 4, multiline: true, consistent: true },
            ObjectPattern: { minProperties: 4, multiline: true, consistent: true },
            ImportDeclaration: { minProperties: 4, multiline: true, consistent: true },
            ExportDeclaration: { minProperties: 4, multiline: true, consistent: true }
        }],
        'operator-linebreak': ['warn', 'after', {
            overrides: {
                '?': 'before',
                ':': 'before',
                '=': 'none'
            }
        }],
        'padded-blocks': 'off',
        'padding-line-between-statements': [
            'warn',
            { blankLine: 'always', prev: '*', next: 'return' },
            { blankLine: 'always', prev: ['const', 'let', 'var'], next: '*' },
            { blankLine: 'any', prev: ['const', 'let', 'var'], next: ['const', 'let', 'var'] }
        ],
        'prefer-object-spread': 'off', // TODO: enable after update eslint

        // Best Practices
        'default-case': 'off',
        'no-param-reassign': 'off',
        'no-unused-expressions': 'off',

        // Variables
        'no-shadow': 'off',
        'no-use-before-define': ['error', { functions: false, classes: true, variables: true }],

        // ES6
        'prefer-arrow-callback': 'warn',
        'prefer-const': ['warn', { destructuring: 'any' }],

        // Import
        'import/prefer-default-export': 'off',

        // Sort class members
        'sort-class-members/sort-class-members': ['error', {
            order: [
                '[static-properties]',
                '[static-methods]',
                '[static-stuff]',
                '[properties]',
                '[everything-else]'
            ],
            accessorPairPositioning: 'getThenSet'
        }],

        // Chai
        'chai-friendly/no-unused-expressions': 'error',

        // TS
        '@typescript-eslint/class-name-casing': 'error',
        '@typescript-eslint/type-annotation-spacing': 'error',
        '@typescript-eslint/member-delimiter-style': 'error',
        '@typescript-eslint/consistent-type-assertions': ['error', {
            assertionStyle: 'as',
            objectLiteralTypeAssertions: 'never'
        }],
        '@typescript-eslint/no-array-constructor': 'error',
        '@typescript-eslint/no-empty-interface': 'error',
        '@typescript-eslint/no-unused-vars': [
            'error',
            { ignoreRestSiblings: true }
        ],
        'no-undef': 'off', // see https://github.com/eslint/typescript-eslint-parser/issues/416
        'import/prefer-default-export': 'off',
        'space-infix-ops': 'off', // see https://github.com/eslint/typescript-eslint-parser/issues/449

        'import/no-extraneous-dependencies': ['error', {'devDependencies': ['**/*.test.{ts,js}']}],

        '@typescript-eslint/no-angle-bracket-type-assertion': 'off',
        'no-mixed-operators': 'off',
        'import/extensions': 'off',
        'import/no-unresolved': 'off'
    }
};
