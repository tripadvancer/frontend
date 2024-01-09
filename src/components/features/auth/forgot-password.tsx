'use client'

import { useState } from 'react'

import { useFormik } from 'formik'
import { sendPasswordResetEmail } from 'supertokens-web-js/recipe/emailpassword'
import * as Yup from 'yup'

import type { ForgotPasswordInputs } from '@/utils/types/auth'

import { FormButton } from '@/components/ui/form-button'
import { FormInput } from '@/components/ui/form-input'
import { useDialog } from '@/providers/dialog-provider'
import { useToast } from '@/providers/toast-provider'
import { useI18n } from '@/utils/i18n/i18n.client'

import { ForgotPasswordCompleting } from './forgot-password-completing'
import { SignIn } from './sign-in'
import { SignUp } from './sign-up'

export const ForgotPassword = () => {
    const t = useI18n()
    const dialog = useDialog()
    const toast = useToast()

    const [isLoading, setIsLoading] = useState<boolean>(false)

    const initialValues = {
        email: '',
    }

    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .required(t('validation.required'))
            .matches(
                /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/g,
                t('validation.email.invalid'),
            ),
    })

    const handleSubmit = async (values: ForgotPasswordInputs) => {
        try {
            setIsLoading(true)
            const formFields = [{ id: 'email', value: values.email }]
            const response = await sendPasswordResetEmail({ formFields })

            switch (response.status) {
                case 'OK':
                    dialog.open(<ForgotPasswordCompleting />)
                    break

                case 'FIELD_ERROR':
                    const emailError = response.formFields.find(formField => formField.id === 'email')
                    if (emailError) {
                        formik.setErrors({ email: emailError.error })
                    }
                    break

                default:
                    toast.error(t('common.error'))
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
        initialValues,
        validateOnBlur: false,
        validateOnChange: false,
        validationSchema,
        onSubmit: handleSubmit,
    })

    return (
        <form className="flex w-full flex-col gap-y-8 sm:w-104" onSubmit={formik.handleSubmit}>
            <h1 className="text-center text-h7 sm:text-h7-m">{t('auth.forgot_password.title')}</h1>
            <div className="flex flex-col gap-y-2">
                <p className="text-center">{t('auth.forgot_password.info')}</p>
                <FormInput
                    type="text"
                    name="email"
                    value={formik.values.email}
                    placeholder={t('placeholder.action.email')}
                    autoFocus
                    error={formik.errors.email}
                    isDisabled={isLoading}
                    onChange={formik.handleChange}
                />
            </div>
            <div className="flex flex-col gap-y-4">
                <FormButton type="submit" className="w-full" isLoading={isLoading}>
                    {t('auth.forgot_password.submit')}
                </FormButton>
                <div className="text-center">
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
            </div>
        </form>
    )
}
