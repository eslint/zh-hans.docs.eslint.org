import { exec } from 'node:child_process'

exec("npm i && npm run sync && cd .. && npm i")
