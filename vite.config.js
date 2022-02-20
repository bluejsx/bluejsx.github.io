import withPages from 'vite-with-blue-pages'
import path from 'path'
//import withPages from 'AA/lib/index.cjs';
//import bundleWorker from './bundleWorker';
//import hmrLoader from './hmr'

/** @type {import('vite').UserConfig} */
export default withPages({
  bluejsx: {
    //hmr: false
  },
  plugins: [
    //hmrLoader()
    //bundleWorker(),
  ],
  base: '/',
  assetsInclude: 'public/*',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  }
})