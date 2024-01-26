import { FormikErrors } from 'formik'

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

/**
 * Returns an array of all the errors in the formik errors object.
 * @param {FormikErrors<Values>} errors - The formik errors object.
 * @returns {string[]} - An array of all the errors in the formik errors object.
 */
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
