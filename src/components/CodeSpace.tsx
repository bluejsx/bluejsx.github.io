import * as monaco from 'monaco-editor'

import './codespace.scss'


import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker'
import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker'
import cssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker'
import htmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker'
import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker'

import { useAttr, AttrHolder, ElemType } from '@vanillajsx/vjsx'
declare const VJSX: any

globalThis.VJSX = VJSX;
globalThis.useAttr = useAttr;
globalThis.AttrHolder = AttrHolder;

(self as any).MonacoEnvironment = {
  getWorker(_: any, label: string) {
    if (label === 'json') {
      return new jsonWorker()
    }
    if (label === 'css' || label === 'scss' || label === 'less') {
      return new cssWorker()
    }
    if (label === 'html' || label === 'handlebars' || label === 'razor') {
      return new htmlWorker()
    }
    if (label === 'typescript' || label === 'javascript') {
      return new tsWorker()
    }
    return new editorWorker()
  }
}
// compiler options
monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
  target: monaco.languages.typescript.ScriptTarget.ESNext,
  allowNonTsExtensions: true,
  moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
  module: monaco.languages.typescript.ModuleKind.ESNext,
  noEmit: false,
  jsx: monaco.languages.typescript.JsxEmit.Preserve,
  jsxFactory: 'VJSX.r',
  lib: ["dom", "esnext"],
  allowJs: true,
  typeRoots: ["node_modules"]
});


const CodeSpace = ({ code = '', lang = 'jsx', children }: { code?: string, lang?: string, children?: any[] })
  : VJSX.JSX.Element & { editor: monaco.editor.IStandaloneCodeEditor, init: () => void } => {
  const refs: {
    editorContainer?: ElemType<'div'>,
    resultSpace?: ElemType<'div'>,
    runButton?: ElemType<'button'>
  } = {}
  const self = <div class='codespace preparing'>
    <div class='editor-options'>
      {children}
    </div>
    <div ref={[refs, 'editorContainer']} class='editor-container' />
    <button ref={[refs, 'runButton']} class='run-button'>Click to run ▶️</button>
    <div ref={[refs, 'resultSpace']} class='editor-result'></div>
  </div>
  const { editorContainer, resultSpace, runButton } = refs
  const langURI = monaco.Uri.parse('file:///main.' + lang)
  const editor = monaco.editor.create(editorContainer, {
    lineNumbers: 'off',
    scrollBeyondLastLine: false,
    theme: "vs-dark",
    automaticLayout: true,
    minimap: {
      enabled: false
    },
    tabSize: 2,
    model: monaco.editor.getModel(langURI) || monaco.editor.createModel(code, 'typescript', langURI)
  })

  //self.editor = editor
  Object.defineProperties(self, {
    editor: {
      value: editor
    },
    init: {
      value: function () {
        Promise.all([import('typescript'), import('@vanillajsx/vjsx/dist/index.d?raw')]).then(([{ default: TS }, { default: vjsxDCode }]) => {
          self.classList.remove('preparing')
          // extra libraries
          monaco.languages.typescript.typescriptDefaults.addExtraLib(
            vjsxDCode,
            'file:///node_modules/@vanillajsx/vjsx/index.d.ts');
          const compileTS = (code: string) => {
            code = code.replace(/import +(VJSX* *,? *)?({? *[\w, ]+ *}?) +from +['"]\@vanillajsx\/vjsx(\/\w*)*['"]/g, '')
            return TS.transpile(code, {
              jsx: TS.JsxEmit.React,
              jsxFactory: 'VJSX.r',
              jsxFragmentFactory: 'VJSX.Fragment',
              lib: ["dom", "esnext"],
              module: TS.ModuleKind.ESNext,
              target: TS.ScriptTarget.ES2018,
              removeComments: true
            })
          }
          const runCode = () => {
            resultSpace.innerHTML = ''
            import(/* @vite-ignore */
              'data:text/javascript;charset=utf-8,'
              + encodeURIComponent(compileTS(editor.getValue()))
            ).then(Mod => resultSpace.appendChild(<Mod.default />))
          }
          runButton.onclick = runCode
          runCode()
        })
      }
    }
  })

  return self as VJSX.JSX.Element & {
    init: () => void
    editor: monaco.editor.IStandaloneCodeEditor
  }
}



export default CodeSpace
/*
Promise.all([
  import('monaco-editor/esm/vs/editor/editor.worker?worker'),
  import('monaco-editor/esm/vs/language/json/json.worker?worker'),
  import('monaco-editor/esm/vs/language/css/css.worker?worker'),
  import('monaco-editor/esm/vs/language/html/html.worker?worker'),
  import('monaco-editor/esm/vs/language/typescript/ts.worker?worker')
]).then(([{ default: editorWorker }, { default: jsonWorker }, { default: cssWorker }, { default: htmlWorker }, { default: tsWorker }]) => {
  (self as any).MonacoEnvironment = {
    getWorker(_: any, label: string) {
      if (label === 'json') {
        return new jsonWorker()
      }
      if (label === 'css' || label === 'scss' || label === 'less') {
        return new cssWorker()
      }
      if (label === 'html' || label === 'handlebars' || label === 'razor') {
        return new htmlWorker()
      }
      if (label === 'typescript' || label === 'javascript') {
        return new tsWorker()
      }
      return new editorWorker()
    }
  }
});
*/