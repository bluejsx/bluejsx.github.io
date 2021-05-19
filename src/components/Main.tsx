import '@vanillajsx/vjsx'
import '../declaration.d'
import 'github-markdown-css'
import 'highlight.js/styles/vs2015.css'
import * as monaco from 'monaco-editor'
import style, { main } from './Main.module.scss'
import './container.scss'

import exampleCode from '../examples/JSXDefault?raw'
const {log} = console
const Main = () =>
  <div class={`container ${main}`}>
    {async (elem: VJSX.JSX.Element)=>{
      await import('./article.md').then(mod=>
        mod.default.split('<hr>').forEach(htmStr=>
          elem.appendChild(
            <section innerHTML={htmStr} class='markdown-body' />
          )
        )
      )
      const refs: {
        codeSelector?: HTMLSelectElement
      } = {}
      const codeSpace = await import('./CodeSpace').then(Mod=>
        elem.querySelector('#example-codespace').appendChild(<Mod.default code={exampleCode}>
          <label for='code-options'> Coding style: </label>
          <select id='code-options' class={style['code-options']} ref={[refs, 'codeSelector']}>
            <option value='0'>JSX</option>
            <option value='1'>JSX with ref attribute</option>
            <option value='2'>TSX</option>
            <option value='3'>TSX with ref attribute</option>
          </select>
        </Mod.default>)
      )
      const { codeSelector } = refs
      const { editor }: {editor: monaco.editor.IStandaloneCodeEditor} = codeSpace
      const JSXURI = monaco.Uri.parse('file:///main.jsx'), TSXURI = monaco.Uri.parse('file:///main.tsx'), 
      JSXModel = monaco.editor.getModel(JSXURI) || monaco.editor.createModel(null, 'typescript', JSXURI),
      TSXModel = monaco.editor.getModel(TSXURI) || monaco.editor.createModel(null, 'typescript', TSXURI)
      editor.getModel()
      codeSelector.onchange = async () =>{
        switch(codeSelector.value){
          case '0':
            import('../examples/JSXDefault?raw').then(({default: code})=>{
              editor.setModel(JSXModel)
              editor.setValue(code)
            })
            break;
          case '1':
            import('../examples/JSXWithRef?raw').then(({default: code})=>{
              editor.setModel(JSXModel)
              editor.setValue(code)
            })
            break;
          case '2':
            import('../examples/TSXDeault.tsx?raw').then(({default: code})=>{
              editor.setModel(TSXModel)
              editor.setValue(code)
            })
            break;
          case '3':
            import('../examples/TSXWithRef?raw').then(({default: code})=>{
              editor.setModel(TSXModel)
              editor.setValue(code)
            })
            break;
          default:
            break;
        }
      }
      
    }}
  </div>


export default Main