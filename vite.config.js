import withPages from 'vite-with-blue-pages'
//import withPages from 'AA/lib/index.cjs';
//import bundleWorker from './bundleWorker';
//import hmrLoader from './hmr'

/** @type {import('vite').UserConfig} */
export default withPages({
  bluejsx: {
    hmr: true
  },
  plugins: [
    //hmrLoader()
    //bundleWorker(),
  ],
  base: '/',
  assetsInclude: 'public/*'
  
})