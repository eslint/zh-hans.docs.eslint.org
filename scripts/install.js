import { exec } from 'node:child_process'

exec("cd scripts && npm i && npm run sync && cd .. && npm i")
