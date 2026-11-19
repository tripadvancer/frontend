import { existsSync } from 'node:fs'
import { join } from 'node:path'
import 'server-only'

export const getCountryImage = (countryCode: string) => {
    const filename = `${countryCode.toLowerCase()}.jpg`

    for (const directory of ['preview', 'public']) {
        const imagePath = `/images/countries/${directory}/${filename}`

        if (existsSync(join(process.cwd(), 'public', imagePath))) {
            const size = directory === 'preview' ? 512 : 1920
            const height = directory === 'preview' ? 512 : 1280

            return { url: imagePath, width: size, height }
        }
    }

    return { url: '/open-graph/image-1.jpg', width: 1200, height: 628 }
}
