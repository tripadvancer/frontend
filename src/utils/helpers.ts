import type { ICategory } from '@/utils/types/category'
import type { ICoordinates } from '@/utils/types/geo'

import { CategoriesEnum, CategoryI18nKeys, ImageVariant } from '@/utils/enums'
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

export function navigateToLocation(lat: number, lng: number): void {
    const url = `https://maps.google.com/maps?q=${lat},${lng}`
    window.open(url, '_blank')
}

export function isValidCoordinate(coordinates: string): boolean {
    const reg = /^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?)(\s*,\s*|\s+)([-+]?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?))$/
    return reg.test(coordinates)
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

export function localizeCategories(categories: ICategory[], t: any): ICategory[] {
    return categories
        .map(category => ({
            ...category,
            localizedName: t(CategoryI18nKeys[CategoriesEnum[category.name]]),
        }))
        .sort((a, b) => a.localizedName.localeCompare(b.localizedName))
}
