import marked from 'marked'

export default function mdLoader(options){
  highlight && marked.setOptions(options)
  return {
    name: 'vite-plugin-md-loader',
    transform(code, id){
      if(/\.md/.test(id)){
        return `export default\`${marked(code).replace(/`/g,'\\`')}\``
      }
    }
  }
}