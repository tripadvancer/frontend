import * as Yup from 'yup'

import { validationConfig } from '@/configs/validation.config'
import { getDescriptionLength, isValidCoordinate } from '@/utils/helpers'

const titleMinLength = validationConfig.place.title.minLength
const titleMaxLength = validationConfig.place.title.maxLength
const descriptionMinLength = validationConfig.place.description.minLength
const descriptionMaxLength = validationConfig.place.description.maxLength
const maxCategories = validationConfig.place.category.maxCount

export const validationSchema = (t: any) =>
    Yup.object().shape({
        title: Yup.string()
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

        location: Yup.string().test('isValidCoordinate', t('validation.place.location.invalid'), value =>
            isValidCoordinate(value as string),
        ),

        categories: Yup.array()
            .required(t('validation.place.categories.required'))
            .max(maxCategories, t('validation.place.categories.max_count', { max_count: maxCategories })),
    })
