import { copyFileSync, mkdirSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const projectDirectory = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const mapLibreDistDirectory = resolve(projectDirectory, 'node_modules/maplibre-gl/dist')
const publicDirectory = resolve(projectDirectory, 'public')

mkdirSync(publicDirectory, { recursive: true })

for (const fileName of ['maplibre-gl-worker.mjs', 'maplibre-gl-shared.mjs']) {
    copyFileSync(resolve(mapLibreDistDirectory, fileName), resolve(publicDirectory, fileName))
}
