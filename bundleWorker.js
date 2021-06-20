import { buildSync } from 'esbuild'
///** @type {import('vite')} */
export default ()=>{
  return {
    name: 'vite-plugin-bundle-worker',
    transform(_, id){
      if(/\?worker/.test(id)){
        id = id.replace(/\?[\w-]+/, '')
        let code = buildSync({
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
  }
}
