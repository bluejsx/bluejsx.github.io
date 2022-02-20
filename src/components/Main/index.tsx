import 'bluejsx'
import '../../declaration.d'
import 'github-markdown-css'
import 'highlight.js/styles/vs2015.css'
import Article from '../article.mdx'
import style from './index.module.scss'

import './container.scss'


const Main = () => <Article class={`container markdown-body ${style.main}`} />

export default Main