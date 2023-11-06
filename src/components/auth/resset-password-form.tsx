'use client'

import { useState } from 'react'

import { useFormik } from 'formik'
import { submitNewPassword } from 'supertokens-web-js/recipe/emailpassword'
import * as Yup from 'yup'

import Link from 'next/link'

import type { ResetPasswordInputs } from '@/types/auth'

import { Button } from '@/components/forms/button/button'
import { Input } from '@/components/forms/input/input'
import { validationConfig } from '@/configs/validation.config'
import { useToast } from '@/providers/toast-provider'
import { ApiResponseStatus } from '@/utils/enums'
import { useI18n } from '@/utils/i18n.client'

const passwordMinLength = validationConfig.user.password.minLength
const passwordMaxLength = validationConfig.user.password.maxLength

export const RessetPasswordForm = () => {
    const t = useI18n()
    const toast = useToast()

    const [status, setStatus] = useState<string>()
    const [isLoading, setIsLoading] = useState<boolean>(false)

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
            toast.error(t('common.error'))
        } finally {
            setIsLoading(false)
        }
    }

    const formik = useFormik({
        initialValues: {
            password: '',
        },
        validationSchema: Yup.object().shape({
            password: Yup.string()
                .required(t('forms.validation.required'))
                .min(passwordMinLength, t('forms.validation.min_length', { min_length: passwordMinLength }))
                .max(passwordMaxLength, t('forms.validation.max_length', { max_length: passwordMaxLength })),
        }),
        onSubmit: handleSubmit,
    })

    if (!status) {
        return (
            <form className="w-full" onSubmit={formik.handleSubmit}>
                <p className="mb-2 text-center">{t('pages.auth.reset_password.welcome')}</p>
                <Input
                    type="password"
                    name="password"
                    value={formik.values.password}
                    placeholder={t('forms.fields.password.placeholder')}
                    autoFocus
                    error={formik.errors.password}
                    className="mb-8"
                    onChange={formik.handleChange}
                />
                <Button type="submit" className="w-full" isLoading={isLoading}>
                    {t('pages.auth.reset_password.submit')}
                </Button>
            </form>
        )
    }

    return (
        <>
            <p className="text-center">
                {status === 'RESET_PASSWORD_INVALID_TOKEN_ERROR' && t('pages.auth.reset_password.token_expired')}
                {status === 'OK' && t('pages.auth.reset_password.success')}
            </p>
            <Link
                href="/"
                className="hover-animated inline-flex h-10 w-full items-center justify-center rounded-lg bg-blue-100 px-6 text-white hover:bg-blue-active hover:text-white focus:outline-none"
            >
                {t('common.cta.home')}
            </Link>
        </>
    )
}
