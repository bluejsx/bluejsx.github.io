import { ElemType } from '@vanillajsx/vjsx'

const Example = () => {

  const refs: {
    stopColor?: ElemType<'stop'>
    line1?: ElemType<'line'>
    line2?: ElemType<'line'>
    line3?: ElemType<'line'>
    line4?: ElemType<'line'>
  } = {}
  const self = (
    <svg viewBox="0 0 256 256" width="80%" height="80%">
      <g>
        <linearGradient id="_lgradient_2" x1="0.5" y1="0" x2="0.5000000000000001" y2="1" gradientTransform="matrix(256,0,0,256,0,0)" gradientUnits="userSpaceOnUse">
          <stop offset="1.6666666666666667%" stop-opacity="1" style="stop-color:rgb(0,0,0)"/>
          <stop ref={[refs, 'stopColor']} offset="99.16666666666667%" stop-opacity="1" style="stop-color:#000000"/>
        </linearGradient>
        <circle vector-effect="non-scaling-stroke" cx="128" cy="128" r="128" fill="url(#_lgradient_2)"/>
        <line ref={[refs, 'line1']} x1='128' y1='223' x2='25' y2='71' stroke="white" stroke-linecap="round" stroke-width='8' stroke-dasharray='1 1' pathLength='1' />
        <line ref={[refs, 'line2']} x1='128' y1='223' x2='231' y2='71' stroke="white" stroke-linecap="round" stroke-width='8' stroke-dasharray='1 1' pathLength='1' />
        <line ref={[refs, 'line3']} x1='192' y1='222' x2='64' y2='33' stroke="white" stroke-linecap="round" stroke-width='8' stroke-dasharray='1 1' pathLength='1' />
        <line ref={[refs, 'line4']} x1='64' y1='222' x2='192' y2='33' stroke="white" stroke-linecap="round" stroke-width='8' stroke-dasharray='1 1' pathLength='1' />
      </g>
    </svg>
  )
  const { stopColor, line1, line2, line3, line4 } = refs
  const duration = 1600
  const vLineAnimSetting: Parameters<typeof line1.animate> = [
    [
      {
        strokeDashoffset: 1,
      },
      {
        strokeDashoffset: 0,
        offset: 0.2,
      },
      {
        strokeDashoffset: 0,
        offset: 0.9,
      },
      {
        strokeDashoffset: -1,
        offset: 1
      },
    ],
    {
      duration,
      easing: 'ease-in-out',
      iterations: Infinity,
    }
  ]
  const xLineAnimSetting: Parameters<typeof line1.animate> = [
    [
      {
        strokeDashoffset: 1,
        easing: 'steps(1, end)'
      },
      {
        strokeDashoffset: 1,
        offset: 0.2,
      },
      {
        strokeDashoffset: 0,
        offset: 0.6,
      },
      {
        strokeDashoffset: 0,
        offset: 0.9,
      },
      {
        strokeDashoffset: -1,
      },
    ],
    {
      duration,
      easing: 'ease-in-out',
      iterations: Infinity,
    }
  ]
  line1.animate(...vLineAnimSetting).play()
  line2.animate(...vLineAnimSetting).play()
  line3.animate(...xLineAnimSetting).play()
  line4.animate(...xLineAnimSetting).play()
  
  stopColor.animate([
    {
      stopColor: '#000000',
    },
    {
      stopColor: '#0000f5',
      offset: 0.9
    },
    {
      stopColor: '#000000',
    },
  ], {
    duration: duration,
    easing: 'ease-in-out',
    iterations: Infinity,
  }).play()

  return self
}
export default Example