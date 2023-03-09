import { nodeResolve } from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import bundleSize from 'rollup-plugin-bundle-size';

export default {
  input: 'src/index.js',
  output: [
    {
      file: 'dist/index.cjs',
      format: 'cjs',
    },
    {
      file: 'dist/index.bundle.js',
      format: 'iife',
      name: 'idnaUts46',
      plugins: [terser(), bundleSize()],
    },
  ],
  plugins: [
    // needed to resolve punycode from import not node's builtin
    nodeResolve({ preferBuiltins: false }),
  ],
};
