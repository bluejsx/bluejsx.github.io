import { useAttr, ElemType, FuncCompParam } from 'bluejsx'

//takes in attributes as arguments (access to children elements via 'children' attribute)
const Example = ({ progValue = 0, children }: FuncCompParam<{ progValue: number }>) => {

  //declare elements
  const btn = <button>click</button>
  const progress = <progress max={100} value={progValue} /> as ElemType<'progress'>
  const progText = new Text()
  const self = (
    <div>
      {btn}
      {progress}
      {progText}%
      {children}
    </div>
  )

  /*
    below defines a property named 'progValue',
    and when 'progValue' changes, 
    all registered listeners will be executed.
  */
  useAttr(self, 'progValue', progValue)

  //when `self.progValue` changes, run the following listener
  self.watch('progValue', v => {
    progress.value = v
    progText.data = v
  })

  btn.onclick = () => {
    if (self.progValue < 100) self.progValue += 10
    else self.progValue = 0
  }

  // return self element
  return self
}
export default Example