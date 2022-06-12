import Menu from '../Menu'
import { title } from './index.module.scss'

const { log } = console
export default () => (
  <header >
    <a href='/'><div class={title}>BlueJSX</div></a>
    <Menu />
  </header>)
// export default Header
