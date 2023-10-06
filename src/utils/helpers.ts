import { i18nConfig } from '@/configs/i18n.config'
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

export function FormattedDate(date: Date, locale: string = i18nConfig.defaultLocale) {
    return new Date(date).toLocaleDateString(locale, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    })
}
