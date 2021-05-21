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
        <line ref={[refs, 'line1']} x1='128' y1='223' x2='25' y2='71' stroke="white" stroke-linecap="round" />
        <line ref={[refs, 'line2']} x1='128' y1='223' x2='231' y2='71' stroke="white" stroke-linecap="round" />
        <line ref={[refs, 'line3']} x1='192' y1='222' x2='64' y2='33' stroke="white" stroke-linecap="round" />
        <line ref={[refs, 'line4']} x1='64' y1='222' x2='192' y2='33' stroke="white" stroke-linecap="round" />
      </g>
    </svg>
  )
  const { stopColor, line1, line2, line3, line4 } = refs
  const duration = 1200
  const vLineAnimSetting: Parameters<typeof line1.animate> = [
    [
      {
        strokeDasharray: '0 100%',
        strokeWidth: 0,
        easing: 'steps(1, end)',
      },
      {
        strokeDasharray: '0 100%',
        strokeWidth: 8,
        offset: 0.1
      },
      {
        strokeDasharray: '100% 0',
        strokeWidth: 8,
        offset: 0.7
      },
      {
        strokeDasharray: '100% 0',
        strokeWidth: 8,
      },
    ],
    {
      duration,
      easing: 'ease-in-out',
      iterations: Infinity,
      direction: 'alternate',
    }
  ]
  const xLineAnimSetting: Parameters<typeof line1.animate> = [
    [
      {
        strokeDasharray: '0 100%',
        strokeWidth: 0,
        easing: 'steps(1, end)',
      },
      {
        strokeDasharray: '0 100%',
        strokeWidth: 8,
        offset: 0.5,
      },
      {
        strokeDasharray: '100% 0',
        strokeWidth: 8,
      },
    ],
    {
      duration,
      easing: 'ease-in-out',
      iterations: Infinity,
      direction: 'alternate',
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
    }
  ], {
    duration,
    easing: 'ease-in-out',
    iterations: Infinity,
    direction: 'alternate'
  }).play()

  return self
}
export default Example