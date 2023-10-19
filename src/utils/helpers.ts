import type { ICoordinates } from '@/types/geo'

import { i18nConfig } from '@/configs/i18n.config'
import { CategoriesEnum, ComplaintReasonsEnum, ImageVariant } from '@/utils/enums'

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

export function getLocalizedCategories(category: CategoriesEnum, t: (key: string) => string): string {
    const localizedCategories: Record<CategoriesEnum, string> = {
        [CategoriesEnum.ABANDONED]: t('categories.abandoned'),
        [CategoriesEnum.ADVENTURE_ACTIVITIES]: t('categories.adventure_activities'),
        [CategoriesEnum.ARCHITECTURE]: t('categories.architecture'),
        [CategoriesEnum.CAMPING_SITES]: t('categories.camping_sites'),
        [CategoriesEnum.HIKING]: t('categories.hiking'),
        [CategoriesEnum.HISTORICAL]: t('categories.historical'),
        [CategoriesEnum.LANDMARKS]: t('categories.landmarks'),
        [CategoriesEnum.MUSEUMS]: t('categories.museums'),
        [CategoriesEnum.NATURAL_ATTRACTIONS]: t('categories.natural_attractions'),
        [CategoriesEnum.OFF_ROAD]: t('categories.off_road'),
        [CategoriesEnum.RECREATIONAL_AREAS]: t('categories.recreational_areas'),
        [CategoriesEnum.SCENIC_VIEWS]: t('categories.scenic_views'),
    }

    return localizedCategories[category]
}

export function getLocalizedComplaintReason(reason: ComplaintReasonsEnum, t: (key: string) => string): string {
    const localizedComplaintReasons: Record<ComplaintReasonsEnum, string> = {
        [ComplaintReasonsEnum.ABUSE]: t('complaint.reasons.abuse'),
        [ComplaintReasonsEnum.COPYRIGHT]: t('complaint.reasons.copyright'),
        [ComplaintReasonsEnum.DUPLICATE]: t('complaint.reasons.duplicate'),
        [ComplaintReasonsEnum.FALSE]: t('complaint.reasons.false'),
        [ComplaintReasonsEnum.FRAUD]: t('complaint.reasons.fraud'),
        [ComplaintReasonsEnum.INAPPROPRIATE]: t('complaint.reasons.inappropriate'),
        [ComplaintReasonsEnum.OTHER]: t('complaint.reasons.other'),
        [ComplaintReasonsEnum.SPAM]: t('complaint.reasons.spam'),
    }

    return localizedComplaintReasons[reason]
}

export function parseNumberString(input: string | undefined, validationArray: number[]): number[] {
    if (input === undefined || input === '') {
        return []
    }

    const numberStrings = input.split(',')
    const numbers = numberStrings.map(str => parseFloat(str.trim()))

    // Filter out NaN and numbers not in validationArray
    return numbers.filter(num => !isNaN(num) && validationArray.includes(num))
}
