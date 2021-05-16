import * as monaco from 'monaco-editor'
import './codespace.scss'
//import { useAttr } from '@vanillajsx/vjsx'

const CodeSpace = ({ code='' }: { code?: string, }) =>{
  const refs: {
    editorContainer?: HTMLDivElement
  } = {}
  const self = <div class='codespace'>
    <div ref={[refs, 'editorContainer']} class='editor-container'/>
  </div>
  const { editorContainer } = refs

  const editor = monaco.editor.create(editorContainer, {
    value: code,
    language: "javascript",
    lineNumbers: 'off',
    scrollBeyondLastLine: false,
    theme: "vs-dark",

  })
  return self
}

export default CodeSpace