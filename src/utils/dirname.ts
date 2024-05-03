import * as path from 'path'
import { fileURLToPath } from 'url'

export const __dirname = path.dirname(fileURLToPath(import.meta.url))
export const dirname = __dirname // for easier auto-complete
