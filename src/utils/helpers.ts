import type { ICoordinates } from '@/utils/types/geo'

import { ImageVariant } from '@/utils/enums'
import { i18nConfig } from '@/utils/i18n/i18n.config'

export function makeImageUrl(url: string | null, imageVariant: ImageVariant) {
    return `${url}/${imageVariant}`
}

export function FormattedDate(date: Date, locale: string = i18nConfig.defaultLocale) {
    return new Date(date).toLocaleDateString(locale, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    })
}

export function extractCoordinates(value: string): ICoordinates {
    const [lat, lng] = value.split(/[\s,]+/)
    return {
        lng: parseFloat(lng),
        lat: parseFloat(lat),
    }
}

export function navigateToLocation(lat: number, lng: number, provider?: string): void {
    switch (provider) {
        case 'waze':
            window.open(`https://waze.com/ul?ll=${lat},${lng}&navigate=yes`, '_blank')
            break
        default:
            window.open(`https://maps.google.com/maps?q=${lat},${lng}`, '_blank')
            break
    }
}

export function parseQueryString(input: string | undefined, validationArray: number[]): number[] {
    if (input === undefined || input === '') {
        return []
    }

    const numberStrings = input.split(',')
    const numbers = numberStrings.map(str => parseFloat(str.trim()))

    // Filter out NaN and numbers not in validationArray
    return numbers.filter(num => !isNaN(num) && validationArray.includes(num))
}
