/// <reference types="vite/client" />

declare module '*.md' {
  const content: ()=> Blue.JSX.Element
  export default content
}
declare module '*.mdx' {
  const content: ()=> Blue.JSX.Element
  export default content
}
declare module '*.json' {
  const content: object
  export default content
}