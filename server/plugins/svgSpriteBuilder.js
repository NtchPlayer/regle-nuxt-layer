import { readdirSync, readFileSync } from 'fs'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'
import { defineNitroPlugin } from 'nitropack/dist/runtime/plugin'

const currentDir = dirname(fileURLToPath(import.meta.url)).split('\\')
currentDir.splice(currentDir.length - 2)

export default defineNitroPlugin((nitroApp) => {
  const svgDirectoryLayer = join(currentDir.join('\\').replaceAll('\\', '/'), './public/svg/')
  const svgDirectoryProject = './public/svg/'
  const svgDirectoryPlayground = './.playground/public/svg/'

  const isSvg = (fileName) => {
    return fileName.endsWith('.svg')
  }

  const getSvgFiles = (path) => {
    const svgFiles = []
    try {
      const dirents = readdirSync(path, { withFileTypes: true })
      dirents.forEach((dirent) => {
        if (dirent.isDirectory()) {
          svgFiles.push(...getSvgFiles(`${path}${dirent.name}/`))
        } else if (isSvg(dirent.name)) {
          dirent.path = `${path}${dirent.name}`
          svgFiles.push(dirent)
        }
      })
      return svgFiles
    } catch {
      return svgFiles
    }
  }

  const svgFileToSymbol = (svgFile) => {
    const svg = readFileSync(svgFile.path).toString()
    let svgId = svgFile.path.replace(svgDirectoryLayer, '').replace('.svg', '')
    if (svgId.includes('svg')) {
      let svgIdSplitBySlash = svgId.split('/')
      const svgIndex = svgIdSplitBySlash.findIndex(id => id === 'svg')
      svgIdSplitBySlash = svgIdSplitBySlash.slice(svgIndex + 1, svgIdSplitBySlash.length)
      svgId = svgIdSplitBySlash.join('/')
    }
    return svg.replace('<svg', `<symbol id=${svgId}`).replace('</svg>', '</symbol>')
  }

  const buildSvgSprite = () => {
    const svgFilesLayer = getSvgFiles(svgDirectoryLayer)
    const svgFilesPlayground = getSvgFiles(svgDirectoryPlayground)
    const svgFilesProject = getSvgFiles(svgDirectoryProject)
    const svgFiles = svgFilesLayer.concat(svgFilesPlayground, svgFilesProject)
    const svgSymbols = svgFiles.map(svgFile => svgFileToSymbol(svgFile))
    return `
      <svg xmlns="http://www.w3.org/2000/svg" style="position: absolute; width: 0; height: 0;" aria-hidden="true">
        ${svgSymbols.join('')}
      </svg>
    `
  }

  nitroApp.hooks.hook('render:html', (html) => {
    const svgSprite = buildSvgSprite()
    html.bodyPrepend.push(svgSprite)
  })
})
