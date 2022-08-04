const degit = require('degit')
const { cp } = require('node:fs/promises');

degit('eslint/eslint/docs', { force: true})
  .clone('docs')
  .finally(() => {
    cp('docs', '.', { recursive: true, force: false })
  })
