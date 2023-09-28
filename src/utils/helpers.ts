import { ImageVariant } from '@/utils/enums'

export function makeImageUrl(url: string | null, imageVariant: ImageVariant) {
    if (!url && imageVariant === ImageVariant.PUBLIC) {
        return ''
    }

    if (!url && imageVariant === ImageVariant.PREVIEW) {
        return ''
    }

    if (!url && imageVariant === ImageVariant.AVATAR) {
        return ''
    }

    return `${url}/${imageVariant}`
}
