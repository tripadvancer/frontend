import { convertFromRaw } from 'draft-js'
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
            .min(titleMinLength, t('validation.place.title.min_length', { min_length: titleMinLength }))
            .max(titleMaxLength, t('validation.place.title.max_length', { max_length: titleMaxLength })),

        description: Yup.mixed()
            .test(
                'description',
                t('validation.place.description.required'),
                value => getDescriptionLength(value as string) > 0,
            )
            .test(
                'description',
                t('validation.place.description.min_length', { min_length: descriptionMinLength }),
                value => getDescriptionLength(value as string) >= descriptionMinLength,
            )
            .test(
                'description',
                t('validation.place.description.max_length', { max_length: descriptionMaxLength }),
                value => getDescriptionLength(value as string) <= descriptionMaxLength,
            ),

        location: Yup.string().test('isValidLocation', t('validation.place.location.invalid'), value =>
            stringCoordinatesIsValid(value as string),
        ),

        categories: Yup.array()
            .min(1, t('validation.place.categories.required'))
            .max(maxCategories, t('validation.place.categories.max_count', { max_count: maxCategories })),
    })

function getDescriptionLength(value: string | undefined): number {
    if (typeof value === 'string') {
        const contentState = convertFromRaw(JSON.parse(value))
        const plainText = contentState.getPlainText('')
        const charCount = plainText.length
        return charCount
    }

    return 0
}
