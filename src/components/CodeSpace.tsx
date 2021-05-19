import * as monaco from 'monaco-editor'
import ts from 'typescript/lib/typescriptServices'

import './codespace.scss'
import vjsxDCode from '@vanillajsx/vjsx/src/@types/vjsx.d?raw'
import vjsxCode from '@vanillajsx/vjsx/src/vjsx?raw'
import vjsxLibCode from '@vanillajsx/vjsx/src/vjsxlib?raw'

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

// extra libraries
monaco.languages.typescript.typescriptDefaults.addExtraLib(
  vjsxDCode,
  'file:///node_modules/@vanillajsx/vjsx/@types/index.d.ts');
monaco.languages.typescript.typescriptDefaults.addExtraLib(
  vjsxCode,
  'file:///node_modules/@vanillajsx/vjsx/index.ts');
monaco.languages.typescript.typescriptDefaults.addExtraLib(
  vjsxLibCode,
  'file:///node_modules/@vanillajsx/vjsx/vjsxlib.ts');

const CodeSpace = ({ code='', lang='jsx', children }: { code?: string, lang?: string, children?: any[] })
  : VJSX.JSX.Element & {editor: monaco.editor.IStandaloneCodeEditor} =>{
  const refs: {
    editorContainer?: HTMLDivElement,
    resultSpace?: HTMLDivElement,
    runButton?: HTMLElementTagNameMap['button']
  } = {}
  const self = <div class='codespace'>
    <div class='editor-options'>
      {children}
    </div>
    <div ref={[refs, 'editorContainer']} class='editor-container'/>
    <button ref={[refs, 'runButton']} class='run-button'>run ▶️</button>
    <div ref={[refs, 'resultSpace']} class='editor-result'></div>
  </div>
  const { editorContainer, resultSpace, runButton } = refs
  const langURI = monaco.Uri.parse('file:///main.'+lang)
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
  const runCode = () =>{
    resultSpace.innerHTML=''
    import(/* @vite-ignore */
      'data:text/javascript;charset=utf-8,'
      +encodeURIComponent(compileTS(editor.getValue()))
    ).then(Mod => resultSpace.appendChild(<Mod.default />))
  }
  runButton.onclick = runCode
  runCode()

  //self.editor = editor
  Object.defineProperty(self, 'editor' ,{
    value: editor
  })
  
  return self as VJSX.JSX.Element & {editor: monaco.editor.IStandaloneCodeEditor}
}
//const ts = window.ts
const compileTS = (code: string) => {
  code = code.replace(/import +(VJSX* *,? *)?({? *[\w, ]+ *}?) +from +['"]\@vanillajsx\/vjsx(\/\w*)*['"]/g, '')
  
  return ts.transpile(code, {
    jsx: ts.JsxEmit.React,
    jsxFactory: 'VJSX.r',
    jsxFragmentFactory: 'VJSX.Fragment',
    lib: ["dom", "esnext"],
    module: ts.ModuleKind.ESNext,
    target: ts.ScriptTarget.ES2015,
    removeComments: true
  })
  
}

export default CodeSpace