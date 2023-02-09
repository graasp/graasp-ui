import { babel } from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import copy from 'rollup-plugin-copy';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import scss from 'rollup-plugin-scss';

export default {
  input: ['./src/index.ts', './src/table.ts'],
  output: {
    dir: './dist',
    format: 'cjs',
  },
  plugins: [
    peerDepsExternal(),
    resolve({
      mainFields: ['module', 'main', 'jsnext:main', 'browser'],
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
    }),
    typescript({
      tsconfig: './tsconfig.json',
      sourceMap: false,
      exclude: ['**/*.test.ts', '**/*.test.tsx', '**/*.stories.tsx'],
    }),
    commonjs(),
    scss({ outputStyle: 'compressed', output: 'dist/bundle.css' }),
    babel({ babelHelpers: 'bundled' }),
    // import katex fonts
    copy({
      targets: [
        {
          src: [
            'node_modules/katex/dist/fonts/**/*.ttf',
            'node_modules/katex/dist/fonts/**/*.woff2',
            'node_modules/katex/dist/fonts/**/*.woff',
          ],
          dest: 'dist/fonts',
        },
      ],
    }),
    // import quill-emoji image
    copy({
      targets: [
        {
          src: ['node_modules/quill-emoji/dist/*.png'],
          dest: 'dist/',
        },
      ],
    }),
  ],
  external: [
    '@mui/material',
    '@mui/icons-material',
    '@mui/lab',
    '@emotion/styled',
    '@emotion/react',
    'ag-grid-community',
    'ag-grid-react',
    'katex',
    'react',
    'react-dom',
    'react-router-dom',
  ],
};
