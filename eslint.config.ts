// eslint-disable-next-line
// @ts-nocheck

import globals from 'globals';
import tseslint from 'typescript-eslint';
import { defineConfig } from 'eslint/config';

export default defineConfig([
    ...tseslint.configs.recommended,
    {
        files: ['src/**/*'],
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
    }
]);
