import degit from 'degit'
import { cp, rm } from 'node:fs/promises'

degit('eslint/eslint/docs', { force: true}).clone('docs')
  .finally(async() => {
    await cp('docs', '..', { recursive: true, force: false })
    rm('docs', { recursive: true })
  })
