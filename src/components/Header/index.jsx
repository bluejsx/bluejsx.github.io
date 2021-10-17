import Menu from '../Menu'
import { title } from './index.module.scss'

const { log } = console
export default () => {
  return (
    <header >
      <div class={title}>BlueJSX</div>
      <Menu />
    </header>)
}