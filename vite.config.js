import withPages from './withPagesPlugin';
import mdLoader from './mdloader'
import mdxLoader from './mdxLoader';
import bundleWorker from './bundleWorker';

const prefix = `monaco-editor/esm/vs`;
/** @type {import('vite').UserConfig} */
export default withPages({
  esbuild: {
    jsxFactory: 'Blue.r',
    jsxFragment: 'Blue.Fragment',
    jsxInject: `import Blue from 'bluejsx'`
  },
  plugins: [
    mdLoader(),
    mdxLoader(),
    bundleWorker()
  ],
  base: './',
  assetsInclude: 'public/*'
  
})/*
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