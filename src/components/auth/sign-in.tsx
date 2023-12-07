'use client'

import { useState } from 'react'

import { useFormik } from 'formik'
import { emailPasswordSignIn } from 'supertokens-web-js/recipe/thirdpartyemailpassword'
import * as Yup from 'yup'

import { useRouter } from 'next/navigation'

import type { SignInInputs } from '@/utils/types/auth'

import { Button } from '@/components/forms/button/button'
import { Input } from '@/components/forms/input/input'
import { useDialog } from '@/providers/dialog-provider'
import { useToast } from '@/providers/toast-provider'
import { useI18n } from '@/utils/i18n/i18n.client'

import { GoogleSignInUp } from './components/third-party-sign-in/google'
import { ForgotPassword } from './forgot-password'
import { SignUp } from './sign-up'

export const SignIn = () => {
    const t = useI18n()
    const router = useRouter()
    const dialog = useDialog()
    const toast = useToast()

    const [isLoading, setIsLoading] = useState<boolean>(false)

    const handleSubmit = async (values: SignInInputs) => {
        try {
            setIsLoading(true)

            const formFields = [
                { id: 'email', value: values.email },
                { id: 'password', value: values.password },
            ]

            const response = await emailPasswordSignIn({ formFields })

            switch (response.status) {
                case 'OK':
                    dialog.close()
                    router.refresh()
                    break

                case 'FIELD_ERROR':
                    const emailError = response.formFields.find(formField => formField.id === 'email')
                    if (emailError) {
                        formik.setErrors({ email: emailError.error })
                    }
                    break

                case 'WRONG_CREDENTIALS_ERROR':
                    formik.setErrors({ password: t('validation.wrong_credentials') })
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

    const handleForgotPasswordClick = () => {
        dialog.open(<ForgotPassword />)
    }

    const handleSignUpClick = () => {
        dialog.open(<SignUp />)
    }

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validateOnBlur: false,
        validateOnChange: false,
        validationSchema: Yup.object().shape({
            email: Yup.string().required(t('validation.required')).email(t('validation.email.invalid')),
            password: Yup.string().required(t('validation.required')),
        }),
        onSubmit: handleSubmit,
    })

    return (
        <form className="w-full sm:w-104" onSubmit={formik.handleSubmit}>
            <h1 className="mb-8 text-center text-h7-m sm:text-h7">{t('auth.signin.title')}</h1>
            <GoogleSignInUp />
            <div className="mb-4 text-center">Or</div>
            <Input
                type="text"
                name="email"
                value={formik.values.email}
                placeholder={t('forms.fields.email.placeholder')}
                autoFocus
                error={formik.errors.email}
                className="mb-2"
                onChange={formik.handleChange}
            />
            <Input
                type="password"
                name="password"
                value={formik.values.password}
                placeholder={t('forms.fields.password.placeholder')}
                error={formik.errors.password}
                className="mb-8"
                onChange={formik.handleChange}
            />
            <Button type="submit" className="mb-4 w-full" isLoading={isLoading}>
                {t('auth.signin.submit')}
            </Button>
            <div className="mb-8 text-center text-small">
                <span className="link text-small" onClick={handleForgotPasswordClick}>
                    {t('auth.signin.link.forgot_password')}
                </span>
            </div>
            <div className="text-center ">
                {t('auth.signin.to_back', {
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
