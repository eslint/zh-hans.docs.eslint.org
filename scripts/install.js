import { exec } from 'node:child_process'

exec("git clean -xdf && cd scripts && npm i && npm run sync && cd .. && npm i")
