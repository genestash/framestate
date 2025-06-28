// eslint-disable-next-line
// @ts-nocheck

import globals from 'globals';
import tseslint from 'typescript-eslint';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import { defineConfig } from 'eslint/config';

export default defineConfig([
    {
        ignores: ['node_modules', 'dist']
    },
    ...tseslint.configs.recommended,
    {
        languageOptions: {
            globals: globals.browser,
            parser: tseslint.parser
        },
        plugins: {
            '@typescript-eslint': tseslint.plugin
        },
        rules: {
            '@typescript-eslint/no-unused-vars': 'off',
            '@typescript-eslint/no-explicit-any': 'off'
        }
    },
    react.configs.flat.recommended,
    {
        settings: {
            react: {
                version: 'detect'
            }
        },
        plugins: {
            'react-hooks': reactHooks
        },
        rules: {
            ...reactHooks.configs.recommended.rules
        }
    }
]);
