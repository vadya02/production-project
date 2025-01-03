module.exports = {
    env: {
        browser: true,
        es2021: true,
        jest: true,
    },
    extends: [
        'plugin:react/recommended',
        'airbnb',
        'plugin:i18next/recommended',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    plugins: [
        'react',
        '@typescript-eslint',
        'i18next',
    ],
    rules: {
        'react/jsx-indent': [2, 4], // отступы
        'react/jsx-indent-props': [2, 4], // отступы для пропсов в JSX
        indent: [2, 4],
        'react/jsx-filename-extension': [
            2,
            { extensions: ['.js', '.jsx', '.tsx'] },
        ], // в каких файлах разрешен jsx
        'import/no-unresolved': 'off', // разрешение на абсолютный импорт
        'import/prefer-default-export': 'off',
        'no-unused-vars': 'warn', // предупреждение, а не ошибка для неиспользуемых переменных
        'react/require-default-props': 'off', // отключение ошибки при отсутствии дефолтного значения для пропсов
        'react/react-in-jsx-scope': 'off', // отключение ошибки при отсутствии импорта React
        'react/jsx-props-no-spreading': 'warn', // предупреждение, а не ошибка для спреда пропсов
        'react/function-component-definition': 'off',
        'no-shadow': 'off',
        'import/extensions': 'off',
        'import/no-extraneous-dependencies': 'off',
        'no-underscore-dangle': 'off',
        'i18next/no-literal-string': ['error', { markupOnly: true }],
        'max-len': ['error', { ignoreComments: true }],
        'linebreak-style': ['error', 'windows'],
        'max-len': 120,
    },
    globals: {
        __IS_DEV__: true,
    },
};
