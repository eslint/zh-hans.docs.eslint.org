import { downloadTemplate as download } from 'giget'
import { cp, rm, readFile } from 'node:fs/promises'

const version = (await readFile('../README.md', 'utf8')).match(/v\d+\.\d+\.\d+/)[0]

download(`eslint/eslint/docs#${version}`, { force: true, dir:'docs', provider: 'github' })
  .finally(async() => {
    await cp('docs', '..', { recursive: true, force: false })
    rm('docs', { recursive: true })
  })
