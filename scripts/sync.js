const degit = require('degit');
const { cp, rm } = require('node:fs/promises');

degit('eslint/eslint/docs', { force: true}).clone('docs')
  .finally(async() => {
    await cp('docs', '.', { recursive: true, force: false })
    rm('docs', { recursive: true })
  });
