'use client'

import { useState } from 'react'

import { useFormik } from 'formik'
import { useTranslations } from 'next-intl'
import { sendPasswordResetEmail } from 'supertokens-web-js/recipe/emailpassword'
import * as Yup from 'yup'

import { FormButton } from '@/components/ui/form-button'
import { FormInput } from '@/components/ui/form-input'
import { useDialog } from '@/providers/dialog-provider'
import { useToast } from '@/providers/toast-provider'
import { ForgotPasswordInputs } from '@/utils/types/auth'

import { ForgotPasswordCompleting } from './forgot-password-completing'
import { SignIn } from './sign-in'
import { SignUp } from './sign-up'

export const ForgotPassword = () => {
    const t = useTranslations()
    const dialog = useDialog()
    const toast = useToast()

    const [isLoading, setIsLoading] = useState<boolean>(false)

    const initialValues = {
        email: '',
    }

    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .trim()
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
            <h1 className="h7 text-center">{t('auth.forgotPassword.title')}</h1>
            <div className="flex flex-col gap-y-2">
                <p className="text-center">{t('auth.forgotPassword.info')}</p>
                <FormInput
                    type="text"
                    name="email"
                    value={formik.values.email}
                    placeholder={t('placeholder.action.enterEmail')}
                    autoFocus
                    error={formik.errors.email}
                    disabled={isLoading}
                    onChange={formik.handleChange}
                />
            </div>
            <div className="flex flex-col gap-y-4">
                <FormButton htmlType="submit" className="w-full" isLoading={isLoading}>
                    {t('auth.forgotPassword.submit')}
                </FormButton>
                <div className="text-center">
                    {t.rich('auth.forgotPassword.toBack', {
                        signInLink: signInLink => (
                            <span className="link" onClick={handleSignInClcik}>
                                {signInLink}
                            </span>
                        ),
                        signUpLink: signUpLink => (
                            <span className="link" onClick={handleSignUpClick}>
                                {signUpLink}
                            </span>
                        ),
                    })}
                </div>
            </div>
        </form>
    )
}
