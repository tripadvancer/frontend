import { FormikErrors } from 'formik'

import type { LngLat } from '@/utils/types/geo'

import { ImageVariants } from '@/utils/enums'
import { i18nConfig } from '@/utils/i18n/i18n.config'

export function makeImageUrl(url: string | null, imageVariant: ImageVariants) {
    return `${url}/${imageVariant}`
}

export function formattedDate(date: Date, locale: string = i18nConfig.defaultLocale) {
    return new Date(date).toLocaleDateString(locale, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    })
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

export function updateSelectedCategories(selectedCategoryIds: number[], categoryId: number): number[] {
    return selectedCategoryIds.includes(categoryId)
        ? selectedCategoryIds.filter(id => id !== categoryId)
        : [...selectedCategoryIds, categoryId]
}

export function getFormikErrors<Values>(errors: FormikErrors<Values>): string[] {
    const errorMessages: string[] = []

    for (const key in errors) {
        if (errors.hasOwnProperty(key)) {
            const error = errors[key]
            if (typeof error === 'object') {
                if (Array.isArray(error)) {
                    for (const item of error) {
                        const nestedErrors = getFormikErrors(item)
                        errorMessages.push(...nestedErrors)
                    }
                } else if (error !== undefined) {
                    const nestedErrors = getFormikErrors(error)
                    errorMessages.push(...nestedErrors)
                }
            } else if (error !== undefined) {
                errorMessages.push(error)
            }
        }
    }

    return errorMessages
}
