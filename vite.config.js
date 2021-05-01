/**
 * @type {import('vite').UserConfig}
 */
import mdLoader from './mdloader'
import hljs from 'highlight.js'
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
    })
  ],
  base: './',
  assetsInclude: 'public/*'
}