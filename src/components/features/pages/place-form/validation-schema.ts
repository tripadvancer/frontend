import * as Yup from 'yup'

import { stringCoordinatesIsValid } from '@/utils/helpers/maps'
import type { ApplicationSettings } from '@/utils/redux/services/settings/settings.types'

export const validationSchema = (settings: ApplicationSettings['validation']['place']) =>
    Yup.object().shape({
        title: Yup.string()
            .trim()
            .required('Please enter a place title')
            .min(settings.title.minLength, `The title must be at least ${settings.title.minLength} characters long`)
            .max(settings.title.maxLength, `The title must be at most ${settings.title.maxLength} characters long`),

        description: Yup.mixed()
            .test('description', 'Please enter a place description', value => getDescriptionLength(value as string) > 0)
            .test(
                'description',
                `The description must be at least ${settings.description.minLength} characters long`,
                value => getDescriptionLength(value as string) >= settings.description.minLength,
            )
            .test(
                'description',
                `The description must be at most ${settings.description.maxLength} characters long`,
                value => getDescriptionLength(value as string) <= settings.description.maxLength,
            ),

        location: Yup.string()
            .trim()
            .min(settings.location.minLength, 'Please enter valid coordinates')
            .max(settings.location.maxLength, 'Coordinates are too long')
            .test('isValidLocation', "Coordinates must be in format: 'lat, lng', e.g. '50.4501, 30.5234'", value =>
                stringCoordinatesIsValid(value as string),
            ),

        categories: Yup.array()
            .min(settings.category.minCount, 'Please select at least one category')
            .max(settings.category.maxCount, `You can select up to ${settings.category.maxCount} categories`),
    })

function getDescriptionLength(value: string | undefined): number {
    if (typeof value === 'string') {
        const textWithoutTags = value.replace(/<[^>]*>/g, '')
        const textLength = textWithoutTags.trim().length
        return textLength
    }

    return 0
}
