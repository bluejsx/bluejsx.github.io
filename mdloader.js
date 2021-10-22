
import jsx from 'jsx-transform'
import MarkdownIt from 'markdown-it'
import hljs from 'highlight.js'
/**
 * 
 * @param {MarkdownIt.Options} options 
 * @returns {import('vite').PluginOption}
 */
export default function mdLoader(options = {}) {
  /** @type {import('vite').ResolvedConfig} */
  let config
  const md = new MarkdownIt({
    ...options,
    highlight: function (code, lang) {
      return hljs.highlightAuto(code, [lang]).value.replace(/([{}])/g, '{"$&"}').replace(/\n/g, '<br />')
    },
    html: true,
    xhtmlOut: true
  })
  return {
    name: 'vite-plugin-bluemd',
    configResolved(resolvedConfig) {
      // store the resolved config
      config = resolvedConfig
    },
    transform(code, id) {
      if (/\.md$/.test(id)) {
        code = md.render(code)
        return `import Blue from 'bluejsx';export default ()=>${jsx.fromString(`<div>${code}</div>`, {
          factory: 'Blue.r',
        })}`
      }
    }
  }
}

/*
import MarkdownIt from 'markdown-it'
/**
 * 
 * @param {MarkdownIt.Options} options 
 * @returns 
 
export default function mdaaaLoader(options){
  
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
*/