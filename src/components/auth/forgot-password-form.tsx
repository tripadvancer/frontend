'use client'

import { useState } from 'react'

import { useFormik } from 'formik'
import { sendPasswordResetEmail } from 'supertokens-web-js/recipe/emailpassword'
import * as Yup from 'yup'

import type { ForgotPasswordInputs } from '@/types/auth'

import { Button } from '@/components/forms/button/button'
import { Input } from '@/components/forms/input/input'
import { useDialog } from '@/providers/dialog-provider'
import { useToast } from '@/providers/toast-provider'
import { useI18n } from '@/utils/i18n.client'

import { ForgotPasswordFeedback } from './forgot-password-feedback'
import { SignInForm } from './sign-in-form'
import { SignUpForm } from './sign-up-form'

export const ForgotPasswordForm = () => {
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
        dialog.open(<SignInForm />)
    }

    const handleSignUpClick = () => {
        dialog.open(<SignUpForm />)
    }

    const formik = useFormik({
        initialValues: {
            email: '',
        },
        validationSchema: Yup.object().shape({
            email: Yup.string().required(t('forms.validation.required')).email(t('forms.validation.email.invalid')),
        }),
        onSubmit: handleSubmit,
    })

    return (
        <form className="w-full sm:w-104" onSubmit={formik.handleSubmit}>
            <h1 className="mb-8 text-center text-h7 sm:text-h7-m">{t('dialogs.forgot_password.title')}</h1>
            <p className="mb-2 text-center ">{t('dialogs.forgot_password.info')}</p>
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
                {t('dialogs.forgot_password.submit')}
            </Button>
            <div className="text-center ">
                {t('dialogs.forgot_password.to_back', {
                    sign_in_link: (
                        <span
                            className="hover-animated cursor-pointer text-blue-100 hover:text-blue-active"
                            onClick={handleSignInClcik}
                        >
                            {t('common.sign_in_link')}
                        </span>
                    ),
                    sign_up_link: (
                        <span
                            className="hover-animated cursor-pointer text-blue-100 hover:text-blue-active"
                            onClick={handleSignUpClick}
                        >
                            {t('common.sign_up_link')}
                        </span>
                    ),
                })}
            </div>
        </form>
    )
}
