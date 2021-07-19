<div class='center'>

<div id='logo_container'></div>

#  Welcome to BlueJSX!

### Just a pure Javascript with JSX syntax.

Code with pure Javascript, components, and JSX!
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
npm i -D bluejsx
```
### for [vitejs](https://vitejs.dev/)
in your `vite.config.js`:
```js
export default {
  esbuild: {
    jsxFactory: 'Blue.r',
    jsxFragment: 'Blue.Fragment',
    jsxInject: `import Blue from 'bluejsx'`
  },
  //... other settings
}
```

in your `tsconfig.json`/`jsconfig.json`

```json
{
  /*
  ... your settings ...
  You would need to state "jsx" option of your choice
  */
  "jsxFactory": "Blue.r",
  "jsxFragmentFactory": "Blue.Fragment"
}
```

Then your JSX code would be interpreted as VanillaJSX! Have fun!

---


### Code Example
<div id='example-codespace'></div>

### For more details 

Please see the [document](https://github.com/bluejsx/BlueJSX/tree/master/doc)

---

### Tips

Since you load VanillaJSX in your javascript, `on` method, a shorthand of `addEventListener` is available on all the objects which provide `addEventListener` method (i.e. `EventTarget` objects).

This can be simply implemented by the code below:

```js
EventTarget.prototype.on = EventTarget.prototype.addEventListener
```


---

## Roadmap

- [x] BlueJSX processor
  - it dynamically appends components
- [ ] Vite.js HMR Plugin
- [ ] SSG builder
  - it generates 
    - pre-rendered HTML
    - JS files which initializes the components

