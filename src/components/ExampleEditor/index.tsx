import { FuncCompParam, getRefs } from "bluejsx"
import sdk from '@stackblitz/sdk'
import CodeSpace from "../CodeSpace"
import * as monaco from 'monaco-editor'
import style from './index.module.scss'


export const StackViewer = () => {
  const refs = getRefs<{
    codeSelector: 'select',
    viewerArea: 'iframe'
  }>()
  const self = <div>
    <label for='code-options'> Coding style: </label>
    <select
      id='code-options'
      class={style.codeOptions}
      ref={[refs, 'codeSelector']}
    >
      <option value='0'>JSX</option>
      <option value='1'>JSX with ref attribute</option>
      <option value='2'>JSX with AttrHolder</option>
      <option value='3'>TSX</option>
      <option value='4'>TSX with ref attribute</option>
      <option value='5'>TSX with AttrHolder</option>
      <option value='6'>TSX + SVG Animation</option>
      <option value='7'>Playing Around</option>
    </select>
    <iframe ref={[refs, 'viewerArea']} class={style.editorArea} />
  </div>
  const { codeSelector, viewerArea } = refs
  codeSelector.value = '4';
  setTimeout(async () => {
    const vm = await sdk.embedProjectId(
      viewerArea,
      'bluejsx-vzm2mi',
      {
        forceEmbedLayout: true,
        openFile: 'src/components/App/index.tsx',
        theme: 'dark',
        clickToLoad: true,
        hideExplorer: true,
      }
    );
    
    const applyCode = async (code: string, ext: string) => {
      const filename = `src/components/App/index.${ext}`
      await vm.applyFsDiff({
        create: {
          [filename]: code,
        },
        destroy: ['src/components/App/index']
      })
      // await vm.editor.openFile(filename)
    }
    const onSelectChange = async () => {
      switch (codeSelector.value) {
        case '0':
          import('../../examples/JSXDefault?raw').then(({ default: code }) => applyCode(code, 'jsx'))
          break;
        case '1':
          import('../../examples/JSXWithRef?raw').then(({ default: code }) => applyCode(code, 'jsx'))
          break;
        case '2':
          import('../../examples/JSXAttrHolder?raw').then(({ default: code }) => applyCode(code, 'jsx'))
          break;
        case '3':
          import('../../examples/TSXDeault?raw').then(({ default: code }) => applyCode(code, 'tsx'))
          break;
        case '4':
          import('../../examples/TSXWithRef?raw').then(({ default: code }) => applyCode(code, 'tsx'))
          break;
        case '5':
          import('../../examples/TSXAttrHolder?raw').then(({ default: code }) => applyCode(code, 'tsx'))
          break;
        case '6':
          import('../../examples/TSX_SVG_Anim?raw').then(({ default: code }) => applyCode(code, 'tsx'))
          break;
        case '7':
          import('../../examples/justPlayAround01?raw').then(({ default: code }) => applyCode(code, 'tsx'))
          break;
        default:
          break;
      }
    }
    codeSelector.onchange = onSelectChange
  }, 100)
  return self
}


export default () => {
  const refs = getRefs<{
    codeSelector: 'select'
  }>()
  const self = <CodeSpace>
    <label for='code-options'> Coding style: </label>
    <select
      id='code-options'
      class={style.codeOptions}
      ref={[refs, 'codeSelector']}
    >
      <option value='0'>JSX</option>
      <option value='1'>JSX with ref attribute</option>
      <option value='2'>JSX with AttrHolder</option>
      <option value='3'>TSX</option>
      <option value='4'>TSX with ref attribute</option>
      <option value='5'>TSX with AttrHolder</option>
      <option value='6'>TSX + SVG Animation</option>
      <option value='7'>Playing Around</option>
    </select>
  </CodeSpace> as ReturnType<typeof CodeSpace>
  const { codeSelector } = refs
  const JSXURI = monaco.Uri.parse('file:///main.jsx'), TSXURI = monaco.Uri.parse('file:///main.tsx'),
    JSXModel = monaco.editor.getModel(JSXURI) || monaco.editor.createModel(null, 'typescript', JSXURI),
    TSXModel = monaco.editor.getModel(TSXURI) || monaco.editor.createModel(null, 'typescript', TSXURI)
  const onscroll = () => {
    const { top } = self.getBoundingClientRect()
    if (top < 500 && top > 0) {
      self.init().then(() => {
        codeSelector.value = '4'
        onSelectChange()
      })

      //self.scrollIntoView({ behavior: 'smooth' })
      document.scrollingElement.scrollTo({
        top: self.offsetTop - 100,
        left: 0,
        behavior: 'smooth'
      })
      document.removeEventListener('scroll', onscroll)
    }
  }
  document.addEventListener('scroll', onscroll)

  const applyCode = (code: string, model: monaco.editor.ITextModel) => {
    self.editor.setModel(model)
    self.editor.setValue(code)
    self.runCode()
  }
  const onSelectChange = async () => {
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
      case '7':
        import('../../examples/justPlayAround01?raw').then(({ default: code }) => applyCode(code, TSXModel))
        break;
      default:
        break;
    }
  }
  codeSelector.onchange = onSelectChange
  return self
}

