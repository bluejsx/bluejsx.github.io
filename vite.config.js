import mdLoader from './mdloader'
import bundleWorker from './bundleWorker';
import withBlueJSX from 'vite-with-bluejsx'
//import HMRAdder from './hmr'
// const prefix = `monaco-editor/esm/vs`;
export default withBlueJSX({
  bluejsx: {
    hmr: true
  },
  plugins: [
    mdLoader({
      highlight: function (code, lang) {
        return hljs.highlightAuto(code, [lang]).value
      },
      html: true
    }),
    bundleWorker(),
    //HMRAdder()
  ],/*
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
  base: './',
  assetsInclude: 'public/*'
})