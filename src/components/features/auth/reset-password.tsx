'use client'

import { useState } from 'react'

import { useFormik } from 'formik'
import { submitNewPassword } from 'supertokens-web-js/recipe/emailpassword'
import * as Yup from 'yup'

import Link from 'next/link'

import { useToast } from '@/components/providers/toast-provider'
import { FormButton } from '@/components/ui/form-button'
import { FormInput } from '@/components/ui/form-input'
import { validationConfig } from '@/configs/validation.config'
import { ResetPasswordInputs } from '@/utils/types/auth'

const userPasswordMinLength = validationConfig.user.password.minLength
const userPasswordMaxLength = validationConfig.user.password.maxLength

export const ResetPassword = () => {
    const toast = useToast()

    const [status, setStatus] = useState<string>()
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const initialValues = {
        password: '',
    }

    const validationSchema = Yup.object().shape({
        password: Yup.string()
            .required('This field is required')
            .min(userPasswordMinLength, `This field must be at least ${userPasswordMinLength} characters long`)
            .max(userPasswordMaxLength, `This field must be at most ${userPasswordMaxLength} characters long`)
            .matches(/^(?=.*[a-z])(?=.*[0-9])/g, 'Password must contain at least 8 characters, including a number'),
    })

    const handleSubmit = async (values: ResetPasswordInputs) => {
        try {
            setIsLoading(true)
            const formFields = [{ id: 'password', value: values.password }]
            const response = await submitNewPassword({ formFields })

            switch (response.status) {
                case 'FIELD_ERROR':
                    const passwordError = response.formFields.find(formField => formField.id === 'password')
                    if (passwordError) {
                        formik.setErrors({ password: passwordError.error })
                    }
                    break

                default:
                    setStatus(response.status)
                    break
            }
        } catch (err) {
            toast.error('An unexpected error has occurred. Please try again later.')
        } finally {
            setIsLoading(false)
        }
    }

    const formik = useFormik({
        initialValues,
        validateOnBlur: false,
        validateOnChange: false,
        validationSchema,
        onSubmit: handleSubmit,
    })

    if (!status) {
        return (
            <form className="flex w-full flex-col gap-y-8" onSubmit={formik.handleSubmit}>
                <div className="flex flex-col gap-y-2">
                    <p className="text-center">Enter your new password below</p>
                    <FormInput
                        type="password"
                        name="password"
                        value={formik.values.password}
                        placeholder="Enter new password"
                        autoFocus
                        error={formik.errors.password}
                        disabled={isLoading}
                        onChange={formik.handleChange}
                    />
                </div>
                <FormButton htmlType="submit" className="w-full" isLoading={isLoading}>
                    Reset password
                </FormButton>
            </form>
        )
    }

    return (
        <>
            <p className="text-center">
                {status === 'RESET_PASSWORD_INVALID_TOKEN_ERROR' &&
                    'The password reset link has expired. Please request a new password reset link.'}
                {status === 'OK' && 'Your password has been reset.'}
            </p>
            <Link
                href="/"
                className="hover-animated hover:bg-blue-active inline-flex h-10 w-full items-center justify-center rounded-lg bg-blue-100 px-6 text-white hover:text-white focus:outline-none"
            >
                Go to Home
            </Link>
        </>
    )
}
