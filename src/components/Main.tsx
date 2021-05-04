import '@vanillajsx/vjsx'
import '../declaration.d'
import 'github-markdown-css'
import 'highlight.js/styles/vs2015.css'
import { main } from './Main.module.scss'
import './container.scss'

import Example from './Example'
const {log} = console

const Main = () =>
  <div class={`container ${main}`}>
    {async (_set: any, elem: VJSX.JSX.Element)=>{
      await import('./article.md').then(mod=>
        mod.default.split('<hr>').forEach(htmStr=>
          elem.appendChild(
            <section innerHTML={htmStr} class='markdown-body' />
          )
        )
      )
      elem.querySelector('#example-result-space').appendChild(<Example />)
    }}
  </div>


export default Main