import 'bluejsx'

import Header from '../src/components/Header'

import '../src/style.scss'
import 'github-markdown-css'
import 'highlight.js/styles/vs2015.css'
import { main as CLASS_MAIN } from '../src/components/Main/index.module.scss'

import '../src/components/Main/container.scss'

export default ({ Component, pageProps }) => {
  return (<div>
    <Header />
    <Component {...pageProps} class={`container markdown-body ${CLASS_MAIN}`}/>
  </div>)
}
