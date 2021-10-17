import"./vendor.cdaf7cde.js";var t=`import { RefType } from 'bluejsx'

const Example = () => {

  const refs: RefType<{
    stopColor: 'stop'
    line1: 'line'
    line2: 'line'
    line3: 'line'
    line4: 'line'
  }> = {}
  const self = (
    <svg viewBox="0 0 256 256" width="80%" height="80%">
      <g>
        <linearGradient id="example_gradient" x1="0.5" y1="0" x2="0.5" y2="1" gradientTransform="matrix(256,0,0,256,0,0)" gradientUnits="userSpaceOnUse">
          <stop offset="1.6666666666666667%" stop-opacity="1" stop-color="black"/>
          <stop ref={[refs, 'stopColor']} offset="100%" stop-opacity="1" stop-color="#0000f5"/>
        </linearGradient>
        <circle vector-effect="non-scaling-stroke" cx="128" cy="128" r="128" fill="url(#example_gradient)"/>
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
    {
      strokeDashoffset: [1, 0, 0, -1],
      offset: [0, 0.2, 0.9]
    },
    {
      duration,
      easing: 'ease-in-out',
      iterations: Infinity,
    }
  ]
  const xLineAnimSetting: Parameters<typeof line1.animate> = [
    {
      strokeDashoffset: [1, 1, 0, 0, -1],
      offset: [0, 0.2, 0.6, 0.9],
    },
    {
      duration,
      easing: 'ease-in-out',
      iterations: Infinity,
    }
  ]
  line1.animate(...vLineAnimSetting)
  line2.animate(...vLineAnimSetting)
  line3.animate(...xLineAnimSetting)
  line4.animate(...xLineAnimSetting)
  
  stopColor.animate({
    stopColor: ['#000000', '#0000f5', '#000000'],
    offset: [0, 0.9]
  }, {
    duration,
    easing: 'ease-in-out',
    iterations: Infinity,
  })

  return self
}
export default Example`;export{t as default};
