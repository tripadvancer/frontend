'use client'

import { useState } from 'react'

import { useFormik } from 'formik'
import { sendPasswordResetEmail } from 'supertokens-web-js/recipe/emailpassword'
import * as Yup from 'yup'

import type { ForgotPasswordInputs } from '@/utils/types/auth'

import { Button } from '@/components/forms/button/button'
import { Input } from '@/components/forms/input/input'
import { useDialog } from '@/providers/dialog-provider'
import { useToast } from '@/providers/toast-provider'
import { useI18n } from '@/utils/i18n/i18n.client'

import { ForgotPasswordFeedback } from './forgot-password-feedback'
import { SignIn } from './sign-in'
import { SignUp } from './sign-up'

export const ForgotPassword = () => {
    const t = useI18n()
    const dialog = useDialog()
    const toast = useToast()

    const [isLoading, setIsLoading] = useState<boolean>(false)

    const handleSubmit = async (values: ForgotPasswordInputs) => {
        try {
            setIsLoading(true)

            const formFields = [{ id: 'email', value: values.email }]
            const response = await sendPasswordResetEmail({ formFields })

            switch (response.status) {
                case 'FIELD_ERROR':
                    const emailError = response.formFields.find(formField => formField.id === 'email')
                    if (emailError) {
                        formik.setErrors({ email: emailError.error })
                    }
                    break

                default:
                    dialog.open(<ForgotPasswordFeedback />)
                    break
            }
        } catch (err) {
            toast.error(t('common.error'))
        } finally {
            setIsLoading(false)
        }
    }

    const handleSignInClcik = () => {
        dialog.open(<SignIn />)
    }

    const handleSignUpClick = () => {
        dialog.open(<SignUp />)
    }

    const formik = useFormik({
        initialValues: {
            email: '',
        },
        validationSchema: Yup.object().shape({
            email: Yup.string().required(t('validation.required')).email(t('validation.email.invalid')),
        }),
        onSubmit: handleSubmit,
    })

    return (
        <form className="w-full sm:w-104" onSubmit={formik.handleSubmit}>
            <h1 className="mb-8 text-center text-h7 sm:text-h7-m">{t('auth.forgot_password.title')}</h1>
            <p className="mb-2 text-center ">{t('auth.forgot_password.info')}</p>
            <Input
                type="text"
                name="email"
                value={formik.values.email}
                placeholder={t('forms.fields.email.placeholder')}
                autoFocus
                error={formik.errors.email}
                className="mb-8"
                onChange={formik.handleChange}
            />
            <Button type="submit" className="mb-8 w-full" isLoading={isLoading}>
                {t('auth.forgot_password.submit')}
            </Button>
            <div className="text-center ">
                {t('auth.forgot_password.to_back', {
                    sign_in_link: (
                        <span className="link" onClick={handleSignInClcik}>
                            {t('common.link.sign_in')}
                        </span>
                    ),
                    sign_up_link: (
                        <span className="link" onClick={handleSignUpClick}>
                            {t('common.link.sign_up')}
                        </span>
                    ),
                })}
            </div>
        </form>
    )
}
