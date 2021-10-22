import withPages from 'vite-with-blue-pages'
//import withPages from 'AA/lib/index.cjs';
import mdLoader from './mdloader'
import bundleWorker from './bundleWorker';
/** @type {import('vite').UserConfig} */
export default withPages({
  plugins: [
    mdLoader(),
    bundleWorker(),
  ],
  base: './',
  assetsInclude: 'public/*'
  
})