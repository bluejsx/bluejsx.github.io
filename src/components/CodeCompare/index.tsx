import { FuncCompParam, AttrHolder, useAttr, ElemType } from "bluejsx"
import style from './index.module.scss'
export const CodeCompare = ({ children }: FuncCompParam<{}>) => {
  const state = new AttrHolder()
  const self = <div class={style.compare}>
    {children}
  </div>
  useAttr(state, 'trigger', null as EventTarget)
  useAttr(state, 'scroll', 0)
  state.watch('scroll', scroll=>{
    for(let i=children.length;i--;){
      const child = children[i]
      if(child == state.trigger) continue;
      child.scrollLeft = scroll
    }
  })
  children.forEach((child) => {
    child.classList.add(style.field)
    child.addEventListener('scroll', (e) => {
      state.trigger = e.target
      // @ts-ignore
      state.scroll = e.target.scrollLeft
    })
  })
  return self
}