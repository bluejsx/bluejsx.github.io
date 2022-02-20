import Menu from '../Menu'
import { title } from './index.module.scss'

const { log } = console
const Header = () => (
  <header >
    <a href='/'><div class={title}>BlueJSX</div></a>
    <Menu />
  </header>)
export default Header
