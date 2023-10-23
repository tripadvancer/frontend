'use client'

import { useState } from 'react'

import { useFormik } from 'formik'
import * as Yup from 'yup'

import Link from 'next/link'

import { Button } from '@/components/button'
import { Input } from '@/components/input'
import { validationConfig } from '@/configs/validation.config'
import { useToast } from '@/providers/toast-provider'
import { authAPI } from '@/redux/services/auth-api'
import { ApiResponseStatus } from '@/utils/enums'
import { useI18n } from '@/utils/i18n.client'

const passwordMinLength = validationConfig.user.password.minLength
const passwordMaxLength = validationConfig.user.password.maxLength

type RessetPasswordFormProps = {
    token: string
}

export const RessetPasswordForm = ({ token }: RessetPasswordFormProps) => {
    const t = useI18n()
    const toast = useToast()

    const [status, setStatus] = useState<ApiResponseStatus>()
    const [resetPassword, { isLoading }] = authAPI.useResetPasswordMutation()

    const formik = useFormik({
        initialValues: {
            token: token,
            password: '',
        },
        validationSchema: Yup.object().shape({
            password: Yup.string()
                .required(t('forms.validation.password.required'))
                .min(passwordMinLength, t('forms.validation.password.min_length', { min_length: passwordMinLength }))
                .max(passwordMaxLength, t('forms.validation.password.max_length', { max_length: passwordMaxLength })),
        }),
        onSubmit: async values => {
            try {
                const response = await resetPassword(values).unwrap()
                setStatus(response.status)
            } catch (err) {
                toast.error(t('common.error'))
            }
        },
    })

    return (
        <>
            {!status && (
                <form className="w-full" onSubmit={formik.handleSubmit}>
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
                    <Button type="submit" className="mb-8 w-full" isDisabled={isLoading}>
                        {t('pages.auth.reset_password.submit')}
                    </Button>
                </form>
            )}

            {status === ApiResponseStatus.TOKEN_EXPIRED && (
                <>
                    <p className="text-center">{t('pages.auth.reset_password.token_expired')}</p>
                    <Link
                        href="/"
                        className="hover-animated inline-flex h-10 w-full items-center justify-center rounded-lg bg-blue-100  px-6 text-white hover:bg-blue-active hover:text-white focus:outline-none"
                    >
                        {t('common.cta.home')}
                    </Link>
                </>
            )}

            {status === ApiResponseStatus.SUCCESS && (
                <>
                    <p className="text-center">{t('pages.auth.reset_password.success')}</p>
                    <Link
                        href="/"
                        className="hover-animated inline-flex h-10 w-full items-center justify-center rounded-lg bg-blue-100  px-6 text-white hover:bg-blue-active hover:text-white focus:outline-none"
                    >
                        {t('common.cta.home')}
                    </Link>
                </>
            )}
        </>
    )
}
