import"./vendor.83679855.js";var t=`import { useAttr, AttrHolder, RefType } from 'bluejsx'

//takes in attributes as arguments (access to children elements via 'children' attribute)
const Example = ({ progValue = 0, children }) => {
  //create state holder
  const state = new AttrHolder()
  /**
   * @type {RefType<{
   *   btn: 'button'
   *   progress: 'progress'
   * }>}
   */
  const refs = {}
  //declare elements
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

  //create state
  useAttr(state, 'progValue', progValue)

  // when \`state.progValue\` changes, run the following listener
  state.watch('progValue', v => {
    progress.value = v
    progText.data = v
  })

  btn.onclick = () => {
    if (state.progValue < 100) state.progValue += 10
    else state.progValue = 0
  }

  // return self element
  return self
}
export default Example`;export{t as default};
