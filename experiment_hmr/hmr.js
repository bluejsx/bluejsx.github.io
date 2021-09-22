import HMRAdderAcron from './HMRAdderAcron'
import swc from '@swc/core'
import jsx from 'jsx-transform'
import ts from 'typescript'
/**
 * 
 * @param {MarkdownIt.Options} options 
 * @returns {import('vite').PluginOption}
 */
export default function HMRLoader(options = {}) {
  /** @type {import('vite').ResolvedConfig} */
  let config
  const hmrAdder = new HMRAdderAcron()
  return {
    name: 'vite-plugin-blue-hmr',
    configResolved(resolvedConfig) {
      // store the resolved config
      config = resolvedConfig
    },
    transform(code, id) {
      if (/\.(jsx|tsx)$/.test(id)) {
        return jsx.fromString(hmrAdder.transform(code), {
          factory: 'Blue.r',
          passUnknownTagsToFactory: true,
        })
      }
      
    }
  }
}