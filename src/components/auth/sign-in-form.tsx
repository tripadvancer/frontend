'use client'

import { useState } from 'react'

import { useFormik } from 'formik'
import { EmailVerificationClaim, sendVerificationEmail } from 'supertokens-web-js/recipe/emailverification'
import Session from 'supertokens-web-js/recipe/session'
import { emailPasswordSignIn } from 'supertokens-web-js/recipe/thirdpartyemailpassword'
import * as Yup from 'yup'

import type { SignInInputs } from '@/types/auth'

import { Button } from '@/components/forms/button/button'
import { Input } from '@/components/forms/input/input'
import { useDialog } from '@/providers/dialog-provider'
import { useToast } from '@/providers/toast-provider'
import { setCredentials } from '@/redux/features/user-slice'
import { useAppDispatch } from '@/redux/hooks'
import { getUserInfo } from '@/services/user'
import { UserStatus } from '@/utils/enums'
import { useI18n } from '@/utils/i18n.client'

import { ForgotPasswordForm } from './forgot-password-form'
import { SignInFeedback } from './sign-in-feedback'
import { SignUpForm } from './sign-up-form'

export const SignInForm = () => {
    const t = useI18n()
    const dispatch = useAppDispatch()
    const dialog = useDialog()
    const toast = useToast()

    const [isLoading, setIsLoading] = useState<boolean>(false)

    const handleSuccessfulSignIn = async () => {
        try {
            const userInfo = await getUserInfo()
            dispatch(setCredentials(userInfo))
            toast.success(t('common.signin.success', { name: userInfo.name }))
            dialog.close()
        } catch (err) {
            toast.error(t('common.error'))
        }
    }

    const sendEmail = async () => {
        try {
            const response = await sendVerificationEmail()
            response.status === 'EMAIL_ALREADY_VERIFIED_ERROR'
                ? handleSuccessfulSignIn()
                : dialog.open(<SignInFeedback reason={UserStatus.NOT_ACTIVATED} />)
        } catch (err) {
            toast.error(t('common.error'))
        }
    }

    const handleSubmit = async (values: SignInInputs) => {
        try {
            setIsLoading(true)

            const formFields = [
                { id: 'email', value: values.email },
                { id: 'password', value: values.password },
            ]

            const response = await emailPasswordSignIn({ formFields })

            switch (response.status) {
                case 'FIELD_ERROR':
                    const emailError = response.formFields.find(formField => formField.id === 'email')
                    if (emailError) {
                        formik.setErrors({ email: emailError.error })
                    }
                    break

                case 'WRONG_CREDENTIALS_ERROR':
                    formik.setErrors({ password: t('forms.validation.wrong_credentials') })
                    break

                default:
                    const validationErrors = await Session.validateClaims()
                    validationErrors.some(err => err.validatorId === EmailVerificationClaim.id)
                        ? await sendEmail()
                        : handleSuccessfulSignIn()
                    break
            }
        } catch (err) {
            toast.error(t('common.error'))
        } finally {
            setIsLoading(false)
        }
    }

    const handleForgotPasswordClick = () => {
        dialog.open(<ForgotPasswordForm />)
    }

    const handleSignUpClick = () => {
        dialog.open(<SignUpForm />)
    }

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validateOnBlur: false,
        validateOnChange: false,
        validationSchema: Yup.object().shape({
            email: Yup.string().required(t('forms.validation.required')).email(t('forms.validation.email.invalid')),
            password: Yup.string().required(t('forms.validation.required')),
        }),
        onSubmit: handleSubmit,
    })

    return (
        <form className="w-full sm:w-104" onSubmit={formik.handleSubmit}>
            <h1 className="mb-8 text-center text-h7-m sm:text-h7">{t('dialogs.signin.title')}</h1>
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
                {t('dialogs.signin.submit')}
            </Button>
            <div className="mb-8 text-center text-small">
                <span
                    className="hover-animated cursor-pointer text-small text-blue-100 hover:text-blue-active"
                    onClick={handleForgotPasswordClick}
                >
                    {t('dialogs.signin.link.forgot_password')}
                </span>
            </div>
            <div className="text-center ">
                {t('dialogs.signin.to_back', {
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
