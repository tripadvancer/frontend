'use client'

import { useState } from 'react'

import { useFormik } from 'formik'
import { sendVerificationEmail } from 'supertokens-web-js/recipe/emailverification'
import { emailPasswordSignUp } from 'supertokens-web-js/recipe/thirdpartyemailpassword'
import * as Yup from 'yup'

import { useRouter } from 'next/navigation'

import type { SignUpInputs } from '@/utils/types/auth'

import { Devider } from '@/components/devider'
import { Button } from '@/components/forms/button/button'
import { Input } from '@/components/forms/input/input'
import { validationConfig } from '@/configs/validation.config'
import { useDialog } from '@/providers/dialog-provider'
import { useToast } from '@/providers/toast-provider'
import { useI18n } from '@/utils/i18n/i18n.client'

import { SignIn } from './sign-in'
import { SignUpCompleting } from './sign-up-completing'
import { ThirdPartyGoogle } from './third-party-google'

const userNameMinLength = validationConfig.user.name.minLength
const userNameMaxLength = validationConfig.user.name.maxLength

export const SignUp = () => {
    const t = useI18n()
    const router = useRouter()
    const dialog = useDialog()
    const toast = useToast()

    const [isLoading, setIsLoading] = useState<boolean>(false)

    const handleSubmit = async (values: SignUpInputs) => {
        try {
            setIsLoading(true)

            const formFields = [
                { id: 'email', value: values.email },
                { id: 'password', value: values.password },
                { id: 'username', value: values.username },
            ]

            let response = await emailPasswordSignUp({ formFields })

            switch (response.status) {
                case 'OK':
                    await sendVerificationEmail()
                    router.refresh()
                    dialog.open(<SignUpCompleting />)
                    break

                case 'FIELD_ERROR':
                    const emailError = response.formFields.find(formField => formField.id === 'email')
                    const passwordError = response.formFields.find(formField => formField.id === 'password')
                    const usernameError = response.formFields.find(formField => formField.id === 'username')

                    if (emailError) {
                        formik.setErrors({ email: emailError.error })
                    }

                    if (passwordError) {
                        formik.setErrors({ password: passwordError.error })
                    }

                    if (usernameError) {
                        formik.setErrors({ username: usernameError.error })
                    }
                    break

                default:
                    toast.error(t('common.error'))
                    break
            }
        } catch (err: any) {
            toast.error(t('common.error'))
        } finally {
            setIsLoading(false)
        }
    }

    const handleSignInClick = () => {
        dialog.open(<SignIn />)
    }

    const formik = useFormik({
        initialValues: {
            email: '',
            username: '',
            password: '',
        },
        validateOnBlur: false,
        validateOnChange: false,
        validationSchema: Yup.object().shape({
            email: Yup.string().required(t('validation.required')).email(t('validation.email.invalid')),
            username: Yup.string()
                .required(t('validation.required'))
                .min(userNameMinLength, t('validation.min_length', { min_length: userNameMinLength }))
                .max(userNameMaxLength, t('validation.max_length', { max_length: userNameMaxLength })),
            password: Yup.string().required(t('validation.required')),
        }),
        onSubmit: handleSubmit,
    })

    return (
        <form className="flex w-full flex-col gap-y-8 sm:w-104" onSubmit={formik.handleSubmit}>
            <h1 className="text-center text-h7-m sm:text-h7">{t('auth.signup.title')}</h1>
            <div className="flex flex-col gap-y-4">
                <ThirdPartyGoogle isDisabled={isLoading} />
                <Devider>{t('auth.signin.third_party.or')}</Devider>
                <div className="flex flex-col gap-y-2">
                    <Input
                        type="text"
                        name="email"
                        value={formik.values.email}
                        placeholder={t('forms.fields.email.placeholder')}
                        autoFocus
                        error={formik.errors.email}
                        isDisabled={isLoading}
                        onChange={formik.handleChange}
                    />
                    <Input
                        type="text"
                        name="username"
                        value={formik.values.username}
                        placeholder={t('forms.fields.username.placeholder')}
                        error={formik.errors.username}
                        isDisabled={isLoading}
                        onChange={formik.handleChange}
                    />
                    <Input
                        type="password"
                        name="password"
                        value={formik.values.password}
                        placeholder={t('forms.fields.password.placeholder')}
                        error={formik.errors.password}
                        isDisabled={isLoading}
                        onChange={formik.handleChange}
                    />
                </div>
            </div>
            <div className="flex flex-col gap-y-4">
                <Button type="submit" className="w-full" isLoading={isLoading}>
                    {t('auth.signup.submit')}
                </Button>
                <div className="text-center text-small text-black-40">
                    {t('auth.signup.info', {
                        terms_link: (
                            <span
                                className="link"
                                onClick={() => {
                                    dialog.close()
                                    router.push('/legal/terms-and-conditions')
                                }}
                            >
                                {t('common.link.terms')}
                            </span>
                        ),
                        privacy_link: (
                            <span
                                className="link"
                                onClick={() => {
                                    dialog.close()
                                    router.push('/legal/privacy-policy')
                                }}
                            >
                                {t('common.link.privacy')}
                            </span>
                        ),
                    })}
                </div>
            </div>
            <div className="text-center">
                {t('auth.signup.to_back', {
                    sign_in_link: (
                        <span className="link" onClick={handleSignInClick}>
                            {t('common.link.sign_in')}
                        </span>
                    ),
                })}
            </div>
        </form>
    )
}
