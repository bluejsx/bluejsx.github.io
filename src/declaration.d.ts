declare module '*.scss';
declare module '*.css';
declare module '*.md' {
  const content: ()=> Blue.JSX.Element
  export default content
}
declare module '*.mdx' {
  const content: ()=> Blue.JSX.Element
  export default content
}
declare module '*?raw' {
  const content: string
  export default content
}
declare module '*?worker'{
  const workerConstructor: {
    new (): Worker
  }
  export default workerConstructor
}