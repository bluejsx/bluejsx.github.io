import"./vendor.cb66585c.js";var e="import { useAttr } from 'bluejsx'\n\n//takes in attributes as arguments (access to children elements via 'children' attribute)\nconst Example = ({ progValue = 0, children = null }) => {\n\n  //declare elements\n  const refs = {}\n  const progText = new Text()\n  const self = (\n    <div>\n      <button ref={[refs, 'btn']}>click</button>\n      <progress ref={[refs, 'progress']} max={100} value={progValue} />\n      {progText}%\n      {children}\n    </div>\n  )\n  const { btn, progress } = refs\n  /*\n    below defines a property named 'progValue',\n    and when 'progValue' changes, \n    all registered listeners will be executed.\n  */\n  useAttr(self, 'progValue', progValue)\n\n  //when `self.progValue` changes, run the following listener\n  self.watch('progValue', v => {\n    progress.value = v\n    progText.data = v\n  })\n\n  btn.onclick = () => {\n    if (self.progValue < 100) self.progValue += 10\n    else self.progValue = 0\n  }\n\n  // return self element\n  return self\n}\nexport default Example";export{e as default};
