import * as monaco from 'monaco-editor'
import { loadWASM } from 'onigasm' // peer dependency of 'monaco-textmate'
import { Registry } from 'monaco-textmate' // peer dependency
import { wireTmGrammars } from 'monaco-editor-textmate'

import './index.scss'


import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker'
import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker'
import cssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker'
import htmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker'
import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker'

import { useAttr, AttrHolder, RefType, FuncCompParam, useConstProps, ElemType } from 'bluejsx'
declare const Blue: any

globalThis.Blue = Blue;
globalThis.useAttr = useAttr;
globalThis.AttrHolder = AttrHolder;
globalThis.getRefs = () => ({});
globalThis.useConstProps = useConstProps;

/*@ts-ignore*/
window.MonacoEnvironment = {
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
  jsxFactory: 'Blue.r',
  lib: ["dom", "esnext"],
  allowJs: true,
  typeRoots: ["node_modules"]
});


const CodeSpace = ({ children }: FuncCompParam<{}>) => {
  const refs: RefType<{
    editorContainer: 'div',
    resultSpace: 'div',
    runButton: 'button'
  }> = {}
  const self = <div class='codespace preparing'>
    <div class='editor-options'>
      {children}
    </div>
    <div ref={[refs, 'editorContainer']} class='editor-container' />
    <button ref={[refs, 'runButton']} class='run-button'>Click to run ▶️</button>
    <div ref={[refs, 'resultSpace']} class='editor-result'></div>
  </div> as ElemType<'div'>
  const { editorContainer, resultSpace, runButton } = refs
  const editor = monaco.editor.create(editorContainer, {
    lineNumbers: 'off',
    scrollBeyondLastLine: false,
    theme: "vs-dark",
    automaticLayout: true,
    minimap: {
      enabled: false
    },
    tabSize: 2,
  })
  useConstProps(self, {
    editor,
    async init() {

      const registry = new Registry({
        getGrammarDefinition: async (scopeName) => {
          return {
            format: 'json',
            content: (await import('./TypeScriptReact.tmLanguage.json')).default,
          }
        }
      })
      // map of monaco "language id's" to TextMate scopeNames
      const grammars = new Map()
      grammars.set('typescript', 'source.tsx')
      grammars.set('javascript', 'source.tsx')

      // grammars.set('typescriptreact', 'source.tsx')

      const [
        { default: TS },
        { default: vjsxDCode },
        { default: vsDarkTheme },
        _loadWasm,
      ] = await Promise.all([
        import('typescript'),
        import('bluejsx/dist/index.d?raw'),
        import('./dark-plus-theme-converted.json') as Promise<{
          default: monaco.editor.IStandaloneThemeData
        }>,
        async () => {
          await loadWASM(
            await (
              await fetch('onigasm/lib/onigasm.wasm')
            ).arrayBuffer()
          )
        }
      ])
      
      
      // monaco's built-in themes aren't powereful enough to handle TM tokens
      // https://github.com/Nishkalkashyap/monaco-vscode-textmate-theme-converter#monaco-vscode-textmate-theme-converter
      monaco.editor.defineTheme('dark-plus', vsDarkTheme);
      // extra libraries
      monaco.languages.typescript.typescriptDefaults.addExtraLib(
        vjsxDCode,
        'file:///node_modules/bluejsx/index.d.ts')
      const compileTS = (code: string) => {
        code = code.replace(/import +(Blue* *,? *)?({? *[\w, ]+ *}?) +from +['"]bluejsx(\/\w*)*['"]/g, '')
        return TS.transpile(code, {
          jsx: TS.JsxEmit.React,
          jsxFactory: 'Blue.r',
          jsxFragmentFactory: 'Blue.Fragment',
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
      useConstProps(self, { runCode })
      // self.runCode = runCode
      runButton.onclick = runCode
      //runCode()
      editor.addCommand(
        monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS,
        runCode
      )
      await wireTmGrammars(monaco, registry, grammars)
      self.classList.remove('preparing')
      return runCode
    }
  })

  return self as typeof self & {
    runCode?: () => void
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