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
        return `export default ()=>{const d=document.createElement('div');d.innerHTML=\`${md.render(code).replace(/`/g,'\\`')}\`;return d}`
      }
    }
  }
}
//marked.setOptions(options||{})
//marked(code).replace(/`/g,'\\`')}\``