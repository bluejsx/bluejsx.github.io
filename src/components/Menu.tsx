import { useAttr } from '@vanillajsx/vjsx'
import './menu.scss'

const contents = [
  ['View the Source Code of This Page', 'https://github.com/vanillajsx/vanillajsx.github.io'],
  ['Document', 'https://github.com/vanillajsx/VanillaJSX/tree/master/doc'],
  ['GitHub Repository', 'https://github.com/vanillajsx/VanillaJSX'],
  ['Join Discussions', 'https://github.com/vanillajsx/VanillaJSX/discussions']
]
const Menu = () =>{
  const refs: {
    toggleButton?: HTMLDivElement,
    backField?: HTMLDivElement
  } = {}
  const self = (
    <div class='menu_list_container hidden'>
      <div ref={[refs, 'toggleButton']} id='h-menu-button'>
        <span></span>
        <span></span>
      </div>
      <div class='menu-list'>{
        contents.map(v=>{
          const link = <p>{v[0]}</p>
          link.onclick = () =>window.open(v[1])
          return link
        })
      }</div>
      <div ref={[refs, 'backField']} id='backfield'></div>
    </div>
  )

  const { toggleButton, backField } = refs

  useAttr(self, 'open', false)
  self.watch('open', v=>{
    if(v){
      self.classList.remove('hidden')
    }else{
      self.classList.add('hidden')
    }
  })
  backField.onclick = () => self.open = false
  toggleButton.onclick = () => self.open = !self.open
  return self
}
export default Menu