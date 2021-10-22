import"./vendor.ee5cca48.js";var t=`import { useAttr, AttrHolder } from 'bluejsx'

//takes in attributes as arguments (access to children elements via 'children' attribute)
const Example = ({ progValue = 0, children = null }) => {
  //create state holder
  const state = new AttrHolder()
  //declare elements
  const refs = {}
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