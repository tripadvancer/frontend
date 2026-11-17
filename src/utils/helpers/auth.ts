import * as Yup from 'yup'

type LengthLimits = { minLength: number; maxLength: number }

export const USERNAME_FORMAT_MESSAGE = 'Username can only contain letters, numbers, underscores, hyphens and dots'

// Same character set as the backend username check; the length comes from the backend settings
export const getUsernameSchema = ({ minLength, maxLength }: LengthLimits) =>
    Yup.string()
        .trim()
        .required('This field is required')
        .min(minLength, `This field must be at least ${minLength} characters long`)
        .max(maxLength, `This field must be at most ${maxLength} characters long`)
        .matches(/^[A-Za-z0-9._-]+$/, USERNAME_FORMAT_MESSAGE)

export const getPasswordSchema = ({ minLength, maxLength }: LengthLimits) =>
    Yup.string()
        .required('This field is required')
        .min(minLength, `This field must be at least ${minLength} characters long`)
        .max(maxLength, `This field must be at most ${maxLength} characters long`)
        .matches(/^(?=.*[a-z])(?=.*[0-9])/, 'Password must contain a lowercase letter and a number')

export const emailSchema = Yup.string()
    .trim()
    .required('This field is required')
    .email('Please enter a valid email address')
