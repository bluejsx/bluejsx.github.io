import withPages from 'vite-with-blue-pages'
//import withPages from 'AA/lib/index.cjs';
import bundleWorker from './bundleWorker';
/** @type {import('vite').UserConfig} */
export default withPages({
  plugins: [
    bundleWorker(),
  ],
  base: './',
  assetsInclude: 'public/*'
  
})