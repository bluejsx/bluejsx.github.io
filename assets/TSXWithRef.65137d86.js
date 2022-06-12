import"./index.2b3aa030.js";var n=`import { useAttr, FuncCompParam, getRefs } from 'bluejsx'

// takes in attributes as arguments (access to children elements via 'children' attribute)
const Example = ({ progValue = 0, children }: FuncCompParam<{ progValue: number }>) => {

  const refs = getRefs<{
    btn: 'button'
    progress: 'progress'
  }>()
  // declare elements
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
  /*
    below defines a property named 'progValue',
    and when 'progValue' changes, 
    all registered listeners will be executed.
  */
  useAttr(self, 'progValue', progValue)

  // when \`self.progValue\` changes, run the following listener
  self.watch('progValue', v => {
    progress.value = v
    progText.data = v+''
  })

  btn.onclick = () => {
    if (self.progValue < 100) self.progValue += 10
    else self.progValue = 0
  }

  // return self element
  return self
}
export default Example`;export{n as default};
