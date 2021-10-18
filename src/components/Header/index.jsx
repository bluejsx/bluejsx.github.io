import Menu from '../Menu'
import { title } from './index.module.scss'

const { log } = console
const Header = () => (
  <header >
    <div class={title}>BlueJSX</div>
    <Menu />
  </header>)
export default Header