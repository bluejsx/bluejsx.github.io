import { useAttr, AttrHolder, getRefs, FuncCompParam } from 'bluejsx'

// takes in attributes as arguments (access to children elements via 'children' attribute)
const Example = (
  { progValue = 0, children }: FuncCompParam<{
    progValue: number
  }>
) => {
  // create state holder
  const state = new AttrHolder()
  // declare elements
  const refs = getRefs<{
    btn: 'button'
    progress: 'progress'
  }>()
  const progText = new Text()
  const self = (
    <div>
      <button ref={[refs, 'btn']}>click</button>
      <progress ref={[refs, 'progress']} max={100} value={progValue} />
      {progText}%
      {children}
    </div>
  )
  const { btn, progress } = refs

  // create state
  useAttr(state, 'progValue', progValue)

  // when `state.progValue` changes, run the following listener
  state.watch('progValue', value => {
    progress.value = value
    progText.data = value.toString()
  })

  btn.onclick = () => {
    if (state.progValue < 100) state.progValue += 10
    else state.progValue = 0
  }

  // return self element
  return self
}
export default Example