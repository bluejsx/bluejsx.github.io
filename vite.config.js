import withPages from './withPagesPlugin';
import mdLoader from './mdloader'
import bundleWorker from './bundleWorker';
import withBlueJSX from 'vite-with-bluejsx'
const prefix = `monaco-editor/esm/vs`;
/** @type {import('vite').UserConfig} */
export default withPages(withBlueJSX({
  plugins: [
    mdLoader(),
    bundleWorker(),
  ],
  base: './',
  assetsInclude: 'public/*'
  
}))/*
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          jsonWorker: [`${prefix}/language/json/json.worker`],
          cssWorker: [`${prefix}/language/css/css.worker`],
          htmlWorker: [`${prefix}/language/html/html.worker`],
          tsWorker: [`${prefix}/language/typescript/ts.worker`],
          editorWorker: [`${prefix}/editor/editor.worker`],
        },
      },
    },
  },*/