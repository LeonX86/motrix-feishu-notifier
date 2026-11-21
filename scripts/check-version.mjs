import { readFileSync } from 'node:fs'

const manifest = JSON.parse(readFileSync('motrix-plugin.json', 'utf8'))
const source = readFileSync('src/index.ts', 'utf8')
const sourceVersion = /const PLUGIN_VERSION = '([^']+)'/.exec(source)?.[1]
const tagVersion =
  process.env.GITHUB_REF_TYPE === 'tag'
    ? process.env.GITHUB_REF_NAME?.replace(/^v/, '')
    : undefined

const problems = []
if (!sourceVersion) problems.push('PLUGIN_VERSION not found in src/index.ts')
if (sourceVersion && sourceVersion !== manifest.version) {
  problems.push(`src PLUGIN_VERSION ${sourceVersion} != manifest ${manifest.version}`)
}
if (tagVersion && tagVersion !== manifest.version) {
  problems.push(`tag ${tagVersion} != manifest ${manifest.version}`)
}

if (problems.length > 0) {
  console.error(problems.join('\n'))
  process.exit(1)
}

console.log(`version ${manifest.version} OK`)