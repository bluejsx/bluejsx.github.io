import { RefType, FuncCompParam } from "bluejsx";
import { icon as CLASS_STATUS_ICON, milestoneContainer as CLASS_MILESTONE, title as CLASS_TITLE, roadmapContainer as CLASS_ROADMAP, description as CLASS_DESCRIPTION } from './index.module.scss'
import checkIconSrc from '../../../public/icons/check-svgrepo-com.svg'
import flaskIconSrc from '../../../public/icons/flask-svgrepo-com.svg'
import minusIconSrc from '../../../public/icons/minus-svgrepo-com.svg'


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
  return <li class={CLASS_MILESTONE}>
    <div class={CLASS_STATUS_ICON}>
      <img src={srcImg} />
    </div>
    <p class={CLASS_TITLE}>{title}</p>
    <div class={CLASS_DESCRIPTION}>{children}</div>
  </li>
}
export default ({children}) => {
  const self = <ul class={CLASS_ROADMAP}>{children}</ul>
  self.add = ({ title, status, message }) => {
    self.appendChild(<Milestone title={title} status={status}>{message}</Milestone>)
  }
  return self
}