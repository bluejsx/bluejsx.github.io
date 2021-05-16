import mdLoader from './mdloader'
import hljs from 'highlight.js'
import monaco from 'rollup-plugin-monaco-editor';
/**
 * @type {import('vite').UserConfig}
 */
export default {
  esbuild: {
    jsxFactory: 'VJSX.r',
    jsxFragment: 'VJSX.Fragment',
    jsxInject: `import VJSX from '@vanillajsx/vjsx'`
  },
  plugins: [
    mdLoader({
      highlight: function (code, lang) {
        return hljs.highlightAuto(code, [lang]).value
      }
    }),
    //monaco({ languages: ['javascript', 'typescript'] }),
  ],
  base: './',
  assetsInclude: 'public/*'
}