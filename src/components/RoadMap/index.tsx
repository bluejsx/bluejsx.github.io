import { FuncCompParam, useConstProps } from "bluejsx";
import style from './index.module.scss'
import checkIconSrc from '@/../public/icons/check-svgrepo-com.svg'
import flaskIconSrc from '@/../public/icons/flask-svgrepo-com.svg'
import minusIconSrc from '@/../public/icons/minus-svgrepo-com.svg'


export const Milestone = (
  { title, status, children }: FuncCompParam<{
    title: string
    status: 'done' | 'experimental' | 'future'
  }>
) => {
  let srcImg = '';
  switch (status) {
    case 'done':
      srcImg = checkIconSrc
      break;
    case 'experimental':
      srcImg = flaskIconSrc
      break;
    case 'future':
      srcImg = minusIconSrc
      break;
    default:
      break;
  }
  return <li class={style.milestoneContainer}>
    <div class={style.icon}>
      <img src={srcImg} />
    </div>
    <p class={style.title}>{title}</p>
    <div class={style.description}>{children}</div>
  </li>
}
export default ({ children }) => {
  const self = <ul class={style.roadmapContainer}>{children}</ul>
  useConstProps(self, {
    add({ title, status, message }) {
      self.appendChild(<Milestone title={title} status={status}>{message}</Milestone>)
    }
  })
  return self
}