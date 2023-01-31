import withPages from 'vite-with-blue-pages'
import path from 'path'
import dirTree from 'directory-tree'
import { resolve, relative, dirname } from 'path'
import fs, { constants, accessSync, statSync } from 'fs'

function getPkgJsonDir() {

  for (const path of module.paths) {
    try {
      const prospectivePkgJsonDir = dirname(path);
      accessSync(path, constants.F_OK);
      return prospectivePkgJsonDir;
    } catch (e) { }
  }

}
//import withPages from 'AA/lib/index.cjs';
//import bundleWorker from './bundleWorker';
//import hmrLoader from './hmr'

/** @type {import('vite').UserConfig} */
export default (()=>{
  /** directory where `vite.config.js` is located */
  const projectRoot = getPkgJsonDir()
  /** original `pages` folder in project */
  const srcPagesDir = resolve(projectRoot, './pages')
  const tree = dirTree(srcPagesDir, {
    extensions: /\.(md|mdx|js|jsx|ts|tsx)$/,
    normalizePath: true
  }, ({ name }, path) => {
    console.log(name, path)
  })
  const conf = withPages({
    bluejsx: {
      hmr: false
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
  console.log(conf)
  return conf
})()
