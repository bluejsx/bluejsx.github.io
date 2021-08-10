import 'bluejsx'
import '../../declaration.d'
import 'github-markdown-css'
import 'highlight.js/styles/vs2015.css'
import article from '../article.mdx'

import { main as CLASS_MAIN } from './index.module.scss'

import './container.scss'


const { log } = console
const Main = () =>{
  article.classList.value = `container markdown-body ${CLASS_MAIN} `
  return article
}
/*
    {async (elem: Blue.JSX.Element) => {
      await import('./article.md').then(({default: html}) =>
        html.split('<hr />').forEach(htmStr =>
          elem.appendChild(
            <section class='markdown-body' innerHTML={htmStr}  />
          )
        )
      )


*/
export default Main