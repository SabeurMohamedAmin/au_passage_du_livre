import js from '@eslint/js'
import tseslint from 'typescript-eslint'
import pluginVue from 'eslint-plugin-vue'
import { defineConfig } from 'eslint/config'

export default defineConfig([
  // Base JS rules
  js.configs.recommended,

  // TS rules (spread because it's an array of config objects)
  ...tseslint.configs.recommended,

  // Vue rules (spread for the same reason)
  ...pluginVue.configs['flat/essential'],

  // Tell Vue SFCs to use TS inside <script>
  {
    files: ['**/*.vue'],
    languageOptions: {
      parserOptions: {
        parser: tseslint.parser,
      },
    },
  },
])
