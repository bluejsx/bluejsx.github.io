<div class='center'>

![logo](./vjsx.svg)

#  Welcome to VanillaJSX!

### Just a pure Javascript with JSX syntax.

Code with pure Javascript, components, and JSX!
</div>


<div class='boxed' style='color: #d20c38; font-size: larger; padding: 0.3rem; border-color: red;'>

### ⚠️Caution⚠️
- This is still in Draft phase!

</div>

---

### Features
- Component Based Development
- JSX syntax
- NO complex framework
- NO virtual DOMs! Just use your familiar HTML DOMs!
- No Re-rendering by its framework, easier for developers to understand the behavior
- Less Learning Difficulty than React
- If you want to change DOM attributes or texts, JUST SET THEM BY YOURSELF!
- TS support



### How the Coding Works
When you code this:
```jsx
const elem1 = <div id='elem1'>hi!</div>
```
This will work as:
```js
const elem1 = document.createElement('div')
elem1.id = 'elem1'
elem1.append('hi!')
```

---


## Installation

```sh
npm i -D @vanillajsx/vjsx
```
### for [vitejs](https://vitejs.dev/)
in your `vite.config.js`:
```js
export default {
  esbuild: {
    jsxFactory: 'VJSX.r',
    jsxFragment: 'VJSX.Fragment',
    jsxInject: `import VJSX from '@vanillajsx/vjsx'`
  },
  //... other settings
}
```
Then your JSX code would be interpreted as VanillaJSX! Have fun!

---


### VanillaJSX provides:
- `useAttr` method:
  ```ts
  import { useAttr } from '@vanillajsx/vjsx'
  useAttr(elem: Element, propName: string, defaultValue: any)
  ```
  - This defines custom property setter/getter on your element.
  - You are able to listen the value change using watch listener:
    ```ts
    elem.watch(propName: string, (newValue) => void)
    ```
    - `watch` listener is similar to `addEventListener` 
    - The difference is that the listener function in `watch` recieves the new property value, not `Event` object.
  - The code example below shows the usage of `useAttr` and `watch`.

You can code using function component, or using [CustomElement](https://developer.mozilla.org/ja/docs/Web/Web_Components/Using_custom_elements)

### Code Example
```jsx
import { useAttr } from '@vanillajsx/vjsx'
import CustomProgress from './CustomProgress'

//takes in attributes as arguments (access to children elements via 'children' attribute)
const Example = ({progValue=0, children})=>{

  //declare elements
  const progress = <CustomProgress max='100' value={progValue}/>
  const btn = <button>click</button>
  const progText = new Text()
  const self = (
    <div class='t3'>
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

  // functionalities
  //when `self.progValue` changed, run the following listener
  self.watch('progValue', v=>{
    progress.value = v
    progText.data = v
  })
  btn.onclick = () =>{
    /*
      below just looks assigning a value to a property,
      however this is running getter/setter method,
      which executes all listener functions registered via `watch` method.
    */
    if(self.progValue<100) self.progValue+=10
    else self.progValue = 0
  }

  // return self element
  return self	
}
```

### Result of the code above
<div id='example-result-space' class='boxed' style='background: #272727cc;'></div>

- see how changing `self.progValue` affects other multiple values using `self.watch` method.

### For more details 

Please see the [document](https://github.com/vanillajsx/VanillaJSX/tree/master/doc)

---

### Tips

Since you load VanillaJSX in your javascript, `on` method, a shorthand of `addEventListener` is available on all the objects which provide `addEventListener` method (i.e. `EventTarget` objects).

This can be simply implemented by the code below:

```js
EventTarget.prototype.on = EventTarget.prototype.addEventListener
```


---

## Roadmap

- [x] VanillaJSX processor
  - it dynamically appends components
- [ ] Vite.js HMR Plugin
- [ ] SSG builder
  - it generates 
    - pre-rendered HTML
    - JS files which initializes the components
  - [ViteJS SSG loader](https://vitejs.dev/guide/ssr.html#ssr-specific-plugin-logic)

