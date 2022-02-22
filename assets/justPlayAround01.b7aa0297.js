import"./vendor.00e1c3ad.js";var e=`import { useAttr, AttrHolder, RefType, FuncCompParam } from 'bluejsx'

/*
  Made progress transition smooth
  Just for fun.
*/

/**
 * 0 < x < 1
 * 
 * 0 < output < 1
 */
type EasingFunction = (x: number) => number

const ease: EasingFunction = x => {
  const doubleX = 2 * x
  if (x < .5) {
    return doubleX ** 2 / 2
  }
  return 1 - (doubleX - 2) ** 2 / 2
}

/**
 * @param fromValue start value
 * @param toValue end value
 * @param easing easing function
 * @param duration time interval in ms
 * @param listener listener function that takes a value between \`fromValue\` and \`toValue\`.
 */
const transition = (fromValue: number, toValue: number, easing: EasingFunction, duration: number, listener: (value: number) => void) => {
  let animFrameID: number

  const dValue = toValue - fromValue
  const beginTime = performance.now()
  const step = (timestamp: number) => {
    const progress = (timestamp - beginTime) / duration
    if (progress > 1) {
      cancelAnimationFrame(animFrameID)
      return 0
    }
    listener(fromValue + dValue * easing(progress))
    animFrameID = requestAnimationFrame(step)
  }

  animFrameID = requestAnimationFrame(step)

}

export default ({ progValue = 0, children }: FuncCompParam<{ progValue: number }>) => {
  const state = new AttrHolder()

  const refs: RefType<{
    btn: 'button'
    progress: 'progress'
  }> = {}
  const progText = new Text()

  const self = (
    <div>
      <button ref={[refs, 'btn']}>click</button>
      <progress
        ref={[refs, 'progress']}
        max={100}
        value={progValue}
      />
      {progText}%
      {children}
    </div>
  )
  const { btn, progress } = refs

  const updateProgress = (value: number) => {
    progress.value = value
    progText.data = '' + (value | 0)
  }
  useAttr(state, 'progValue', progValue)

  let previousValue = progValue
  state.watch('progValue', newValue => {
    transition(previousValue, newValue, ease, 500, updateProgress)
    previousValue = newValue
  })

  btn.onclick = () => {
    if (state.progValue < 100) state.progValue += 50
    else state.progValue = 0
  }

  return self
}`;export{e as default};
