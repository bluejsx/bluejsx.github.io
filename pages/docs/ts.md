# Typescript Development Doc

## types

List of types available from `bluejsx` import.


### `ElemType`

Type for specific BlueJSX elements. 


Usage:
```tsx
// 'div' can be any HTML or SVG tag name 
ElemType<'div'>
```

Example:
```tsx
// p is recognized as progress element
let p: ElemType<'progress'>
p.value=5
```

### `RefType`

A type for reference object. 

usage:
```ts
const refs: RefType<{
  elem1: 'button'  //element tag name
  elem2: typeof FuncComponent  //function component
  elem3: ClassComponent //Custom Element (extends HTMLElement)
}> = {}
```

the type above is eqquivalent to:

```ts
const refs: {
  elem1?: ElemType<'button'>
  elem2?: ReturnType<typeof FuncComponent>
  elem3?: ClassComponent
} = {}
```

### `getRefs()`

Function wrapper for `RefType`.

Returns `RefType` object.

Usage:
```ts
const refs = getRefs<{
  elem1: 'button'  //element tag name
  elem2: typeof FuncComponent  //function component
  elem3: ClassComponent //Custom Element (extends HTMLElement)
}>()
```

### `FuncCompParam`

type for function component parameters.

```ts
const Component = ({ attrA, children }: FuncCompParam<{
  attrA?: string
}>) => <div />
```