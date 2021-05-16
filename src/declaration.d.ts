declare module '*.scss';
declare module '*.css';
declare module '*.md' {
  const content: string
  export default content
}
declare module '*?raw' {
  const content: string
  export default content
}
declare module '*?worker'