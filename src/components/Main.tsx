import '@vanillajsx/vjsx'
import '../declaration.d'
import 'github-markdown-css'
import 'highlight.js/styles/vs2015.css'
import { main } from './Main.module.scss'
import './container.scss'

import exampleCode from './Example?raw'
const {log} = console

const Main = () =>
  <div class={`container ${main}`}>
    {async (elem: VJSX.JSX.Element)=>{
      await import('./article.md').then(mod=>
        mod.default.split('<hr>').forEach(htmStr=>
          elem.appendChild(
            <section innerHTML={htmStr} class='markdown-body' />
          )
        )
      )
      await import('./CodeSpace').then(mod=>{
        const CodeSpace = mod.default
        elem.querySelector('#example-codespace').appendChild(<CodeSpace code={exampleCode}/>)
      })
      
    }}
  </div>


export default Main