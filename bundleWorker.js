import { buildSync } from 'esbuild'

export default ()=>{
  /** @type {import('vite').ResolvedConfig} */
  let config
  /** @type {import('vite').Plugin}*/
  return ({
    name: 'vite-plugin-bundle-worker',
    configResolved(resolvedConfig) {
      // store the resolved config
      config = resolvedConfig
    },
    enforce: 'pre',
    apply(config, {command}){
      return command === 'build'
    },
    transform(_, id){
      if(/\?worker/.test(id)){
        id = id.replace(/\?[\w-]+/, '')
        const code = buildSync({
          bundle: true,
          entryPoints: [id],
          minify: true,
          write: false
        }).outputFiles[0].text
        const url = this.emitFile({
          fileName: id.match(/[\w\.-\_\/]+\/([\w\.-\_]+)$/)[1],
          type: 'asset',
          source: code
        })
        return `export default function(){
          return new Worker("__VITE_ASSET__${url}__")
        }`
      }
    }
  })
}
