import * as monaco from 'monaco-editor'

import './codespace.scss'


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
  : VJSX.JSX.Element & { editor: monaco.editor.IStandaloneCodeEditor, init: ()=>void } => {
  const refs: {
    editorContainer?: HTMLDivElement,
    resultSpace?: HTMLDivElement,
    runButton?: HTMLElementTagNameMap['button']
  } = {}
  const self = <div class='codespace preparing'>
    <div class='editor-options'>
      {children}
    </div>
    <div ref={[refs, 'editorContainer']} class='editor-container' />
    <button ref={[refs, 'runButton']} class='run-button'>run ▶️</button>
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
      value: function(){
        Promise.all([import('typescript/lib/typescriptServices.js'), import('@vanillajsx/vjsx/dist/index.d?raw')]).then(([{default: ts}, {default: vjsxDCode}])=>{
          const TS = ts as typeof window.ts;
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
    init: ()=>void
    editor: monaco.editor.IStandaloneCodeEditor
  }
}



export default CodeSpace