import path from 'path';
import typescript from '@wessberg/rollup-plugin-ts';
import postcss from 'rollup-plugin-postcss';
import resolve from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';

export default [
  {
    input: 'src/style/index.tsx',
    output: {
      dir: 'style',
      format: 'umd'
    },
    plugins: [
      typescript(),
      postcss({
        minimize: true,
        extract: true,
        use: [
          ['less', { javascriptEnabled: true }]
        ]
      })
    ]
  },
  {
    input: 'src/index.ts',
    output: {
      file: 'pollen.css',
      format: 'umd'
    },
    plugins: [
      typescript(),
      postcss({
        minimize: true,
        extract: path.resolve('pollen.css')
      })
    ]
  },
  {
    input: 'src/utils/index.ts',
    output: {
      dir: 'utils',
      format: 'cjs',
      sourcemap: true
    },
    plugins: [
      resolve({ extensions: ['.ts'], browser: true }),
      typescript({
        tsconfig: './tsconfig.utils.json'
      }),
      terser()
    ]
  }
];
