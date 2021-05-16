import * as monaco from 'monaco-editor'
import './codespace.scss'
import vjsxDCode from '@vanillajsx/vjsx/src/@types/vjsx.d?raw'
import vjsxCode from '@vanillajsx/vjsx/src/vjsx?raw'
import vjsxLibCode from '@vanillajsx/vjsx/src/vjsxlib?raw'
//import { useAttr } from '@vanillajsx/vjsx'
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

const CodeSpace = ({ code='' }: { code?: string, }) =>{
  const refs: {
    editorContainer?: HTMLDivElement
  } = {}
  const self = <div class='codespace'>
    <div ref={[refs, 'editorContainer']} class='editor-container'/>
    <div class='editor-result'></div>
  </div>
  const { editorContainer } = refs

  const editor = monaco.editor.create(editorContainer, {
    lineNumbers: 'off',
    scrollBeyondLastLine: false,
    theme: "vs-dark",
    automaticLayout: true,
    minimap: {
      enabled: false
    },
    model: monaco.editor.createModel(code, 'typescript', monaco.Uri.parse('file:///main.jsx'))
  })
  
  return self
}

export default CodeSpace