import * as Yup from 'yup'

import { validationConfig } from '@/configs/validation.config'
import { stringCoordinatesIsValid } from '@/utils/helpers/maps'

const titleMinLength = validationConfig.place.title.minLength
const titleMaxLength = validationConfig.place.title.maxLength
const descriptionMinLength = validationConfig.place.description.minLength
const descriptionMaxLength = validationConfig.place.description.maxLength
const maxCategories = validationConfig.place.category.maxCount

export const validationSchema = (t: any) =>
    Yup.object().shape({
        title: Yup.string()
            .trim()
            .required(t('validation.place.title.required'))
            .min(titleMinLength, t('validation.place.title.minLength', { minLength: titleMinLength }))
            .max(titleMaxLength, t('validation.place.title.maxLength', { maxLength: titleMaxLength })),

        description: Yup.mixed()
            .test(
                'description',
                t('validation.place.description.required'),
                value => getDescriptionLength(value as string) > 0,
            )
            .test(
                'description',
                t('validation.place.description.minLength', { minLength: descriptionMinLength }),
                value => getDescriptionLength(value as string) >= descriptionMinLength,
            )
            .test(
                'description',
                t('validation.place.description.maxLength', { maxLength: descriptionMaxLength }),
                value => getDescriptionLength(value as string) <= descriptionMaxLength,
            ),

        location: Yup.string()
            .trim()
            .test('isValidLocation', t('validation.place.location.invalid'), value =>
                stringCoordinatesIsValid(value as string),
            ),

        categories: Yup.array()
            .min(1, t('validation.place.categories.required'))
            .max(maxCategories, t('validation.place.categories.maxCount', { maxCount: maxCategories })),
    })

function getDescriptionLength(value: string | undefined): number {
    if (typeof value === 'string') {
        const textWithoutTags = value.replace(/<[^>]*>/g, '')
        const textLength = textWithoutTags.trim().length
        return textLength
    }

    return 0
}
