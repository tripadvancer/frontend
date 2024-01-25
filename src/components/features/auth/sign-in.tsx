'use client'

import { useState } from 'react'

import { useFormik } from 'formik'
import { emailPasswordSignIn } from 'supertokens-web-js/recipe/thirdpartyemailpassword'
import * as Yup from 'yup'

import { useRouter } from 'next/navigation'

import type { SignInInputs } from '@/utils/types/auth'

import { Devider } from '@/components/ui/devider'
import { FormButton } from '@/components/ui/form-button'
import { FormInput } from '@/components/ui/form-input'
import { useDialog } from '@/providers/dialog-provider'
import { useToast } from '@/providers/toast-provider'
import { useI18n } from '@/utils/i18n/i18n.client'

import { ForgotPassword } from './forgot-password'
import { SignUp } from './sign-up'
import { ThirdPartyButton } from './third-party-button'

export const SignIn = () => {
    const t = useI18n()
    const router = useRouter()
    const dialog = useDialog()
    const toast = useToast()

    const [isLoading, setIsLoading] = useState<boolean>(false)

    const initialValues = {
        email: '',
        password: '',
    }

    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .required(t('validation.required'))
            .matches(
                /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/g,
                t('validation.email.invalid'),
            ),
        password: Yup.string().required(t('validation.required')),
    })

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

                case 'WRONG_CREDENTIALS_ERROR':
                    formik.setErrors({ password: t('validation.wrong_credentials') })
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

    const handleForgotPasswordClick = () => {
        dialog.open(<ForgotPassword />)
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
            <h1 className="text-center text-h7-m sm:text-h7">{t('auth.signin.title')}</h1>
            <div className="flex flex-col gap-y-4">
                <div className="flex gap-x-2">
                    <ThirdPartyButton provider="google" isDisabled={isLoading} />
                    <ThirdPartyButton provider="facebook" isDisabled={isLoading} />
                </div>
                <Devider>{t('auth.signin.third_party.or')}</Devider>
                <div className="flex flex-col gap-y-2">
                    <FormInput
                        type="text"
                        name="email"
                        value={formik.values.email}
                        placeholder={t('placeholder.email')}
                        autoFocus
                        error={formik.errors.email}
                        isDisabled={isLoading}
                        onChange={formik.handleChange}
                    />
                    <FormInput
                        type="password"
                        name="password"
                        value={formik.values.password}
                        placeholder={t('placeholder.password')}
                        error={formik.errors.password}
                        isDisabled={isLoading}
                        onChange={formik.handleChange}
                    />
                </div>
            </div>
            <div className="flex flex-col gap-y-4">
                <FormButton type="submit" className="w-full" isLoading={isLoading}>
                    {t('auth.signin.submit')}
                </FormButton>
                <div className="text-center text-small">
                    <span className="link text-small" onClick={handleForgotPasswordClick}>
                        {t('auth.signin.link.forgot_password')}
                    </span>
                </div>
            </div>
            <div className="text-center">
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
