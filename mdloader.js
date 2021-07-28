import MarkdownIt from 'markdown-it'
/**
 * 
 * @param {MarkdownIt.Options} options 
 * @returns 
 */
export default function mdLoader(options){
  
  const md = new MarkdownIt('commonmark', options)
  return {
    name: 'vite-plugin-md-loader',
    transform(code, id){
      if(/\.md$/.test(id)){
        return `export default\`${md.render(code).replace(/`/g,'\\`')}\``
      }
    }
  }
}
//marked.setOptions(options||{})
//marked(code).replace(/`/g,'\\`')}\``