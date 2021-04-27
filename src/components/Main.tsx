import '@vanillajsx/vjsx'
import marked from 'marked'
import hljs from 'highlight.js'
import '../declaration.d'
import 'github-markdown-css'
import 'highlight.js/styles/vs2015.css'
import { main } from './Main.module.scss'
import './container.scss'

import Example from './Example'
//import article from './article.md?raw'

const {log} = console

marked.setOptions({
  highlight: function (code: string, lang: string) {
    return hljs.highlightAuto(code, [lang]).value
  }
})
const Main = () =>
  <div class={`container ${main}`}>
    {async (_set: any, elem: VJSX.JSX.Element)=>{
      await import('./article.md?raw').then(mod=>
        marked(mod.default).split('<hr>').forEach(htmStr=>
          elem.appendChild(
            <section innerHTML={htmStr} class='markdown-body' />
          )
        )
      )
      elem.querySelector('#example-result-space').appendChild(<Example />)
    }}
  </div>


export default Main