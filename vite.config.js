/**
 * @type {import('vite').UserConfig}
 */
export default {
  esbuild: {
    jsxFactory: 'VJSX.r',
    jsxFragment: 'VJSX.Fragment',
    jsxInject: `import VJSX from '@vanillajsx/vjsx'`
  },
  base: './',
  assetsInclude: 'public/*'
}