'use client'

import { useState } from 'react'

import { useFormik } from 'formik'
import { useTranslations } from 'next-intl'
import { submitNewPassword } from 'supertokens-web-js/recipe/emailpassword'
import * as Yup from 'yup'

import Link from 'next/link'

import type { ResetPasswordInputs } from '@/utils/types/auth'

import { FormButton } from '@/components/ui/form-button'
import { FormInput } from '@/components/ui/form-input'
import { validationConfig } from '@/configs/validation.config'
import { useToast } from '@/providers/toast-provider'

const userPasswordMinLength = validationConfig.user.password.minLength

export const RessetPassword = () => {
    const t = useTranslations()
    const toast = useToast()

    const [status, setStatus] = useState<string>()
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const initialValues = {
        password: '',
    }

    const validationSchema = Yup.object().shape({
        password: Yup.string()
            .required(t('validation.required'))
            .min(userPasswordMinLength, t('validation.text.minLength', { minLength: userPasswordMinLength }))
            .matches(/^(?=.*[a-z])(?=.*[0-9])/g, t('validation.wrong.passwordPolicy')),
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
            toast.error(t('common.error'))
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
                    <p className="text-center">{t('auth.resetPassword.title')}</p>
                    <FormInput
                        type="password"
                        name="password"
                        value={formik.values.password}
                        placeholder={t('placeholder.action.enterNewPassword')}
                        autoFocus
                        error={formik.errors.password}
                        disabled={isLoading}
                        onChange={formik.handleChange}
                    />
                </div>
                <FormButton htmlType="submit" className="w-full" isLoading={isLoading}>
                    {t('auth.resetPassword.submit')}
                </FormButton>
            </form>
        )
    }

    return (
        <>
            <p className="text-center">
                {status === 'RESET_PASSWORD_INVALID_TOKEN_ERROR' && t('auth.resetPassword.status.expired')}
                {status === 'OK' && t('auth.resetPassword.status.ok')}
            </p>
            <Link
                href="/"
                className="hover-animated inline-flex h-10 w-full items-center justify-center rounded-lg bg-blue-100 px-6 text-white hover:bg-blue-active hover:text-white focus:outline-none"
            >
                {t('common.action.goHome')}
            </Link>
        </>
    )
}
