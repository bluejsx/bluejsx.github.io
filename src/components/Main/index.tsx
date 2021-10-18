import 'bluejsx'
import '../../declaration.d'
import 'github-markdown-css'
import 'highlight.js/styles/vs2015.css'
import Article from '../article.mdx'

import { main as CLASS_MAIN } from './index.module.scss'

import './container.scss'


const { log } = console
const Main = () => <Article class={`container markdown-body ${CLASS_MAIN}`} />

export default Main