import withPages from './withPagesPlugin';
import mdLoader from './mdloader'
import mdxLoader from './mdxLoader';
import bundleWorker from './bundleWorker';
import HMRLoader from './experiment_hmr/hmr'
const prefix = `monaco-editor/esm/vs`;
/** @type {import('vite').UserConfig} */
export default withPages({
  esbuild: {
    jsx: "preserve",
    jsxFactory: 'Blue.r',
    jsxFragment: 'Blue.Fragment',
    jsxInject: `import Blue from 'bluejsx'`
  },
  plugins: [HMRLoader()
,    mdLoader(),
    mdxLoader(),
    bundleWorker(),
    
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