import { useAttr } from 'bluejsx'

//takes in attributes as arguments (access to children elements via 'children' attribute)
const Example = ({ progValue = 0, children = null }) => {

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
  /*
  below defines a property named 'progValue',
  and when 'progValue' changes, 
  all registered listeners will be executed.
  */
  useAttr(self, 'progValue', progValue)

  // functionalities
  //when `self.progValue` changed, run the following listener
  self.watch('progValue', v => {
    progress.value = v
    progText.data = v
  })

  btn.onclick = () => {
    /*
      below just looks assigning a value to a property,
      however this is running getter/setter method,
      which executes all registered listener functions via `watch` method.
    */
    if (self.progValue < 100) self.progValue += 10
    else self.progValue = 0
  }

  // return self element
  return self
}
export default Example