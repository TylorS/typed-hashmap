import typescript from 'typescript'
import ts from 'rollup-plugin-typescript'
import resolve from 'rollup-plugin-node-resolve'

export default {
  entry: 'src/index.ts',
  dest: 'dist/typed-hashmap.js',
  sourceMap: true,
  moduleName: 'typedHashMap',
  format: 'umd',
  plugins: [
    ts({ typescript }),
    resolve(),
  ]
}
