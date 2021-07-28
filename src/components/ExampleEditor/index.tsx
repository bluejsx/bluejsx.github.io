import { ElemType } from "bluejsx"
import CodeSpace from "../CodeSpace"
import * as monaco from 'monaco-editor'
import { codeOptions as CLASS_CODE_OPTIONS } from './index.module.scss'

export default ({ code, scrollingElement = document }: { code?: string, scrollingElement?: HTMLElement | any,[key: string]: any}) => {
  const refs: {
    codeSelector?: ElemType<'select'>
  } = {}
  const self = <CodeSpace code={code} >
    <label for='code-options'> Coding style: </label>
    <select id='code-options' class={CLASS_CODE_OPTIONS} ref={[refs, 'codeSelector']}>
      <option value='0'>JSX</option>
      <option value='1'>JSX with ref attribute</option>
      <option value='2'>JSX with AttrHolder</option>
      <option value='3'>TSX</option>
      <option value='4'>TSX with ref attribute</option>
      <option value='5'>TSX with AttrHolder</option>
      <option value='6'>TSX + SVG Animation</option>
    </select>
  </CodeSpace> as ReturnType<typeof CodeSpace>
  const { codeSelector } = refs
  const { editor } = self
  
  const onscroll = () => {
    if (self.getBoundingClientRect().top < 500) {
      self.init()
      scrollingElement.removeEventListener('scroll', onscroll)
    }
  }
  scrollingElement.addEventListener('scroll', onscroll)
  const JSXURI = monaco.Uri.parse('file:///main.jsx'), TSXURI = monaco.Uri.parse('file:///main.tsx'),
    JSXModel = monaco.editor.getModel(JSXURI) || monaco.editor.createModel(null, 'typescript', JSXURI),
    TSXModel = monaco.editor.getModel(TSXURI) || monaco.editor.createModel(null, 'typescript', TSXURI)
  const applyCode = (code: string, model: monaco.editor.ITextModel) => {
    editor.setModel(model)
    editor.setValue(code)
  }
  codeSelector.onchange = async () => {
    switch (codeSelector.value) {
      case '0':
        import('../../examples/JSXDefault?raw').then(({ default: code }) => applyCode(code, JSXModel))
        break;
      case '1':
        import('../../examples/JSXWithRef?raw').then(({ default: code }) => applyCode(code, JSXModel))
        break;
      case '2':
        import('../../examples/JSXAttrHolder?raw').then(({ default: code }) => applyCode(code, JSXModel))
        break;
      case '3':
        import('../../examples/TSXDeault?raw').then(({ default: code }) => applyCode(code, TSXModel))
        break;
      case '4':
        import('../../examples/TSXWithRef?raw').then(({ default: code }) => applyCode(code, TSXModel))
        break;
      case '5':
        import('../../examples/TSXAttrHolder?raw').then(({ default: code }) => applyCode(code, TSXModel))
        break;
      case '6':
        import('../../examples/TSX_SVG_Anim?raw').then(({ default: code }) => applyCode(code, TSXModel))
        break;
      default:
        break;
    }
  }
  return self
}