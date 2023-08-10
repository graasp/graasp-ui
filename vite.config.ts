import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { UserConfigExport, defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default (): UserConfigExport => {
  return defineConfig({
    plugins: [react(), dts({ tsconfigPath: './tsconfig.build.json' })],
    build: {
      emptyOutDir: true,
      lib: {
        // Could also be a dictionary or array of multiple entry points
        entry: [
          resolve(__dirname, 'src/index.ts'),
          resolve(__dirname, 'src/table.ts'),
        ],
        name: 'graasp-ui',
        formats: ['cjs', 'es'],
      },
      rollupOptions: {
        // make sure to externalize deps that shouldn't be bundled
        // into your library
        external: [
          '@emotion/cache',
          '@emotion/react',
          '@emotion/styled',
          '@graasp/sdk',
          '@graasp/translations',
          '@graasp/ui',
          '@mui/icons-material',
          '@mui/lab',
          '@mui/material',
          'i18next',
          'react-dom',
          'react-i18next',
          'react-query',
          'react-router-dom',
          'react',
          'stylis-plugin-rtl',
          'stylis',
        ],
      },
    },
  });
};
