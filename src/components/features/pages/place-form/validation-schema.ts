import * as Yup from 'yup'

import { validationConfig } from '@/configs/validation.config'
import { stringCoordinatesIsValid } from '@/utils/helpers/maps'

const titleMinLength = validationConfig.place.title.minLength
const titleMaxLength = validationConfig.place.title.maxLength
const descriptionMinLength = validationConfig.place.description.minLength
const descriptionMaxLength = validationConfig.place.description.maxLength
const maxCategories = validationConfig.place.category.maxCount

export const validationSchema = () =>
    Yup.object().shape({
        title: Yup.string()
            .trim()
            .required('Please enter a place title')
            .min(titleMinLength, `The title must be at least ${titleMinLength} characters long`)
            .max(titleMaxLength, `The title must be at most ${titleMaxLength} characters long`),

        description: Yup.mixed()
            .test('description', 'Please enter a place description', value => getDescriptionLength(value as string) > 0)
            .test(
                'description',
                `The description must be at least ${descriptionMinLength} characters long`,
                value => getDescriptionLength(value as string) >= descriptionMinLength,
            )
            .test(
                'description',
                `The description must be at most ${descriptionMaxLength} characters long`,
                value => getDescriptionLength(value as string) <= descriptionMaxLength,
            ),

        location: Yup.string()
            .trim()
            .test('isValidLocation', "Coordinates must be in format: 'lat, lng', e.g. '50.4501, 30.5234'", value =>
                stringCoordinatesIsValid(value as string),
            ),

        categories: Yup.array()
            .min(1, 'Please select at least one category')
            .max(maxCategories, `You can select up to ${maxCategories} categories`),
    })

function getDescriptionLength(value: string | undefined): number {
    if (typeof value === 'string') {
        const textWithoutTags = value.replace(/<[^>]*>/g, '')
        const textLength = textWithoutTags.trim().length
        return textLength
    }

    return 0
}
